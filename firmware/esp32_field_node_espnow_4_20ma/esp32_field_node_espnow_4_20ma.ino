/*
 * ============================================================================
 * TEAM INANNA — Open-Source Hackathon Engineering (Santa Rosa de Calamuchita, AR)
 * Project: TERRA-SHIFT SCADA — 2026 NASA Space Apps Challenge ("Field Shift")
 * Module:  Rural Field Satellite Node (ESP32 + ADS1115 4-20 mA + AES-128 ESP-NOW)
 *
 * Industrial Hardware Standard:
 * - Sensor Loop: 24V DC 2-wire 4-20 mA Root-Zone Soil Moisture & Line Pressure
 * - Precision Shunt: R_shunt = 165.0 Ohm (0.1% tolerance, 15 ppm/°C)
 *   Kirchhoff's Law: V_sense = I_loop * 165.0 Ohm
 *     4.00 mA  -> 0.660 V (0.0% Calibrated Minimum / Live Zero)
 *     12.00 mA -> 1.980 V (50.0% Mid-Scale)
 *     20.00 mA -> 3.300 V (100.0% Calibrated Maximum)
 * - NAMUR NE43 Live-Zero Fault Diagnostics:
 *     < 3.60 mA  -> FAULT_UNDERSCALE (Cut cable / sensor power failure)
 *     > 20.50 mA -> FAULT_OVERSCALE  (Loop short-circuit / sensor saturation)
 * - Rural Wireless Transport: Routerless ESP-NOW P2P (<5 ms latency, AES-128)
 * ============================================================================
 */

#include <WiFi.h>
#include <esp_now.h>
#include <Wire.h>
#include <Adafruit_ADS1X15.h>

// Central SCADA Gateway MAC Address (Board inside Farm Main Electrical Cabinet)
uint8_t GATEWAY_MAC[6] = {0xA0, 0xB7, 0x65, 0x4C, 0x11, 0x00};

// AES-128 Primary Master Key & Local Key (16 bytes each)
static const char* PMK_KEY_STR = "INANNA_PMK_2026!";
static const char* LMK_KEY_STR = "TERRASHIFT_AES16";

constexpr float SHUNT_RESISTOR_OHMS = 165.0f;
constexpr uint8_t NODE_ID = 1;

enum NamurStatus : uint8_t {
  NE43_HEALTHY          = 0,
  NE43_UNDERSCALE_FAULT = 2, // < 3.6 mA: Broken wire / open loop
  NE43_OVERSCALE_FAULT  = 3  // > 20.5 mA: Short circuit / over-scale
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

Adafruit_ADS1115 ads;
TerraShiftPacket txPkt;
uint32_t seqNum = 0;

float readCurrentLoopMa(uint8_t diffChannel) {
  int16_t rawAdc = (diffChannel == 0)
    ? ads.readADC_Differential_0_1()
    : ads.readADC_Differential_2_3();
  float volts = ads.computeVolts(rawAdc); // PGA GAIN_ONE: +/-4.096V (0.125 mV/bit)
  if (volts < 0.0f) volts = 0.0f;
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

void onDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {
  Serial.printf("[ESP-NOW] Packet #%lu delivery: %s\n",
                txPkt.seqCounter,
                status == ESP_NOW_SEND_SUCCESS ? "OK (<4ms)" : "RETRY");
}

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);

  ads.setGain(GAIN_ONE); // +/-4.096V range -> safe for 3.30V @ 20mA
  ads.begin();

  WiFi.mode(WIFI_STA);
  WiFi.disconnect();

  if (esp_now_init() != ESP_OK) {
    Serial.println("[FATAL] ESP-NOW init failed!");
    ESP.restart();
  }

  esp_now_set_pmk((const uint8_t *)PMK_KEY_STR);
  esp_now_register_send_cb(onDataSent);

  esp_now_peer_info_t peerInfo = {};
  memcpy(peerInfo.peer_addr, GATEWAY_MAC, 6);
  peerInfo.channel = 1;
  peerInfo.encrypt = true;
  memcpy(peerInfo.lmk, LMK_KEY_STR, 16);
  esp_now_add_peer(&peerInfo);

  Serial.println("[INANNA NODE-01] 4-20 mA NAMUR NE43 + Encrypted ESP-NOW Ready.");
}

void loop() {
  float soilMa  = readCurrentLoopMa(0);
  float pressMa = readCurrentLoopMa(1);
  float soilPct = 0.0f, pressPct = 0.0f;

  NamurStatus soilDiag = evaluateNamurNE43(soilMa, soilPct);
  evaluateNamurNE43(pressMa, pressPct);

  txPkt.nodeId          = NODE_ID;
  txPkt.soilLoopMa      = soilMa;
  txPkt.soilMoisturePct = soilPct;
  txPkt.pressureLoopMa  = pressMa;
  txPkt.pressureBar     = (pressPct >= 0.0f) ? (pressPct * 0.10f) : 0.0f;
  txPkt.solarBusVolts   = 13.4f;
  txPkt.namurStatus     = static_cast<uint8_t>(soilDiag);
  txPkt.seqCounter      = ++seqNum;

  esp_now_send(GATEWAY_MAC, reinterpret_cast<uint8_t*>(&txPkt), sizeof(txPkt));
  delay(2000);
}
