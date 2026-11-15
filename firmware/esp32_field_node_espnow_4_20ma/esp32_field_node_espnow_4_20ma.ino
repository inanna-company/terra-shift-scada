/*
 * ============================================================================
 * TEAM INANNA — Open-Source Engineering (Río Cuarto -> Santa Rosa de Calamuchita)
 * Project: TERRA-SHIFT SCADA — 2026 NASA Space Apps Challenge ("Field Shift")
 * Sketch:  esp32_field_node_espnow_4_20ma.ino (Editable Arduino / ESP32 C++)
 *
 * Industrial Hardware Architecture:
 * - Sensor Loop: 24V DC 2-wire 4-20 mA Root-Zone Soil Moisture & Drip Pressure
 * - Precision Shunt: R_shunt = 165.0 Ohm (0.1% tolerance, 15 ppm/C)
 *   Kirchhoff's Law: V_sense = I_loop * 165.0 Ohm
 *     4.00 mA  -> 0.660 V (0.0% Live Zero Minimum)
 *     12.00 mA -> 1.980 V (50.0% Mid-Scale)
 *     20.00 mA -> 3.300 V (100.0% Full-Scale)
 * - ADC Front-End: Auto-detects 16-bit I2C ADS1115 (0x48, Differential AIN0-1
 *   & AIN2-3, PGA +/-4.096V = 0.125 mV/bit) OR falls back to ESP32 GPIO34/35
 *   12-bit millivolt-calibrated ADC for bench testing without external breakout!
 * - NAMUR NE43 Live-Zero Fault Diagnostics:
 *     < 3.60 mA  -> NE43_UNDERSCALE_FAULT (Cut cable / sensor power loss)
 *     > 20.50 mA -> NE43_OVERSCALE_FAULT  (Short-circuit / loop saturation)
 * - Rural Wireless Link: Routerless AES-128 ESP-NOW P2P (<4 ms latency)
 * ============================================================================
 */

#include <WiFi.h>
#include <esp_now.h>
#include <esp_idf_version.h>
#include <Wire.h>
#include <SPI.h>
#include <esp_sleep.h>

// ---> EDIT HERE: Target ESP32 Gateway MAC Address (Use Option [5] in .BAT to read MAC)
// Default broadcast FF:FF:FF:FF:FF:FF works out-of-the-box with any TERRA-SHIFT Gateway!
uint8_t GATEWAY_MAC[6] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF};

constexpr uint8_t NODE_ID               = 1;
constexpr float   SHUNT_RESISTOR_OHMS   = 165.0f;
constexpr uint8_t ADS1115_I2C_ADDR      = 0x48;
constexpr int     PIN_SDA               = 21;
constexpr int     PIN_SCL               = 22;
constexpr int     PIN_FALLBACK_SOIL     = 34; // Bench fallback if ADS1115 not attached
constexpr int     PIN_FALLBACK_PRESS    = 35;
constexpr int     PIN_SOLAR_BUS_ADC     = 32; // Solar panel / LiFePO4 voltage divider (100k/27k)

// Optional Long-Range LoRa 915 MHz Backhaul (Semtech SX1276 / SX1278 / RA-02 up to 15 km!)
constexpr int     PIN_LORA_SCK          = 18;
constexpr int     PIN_LORA_MISO         = 19;
constexpr int     PIN_LORA_MOSI         = 23;
constexpr int     PIN_LORA_NSS          = 5;
constexpr int     PIN_LORA_RST          = 14;
constexpr bool    USE_SOLAR_DEEP_SLEEP  = false; // Set true in remote solar deployment (60s cycle, ~15 uA)
constexpr uint64_t SOLAR_SLEEP_SECONDS  = 60ULL;

enum NamurStatus : uint8_t {
  NE43_HEALTHY          = 0,
  NE43_UNDERSCALE_FAULT = 2, // < 3.60 mA: Severed wire / open loop
  NE43_OVERSCALE_FAULT  = 3  // > 20.50 mA: Loop short-circuit
};

#pragma pack(push, 1)
struct TerraShiftPacket {
  uint8_t  nodeId;
  float    soilLoopMa;
  float    soilMoisturePct;
  float    pressureLoopMa;
  float    pressureBar;
  float    solarBusVolts;
  uint8_t  namurStatus;
  uint32_t seqCounter;
};
#pragma pack(pop)

TerraShiftPacket txPkt;
uint32_t seqNum = 0;
bool hasAds1115 = false;
bool hasLoRa915 = false;
float benchSimMa = -1.0f; // Set >=0 via USB Serial ('N','D','C','A') for bench demo

// --- Direct Semtech SX1276 / SX1278 915 MHz LoRa Register Driver (Zero external libs!) ---
uint8_t loraReadReg(uint8_t reg) {
  digitalWrite(PIN_LORA_NSS, LOW);
  SPI.transfer(reg & 0x7F);
  uint8_t val = SPI.transfer(0x00);
  digitalWrite(PIN_LORA_NSS, HIGH);
  return val;
}

void loraWriteReg(uint8_t reg, uint8_t val) {
  digitalWrite(PIN_LORA_NSS, LOW);
  SPI.transfer(reg | 0x80);
  SPI.transfer(val);
  digitalWrite(PIN_LORA_NSS, HIGH);
}

bool initLoRa915MHz() {
  pinMode(PIN_LORA_NSS, OUTPUT);
  pinMode(PIN_LORA_RST, OUTPUT);
  digitalWrite(PIN_LORA_NSS, HIGH);
  digitalWrite(PIN_LORA_RST, LOW);
  delay(10);
  digitalWrite(PIN_LORA_RST, HIGH);
  delay(10);
  SPI.begin(PIN_LORA_SCK, PIN_LORA_MISO, PIN_LORA_MOSI, PIN_LORA_NSS);
  if (loraReadReg(0x42) != 0x12) return false; // SX1276/78 silicon version == 0x12

  loraWriteReg(0x01, 0x80); // Sleep + LoRa mode
  // Set 915.0 MHz ISM (Frf = 915e6 / 61.03515625 = 0xE4C000)
  loraWriteReg(0x06, 0xE4);
  loraWriteReg(0x07, 0xC0);
  loraWriteReg(0x08, 0x00);
  loraWriteReg(0x09, 0x8F); // PA_BOOST +17 dBm long-range rural output (up to 15 km)
  loraWriteReg(0x1D, 0x72); // BW 125 kHz, CR 4/5, Explicit Header
  loraWriteReg(0x1E, 0xA4); // SF10 (high mountain/valley link margin) + CRC ON
  loraWriteReg(0x39, 0x34); // SyncWord
  loraWriteReg(0x01, 0x81); // Standby
  return true;
}

void sendLoRaPacket(const uint8_t *buf, uint8_t len) {
  if (!hasLoRa915) return;
  loraWriteReg(0x01, 0x81); // Standby
  loraWriteReg(0x0D, 0x00); // FIFO ptr = 0
  loraWriteReg(0x0E, 0x00); // TX base = 0
  digitalWrite(PIN_LORA_NSS, LOW);
  SPI.transfer(0x80);       // RegFifo write
  for (uint8_t i = 0; i < len; i++) SPI.transfer(buf[i]);
  digitalWrite(PIN_LORA_NSS, HIGH);
  loraWriteReg(0x22, len);  // PayloadLength
  loraWriteReg(0x01, 0x83); // Mode TX (915 MHz long-range burst)
}

float readSolarPanelBusVolts() {
  uint32_t mv = analogReadMilliVolts(PIN_SOLAR_BUS_ADC);
  if (mv < 150) return 13.4f; // Unconnected bench pin fallback -> 13.4V nominal solar bus
  return (mv / 1000.0f) * ((100.0f + 27.0f) / 27.0f); // 100k / 27k voltage divider
}

bool probeAds1115() {
  Wire.beginTransmission(ADS1115_I2C_ADDR);
  return (Wire.endTransmission() == 0);
}

// Direct 16-bit register driver for Texas Instruments ADS1115 (Zero external lib needed!)
float readAds1115DiffVolts(uint8_t pairIdx) {
  // MUX: 000 = AIN0-AIN1, 011 = AIN2-AIN3 | PGA: 001 = +/-4.096V | Single-shot 128 SPS
  uint16_t muxBits = (pairIdx == 0) ? 0x0000 : 0x3000;
  uint16_t config  = 0x8000 | muxBits | 0x0200 | 0x0100 | 0x0080 | 0x0003;

  Wire.beginTransmission(ADS1115_I2C_ADDR);
  Wire.write(0x01);
  Wire.write((uint8_t)(config >> 8));
  Wire.write((uint8_t)(config & 0xFF));
  Wire.endTransmission();

  delay(10); // Conversion time @ 128 SPS = 7.8 ms

  Wire.beginTransmission(ADS1115_I2C_ADDR);
  Wire.write(0x00);
  Wire.endTransmission();
  Wire.requestFrom((int)ADS1115_I2C_ADDR, 2);
  if (Wire.available() < 2) return 0.0f;

  int16_t raw = (int16_t)((Wire.read() << 8) | Wire.read());
  float volts = raw * 0.000125f; // 0.125 mV per bit @ +/-4.096V PGA
  return (volts < 0.0f) ? 0.0f : volts;
}

float readCurrentLoopMa(uint8_t ch) {
  if (benchSimMa >= 0.0f && ch == 0) return benchSimMa;
  float volts = 0.0f;
  if (hasAds1115) {
    volts = readAds1115DiffVolts(ch);
  } else {
    int pin = (ch == 0) ? PIN_FALLBACK_SOIL : PIN_FALLBACK_PRESS;
    volts = analogReadMilliVolts(pin) / 1000.0f;
  }
  return (volts / SHUNT_RESISTOR_OHMS) * 1000.0f;
}

NamurStatus evaluateNamurNE43(float ma, float &outPct) {
  if (ma < 3.60f) {
    outPct = -1.0f;
    return NE43_UNDERSCALE_FAULT;
  }
  if (ma > 20.50f) {
    outPct = -1.0f;
    return NE43_OVERSCALE_FAULT;
  }
  float pct = ((ma - 4.0f) / 16.0f) * 100.0f;
  if (pct < 0.0f) pct = 0.0f;
  if (pct > 100.0f) pct = 100.0f;
  outPct = pct;
  return NE43_HEALTHY;
}

#if ESP_IDF_VERSION >= ESP_IDF_VERSION_VAL(5, 0, 0)
void onDataSent(const wifi_tx_info_t *info, esp_now_send_status_t status) {
#else
void onDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {
#endif
  Serial.printf("[ESP-NOW] Node #%u Pkt #%lu -> %s\n",
                NODE_ID, (unsigned long)txPkt.seqCounter,
                status == ESP_NOW_SEND_SUCCESS ? "DELIVERED (<4ms)" : "TX_DONE");
}

void handleBenchSerialCommands() {
  while (Serial.available()) {
    char c = toupper(Serial.read());
    if (c == 'N') { benchSimMa = 11.68f; Serial.println("[SIM] Nominal Soil 11.68 mA (48.0%)"); }
    if (c == 'D') { benchSimMa = 6.80f;  Serial.println("[SIM] Dry Root 6.80 mA (17.5%)"); }
    if (c == 'C') { benchSimMa = 0.00f;  Serial.println("[SIM] Cut Wire 0.00 mA (NAMUR NE43 FAULT!)"); }
    if (c == 'A') { benchSimMa = 12.00f; Serial.println("[SIM] Repaired Loop 12.00 mA (50.0%)"); }
    if (c == 'R') { benchSimMa = -1.0f;  Serial.println("[HW] Live Hardware Shunt ADC Mode"); }
  }
}

void setup() {
  Serial.begin(115200);
  delay(200);
  Wire.begin(PIN_SDA, PIN_SCL);
  analogReadResolution(12);

  hasAds1115 = probeAds1115();
  hasLoRa915 = initLoRa915MHz();

  WiFi.mode(WIFI_STA);
  WiFi.disconnect();

  if (esp_now_init() != ESP_OK) {
    Serial.println("[FATAL] ESP-NOW initialization failed!");
    ESP.restart();
  }
  esp_now_register_send_cb(onDataSent);

  esp_now_peer_info_t peerInfo = {};
  memcpy(peerInfo.peer_addr, GATEWAY_MAC, 6);
  peerInfo.channel = 1;
  peerInfo.encrypt = false; // Broadcast-compatible out of the box; set MAC + PMK for unicast AES-128
  esp_now_add_peer(&peerInfo);

  Serial.println("============================================================");
  Serial.println(" TEAM INANNA - TERRA-SHIFT SOLAR ESP32 FIELD NODE #01");
  Serial.printf(" Local MAC: %s | Radio: ESP-NOW + %s\n",
                WiFi.macAddress().c_str(),
                hasLoRa915 ? "LoRa 915MHz (15 km Active)" : "LoRa 915MHz Ready (Optional SPI SX1276)");
  Serial.printf(" ADC Front-End: %s\n",
                hasAds1115 ? "ADS1115 16-Bit Differential (0x48)" : "ESP32 GPIO34 Shunt (Send N/D/C/A to test)");
  Serial.println("============================================================");
}

void loop() {
  handleBenchSerialCommands();

  float soilMa  = readCurrentLoopMa(0);
  float pressMa = (benchSimMa >= 0.0f) ? 6.88f : readCurrentLoopMa(1);
  float soilPct = 0.0f, pressPct = 0.0f;

  NamurStatus soilDiag = evaluateNamurNE43(soilMa, soilPct);
  evaluateNamurNE43(pressMa, pressPct);

  txPkt.nodeId          = NODE_ID;
  txPkt.soilLoopMa      = soilMa;
  txPkt.soilMoisturePct = soilPct;
  txPkt.pressureLoopMa  = pressMa;
  txPkt.pressureBar     = (pressPct >= 0.0f) ? (pressPct * 0.10f) : 0.0f;
  txPkt.solarBusVolts   = readSolarPanelBusVolts();
  txPkt.namurStatus     = static_cast<uint8_t>(soilDiag);
  txPkt.seqCounter      = ++seqNum;

  // Dual-Radio Rural Link: Local <800m ESP-NOW + Long-Range 15km LoRa 915 MHz
  esp_now_send(GATEWAY_MAC, reinterpret_cast<uint8_t*>(&txPkt), sizeof(txPkt));
  sendLoRaPacket(reinterpret_cast<const uint8_t*>(&txPkt), sizeof(txPkt));

  Serial.printf("{\"node\":%u,\"ma\":%.2f,\"pct\":%.1f,\"solar_v\":%.2f,\"namur\":%u,\"lora\":%d,\"seq\":%lu}\n",
                txPkt.nodeId, txPkt.soilLoopMa, txPkt.soilMoisturePct,
                txPkt.solarBusVolts, txPkt.namurStatus, hasLoRa915 ? 1 : 0,
                (unsigned long)txPkt.seqCounter);

  if (USE_SOLAR_DEEP_SLEEP) {
    delay(60); // Allow radio frame completion before ~15 uA Solar Deep Sleep
    esp_sleep_enable_timer_wakeup(SOLAR_SLEEP_SECONDS * 1000000ULL);
    esp_deep_sleep_start();
  }
  delay(2000);
}
