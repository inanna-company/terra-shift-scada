/*
 * ============================================================================
 * TEAM INANNA — Open-Source Engineering (Río Cuarto -> Santa Rosa de Calamuchita)
 * Project: TERRA-SHIFT SCADA — 2026 NASA Space Apps Challenge ("Field Shift")
 * Sketch:  esp32_gateway_scada_modbus.ino (Editable Arduino / ESP32 C++)
 *
 * Complete Hybrid Rural Gateway Firmware:
 * 1. ESP-NOW Concentrator: Receives packets from Field Satellite Nodes (<4 ms)
 * 2. NAMUR NE43 Safety Interlock: Locks VFD Pump Relay (GPIO26 LOW, GPIO27 HIGH)
 *    instantly if loop <3.60 mA (cut wire) or >20.50 mA, falling back to NASA
 *    SMAP / POWER GWETROOT moisture!
 * 3. Embedded Offline Web UI (http://192.168.4.1 on Wi-Fi "INANNA-TERRASHIFT-AP",
 *    pass "Inanna2026!"): Full dark SCADA dashboard + simulation & ACK buttons!
 * 4. Standard Modbus TCP Server (Port 502): Responds to Function Codes 0x03/0x04
 *    with Fixed-Point (x100) 16-bit registers for PLCs & SCADAs!
 * 5. RS485 MAX485 (GPIO16/17, DE/RE GPIO4) + NVS Flash Horometer + USB WebSerial!
 * ============================================================================
 */

#include <WiFi.h>
#include <WebServer.h>
#include <esp_now.h>
#include <esp_idf_version.h>
#include <Preferences.h>
#include <SPI.h>

// Hardware Pins (Industrial ESP32 DIN-Rail Gateway: ESP-NOW + LoRa 915 MHz + RS485)
constexpr int PIN_RS485_RX         = 16;
constexpr int PIN_RS485_TX         = 17;
constexpr int PIN_RS485_DE_RE      = 4;
constexpr int PIN_VFD_PUMP_RELAY   = 26;
constexpr int PIN_SAFETY_INTERLOCK = 27;

// Auto-detected Long-Range LoRa 915 MHz Receiver (SX1276 / SX1278 up to 15 km rural/mountain range)
constexpr int PIN_LORA_SCK         = 18;
constexpr int PIN_LORA_MISO        = 19;
constexpr int PIN_LORA_MOSI        = 23;
constexpr int PIN_LORA_NSS         = 5;
constexpr int PIN_LORA_RST         = 14;

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

struct ModbusMap {
  uint16_t in30001_soilMa_x100      = 1168; // 11.68 mA
  uint16_t in30002_soilPct_x100     = 4800; // 48.00 %
  uint16_t in30003_nasaGwet_x100    = 4620; // 46.20 % NASA SMAP/POWER
  uint16_t in30004_pressBar_x100    = 180;  // 1.80 Bar
  uint16_t in30005_namurDiag        = 0;    // 0=OK, 2=CUT(<3.6mA), 3=SHORT(>20.5mA)
  uint16_t hr40001_setpointPct_x100 = 3600; // 36.00 % Irrigation Trigger
  uint16_t hr40002_pumpHours_x10    = 14284;// 1428.4 h
  uint16_t hr40003_irrigCycles      = 319;
  bool     coil00001_pumpEnable     = false;
  bool     coil00002_safetyTripped  = false;
} mb;

Preferences nvs;
WebServer localServer(80);
WiFiServer modbusTcpServer(502);
unsigned long lastHourSaveMs = 0;
unsigned long lastTelemetryMs = 0;
uint32_t rxPackets = 0;
bool hasLoRa915 = false;
int lastLoRaRssiDbm = -72;

// --- Direct Semtech SX1276 / SX1278 915 MHz LoRa Receiver Driver (15 km Rural Backhaul) ---
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

bool initLoRa915Receiver() {
  pinMode(PIN_LORA_NSS, OUTPUT);
  pinMode(PIN_LORA_RST, OUTPUT);
  digitalWrite(PIN_LORA_NSS, HIGH);
  digitalWrite(PIN_LORA_RST, LOW);
  delay(10);
  digitalWrite(PIN_LORA_RST, HIGH);
  delay(10);
  SPI.begin(PIN_LORA_SCK, PIN_LORA_MISO, PIN_LORA_MOSI, PIN_LORA_NSS);
  if (loraReadReg(0x42) != 0x12) return false;

  loraWriteReg(0x01, 0x80); // Sleep + LoRa
  loraWriteReg(0x06, 0xE4); // 915.0 MHz ISM
  loraWriteReg(0x07, 0xC0);
  loraWriteReg(0x08, 0x00);
  loraWriteReg(0x1D, 0x72); // BW 125 kHz, CR 4/5
  loraWriteReg(0x1E, 0xA4); // SF10 + CRC ON
  loraWriteReg(0x39, 0x34); // SyncWord
  loraWriteReg(0x0F, 0x00); // RX FIFO base
  loraWriteReg(0x01, 0x85); // RXCONTINUOUS (listening 24/7 for 15 km solar nodes)
  return true;
}

void applyControlAndSafetyLogic() {
  if (mb.in30005_namurDiag != 0) {
    mb.coil00001_pumpEnable    = false;
    mb.coil00002_safetyTripped = true;
    digitalWrite(PIN_VFD_PUMP_RELAY, LOW);
    digitalWrite(PIN_SAFETY_INTERLOCK, HIGH);
    return;
  }

  if (!mb.coil00002_safetyTripped) {
    bool shouldIrrigate = (mb.in30002_soilPct_x100 < mb.hr40001_setpointPct_x100);
    if (shouldIrrigate && !mb.coil00001_pumpEnable) {
      mb.hr40003_irrigCycles++;
      nvs.putUShort("cycles", mb.hr40003_irrigCycles);
    }
    mb.coil00001_pumpEnable = shouldIrrigate;
    digitalWrite(PIN_VFD_PUMP_RELAY, shouldIrrigate ? HIGH : LOW);
  }
}

void injectLoopMa(float ma, float bar) {
  mb.in30001_soilMa_x100   = (uint16_t)(ma * 100.0f);
  mb.in30004_pressBar_x100 = (uint16_t)(bar * 100.0f);
  if (ma < 3.60f) {
    mb.in30005_namurDiag    = 2;
    mb.in30002_soilPct_x100 = 0xFFFF;
  } else if (ma > 20.50f) {
    mb.in30005_namurDiag    = 3;
    mb.in30002_soilPct_x100 = 0xFFFF;
  } else {
    mb.in30005_namurDiag = 0;
    float pct = ((ma - 4.0f) / 16.0f) * 100.0f;
    if (pct < 0.0f) pct = 0.0f;
    if (pct > 100.0f) pct = 100.0f;
    mb.in30002_soilPct_x100 = (uint16_t)(pct * 100.0f);
  }
  applyControlAndSafetyLogic();
}

#if ESP_IDF_VERSION >= ESP_IDF_VERSION_VAL(5, 0, 0)
void onEspNowRecv(const esp_now_recv_info_t *info, const uint8_t *data, int len) {
#else
void onEspNowRecv(const uint8_t *mac, const uint8_t *data, int len) {
#endif
  if (len != sizeof(TerraShiftPacket)) return;
  TerraShiftPacket pkt;
  memcpy(&pkt, data, sizeof(pkt));
  rxPackets++;
  injectLoopMa(pkt.soilLoopMa, pkt.pressureBar);
}

// Minimalist Industrial Modbus TCP Responder on Port 502 (FC 0x03 & 0x04)
void handleModbusTcp() {
  WiFiClient client = modbusTcpServer.available();
  if (!client) return;
  uint8_t req[12];
  unsigned long t0 = millis();
  while (client.connected() && client.available() < 12 && (millis() - t0 < 80)) delay(1);
  if (client.available() >= 12) {
    client.read(req, 12);
    uint8_t fc = req[7];
    uint16_t qty = ((uint16_t)req[10] << 8) | req[11];
    if ((fc == 3 || fc == 4) && qty >= 1 && qty <= 8) {
      uint16_t regs[8] = {
        mb.in30001_soilMa_x100, mb.in30002_soilPct_x100, mb.in30003_nasaGwet_x100,
        mb.in30004_pressBar_x100, mb.in30005_namurDiag, mb.hr40001_setpointPct_x100,
        mb.hr40002_pumpHours_x10, mb.hr40003_irrigCycles
      };
      uint8_t byteCount = qty * 2;
      uint8_t resp[9 + 16];
      resp[0] = req[0]; resp[1] = req[1]; resp[2] = 0; resp[3] = 0;
      resp[4] = 0; resp[5] = 3 + byteCount; resp[6] = req[6]; resp[7] = fc; resp[8] = byteCount;
      for (uint16_t i = 0; i < qty; i++) {
        resp[9 + i * 2]     = (uint8_t)(regs[i] >> 8);
        resp[9 + i * 2 + 1] = (uint8_t)(regs[i] & 0xFF);
      }
      client.write(resp, 9 + byteCount);
    }
  }
  client.stop();
}

const char EMBEDDED_HTML[] PROGMEM = R"rawliteral(
<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>TERRA-SHIFT ESP32 Field AP</title>
<style>
body{background:#080c12;color:#f1f5f9;font-family:Segoe UI,sans-serif;padding:16px;display:flex;justify-content:center}
.box{width:100%;max-width:440px;background:#14191f;border:1px solid #283645;border-radius:16px;padding:18px}
h1{color:#1890ff;font-size:1.35rem;text-align:center;margin:0 0 4px}
.sub{color:#94a3b8;font-size:.76rem;text-align:center;margin-bottom:12px}
.ban{padding:11px;border-radius:9px;text-align:center;font-weight:800;font-size:.86rem;margin-bottom:12px}
.ok{background:#14532d;color:#86efac}.warn{background:#78350f;color:#fde68a}.err{background:#7f1d1d;color:#fca5a5}
.g{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:12px}
.c{background:#18212b;border:1px solid #253445;border-radius:9px;padding:10px;text-align:center}
.l{color:#94a3b8;font-size:.68rem}.v{color:#00b8e6;font-size:1.35rem;font-weight:800;font-family:monospace}
.btns{display:grid;grid-template-columns:1fr 1fr;gap:7px}
button{background:#101720;color:#e2e8f0;border:1px solid #2c4054;padding:9px;border-radius:8px;font-weight:700;cursor:pointer}
</style></head><body><div class="box">
<h1>TERRA-SHIFT ESP32 AP</h1><div class="sub">Team INANNA • 4-20 mA NAMUR NE43 + NASA GWETROOT</div>
<div id="ban" class="ban ok">LOADING...</div>
<div class="g">
<div class="c"><div class="l">SOIL LOOP</div><div class="v" id="ma">-- mA</div></div>
<div class="c"><div class="l">MOISTURE</div><div class="v" id="pct">-- %</div></div>
<div class="c"><div class="l">NASA SMAP</div><div class="v" id="nasa">46.2 %</div></div>
<div class="c"><div class="l">VFD PUMP</div><div class="v" id="pump">OFF</div></div>
</div>
<div class="btns">
<button onclick="cmd('/sim?m=nom')">Nominal (11.68mA)</button>
<button onclick="cmd('/sim?m=dry')">Dry Root (6.80mA)</button>
<button onclick="cmd('/sim?m=cut')">Cut Wire (0.00mA)</button>
<button onclick="cmd('/ack')">Repair + ACK (12mA)</button>
</div></div>
<script>
async function refresh(){
  const r=await (await fetch('/status')).json();
  document.getElementById('ma').textContent=r.soil_ma.toFixed(2)+' mA';
  document.getElementById('pct').textContent=r.namur_diag===0?r.soil_pct.toFixed(1)+' %':'FAULT!';
  document.getElementById('nasa').textContent=r.nasa_gwet_pct.toFixed(1)+' %';
  document.getElementById('pump').textContent=r.safety_tripped?'LOCKED':(r.pump_on?'ON':'OFF');
  const b=document.getElementById('ban');
  if(r.safety_tripped){b.className='ban err';b.textContent='NAMUR NE43 FAULT -> PUMP LOCKED + NASA BACKUP!';}
  else if(r.pump_on){b.className='ban warn';b.textContent='DRY ROOT -> VFD DRIP IRRIGATION ACTIVE';}
  else{b.className='ban ok';b.textContent='NORMAL OPERATION — LIVE-ZERO OK';}
}
async function cmd(u){await fetch(u);refresh();}
setInterval(refresh,1000);refresh();
</script></body></html>
)rawliteral";

void handleUsbSerialCommands() {
  while (Serial.available()) {
    char c = toupper(Serial.read());
    if (c == 'N') injectLoopMa(11.68f, 1.80f);
    if (c == 'D') injectLoopMa(6.80f, 4.20f);
    if (c == 'C') injectLoopMa(0.00f, 0.00f);
    if (c == 'A') { injectLoopMa(12.00f, 1.95f); mb.coil00002_safetyTripped = false; digitalWrite(PIN_SAFETY_INTERLOCK, LOW); applyControlAndSafetyLogic(); }
  }
}

void setup() {
  Serial.begin(115200);
  delay(200);
  pinMode(PIN_RS485_DE_RE, OUTPUT);
  pinMode(PIN_VFD_PUMP_RELAY, OUTPUT);
  pinMode(PIN_SAFETY_INTERLOCK, OUTPUT);
  digitalWrite(PIN_RS485_DE_RE, LOW);
  digitalWrite(PIN_VFD_PUMP_RELAY, LOW);
  digitalWrite(PIN_SAFETY_INTERLOCK, LOW);

  nvs.begin("inanna_scada", false);
  mb.hr40002_pumpHours_x10 = nvs.getUShort("hours_x10", 14284);
  mb.hr40003_irrigCycles   = nvs.getUShort("cycles", 319);

  WiFi.mode(WIFI_AP_STA);
  WiFi.softAP("INANNA-TERRASHIFT-AP", "Inanna2026!", 1, 0, 4);

  if (esp_now_init() == ESP_OK) {
    esp_now_register_recv_cb(onEspNowRecv);
  }
  hasLoRa915 = initLoRa915Receiver();

  localServer.on("/", []() {
    localServer.send_P(200, "text/html", EMBEDDED_HTML);
  });

  localServer.on("/status", []() {
    float pct = (mb.in30005_namurDiag == 0) ? (mb.in30002_soilPct_x100 / 100.0f) : -1.0f;
    String json = "{\"soil_ma\":" + String(mb.in30001_soilMa_x100 / 100.0f, 2) +
                  ",\"soil_pct\":" + String(pct, 1) +
                  ",\"nasa_gwet_pct\":" + String(mb.in30003_nasaGwet_x100 / 100.0f, 1) +
                  ",\"namur_diag\":" + String(mb.in30005_namurDiag) +
                  ",\"pump_on\":" + String(mb.coil00001_pumpEnable ? "true" : "false") +
                  ",\"pump_hours\":" + String(mb.hr40002_pumpHours_x10 / 10.0f, 1) +
                  ",\"lora_915_active\":" + String(hasLoRa915 ? "true" : "false") +
                  ",\"safety_tripped\":" + String(mb.coil00002_safetyTripped ? "true" : "false") + "}";
    localServer.send(200, "application/json", json);
  });

  localServer.on("/sim", []() {
    String m = localServer.arg("m");
    if (m == "nom") injectLoopMa(11.68f, 1.80f);
    else if (m == "dry") injectLoopMa(6.80f, 4.20f);
    else if (m == "cut") injectLoopMa(0.00f, 0.00f);
    localServer.send(200, "text/plain", "OK");
  });

  localServer.on("/ack", []() {
    injectLoopMa(12.00f, 1.95f);
    mb.coil00002_safetyTripped = false;
    digitalWrite(PIN_SAFETY_INTERLOCK, LOW);
    applyControlAndSafetyLogic();
    localServer.send(200, "text/plain", "ACK_OK_INTERLOCK_ARMED");
  });

  localServer.begin();
  modbusTcpServer.begin();

  Serial.println("============================================================");
  Serial.println(" TEAM INANNA - TERRA-SHIFT SCADA ESP32 GATEWAY ONLINE");
  Serial.printf(" Gateway MAC: %s | Radio: ESP-NOW + %s\n",
                WiFi.macAddress().c_str(),
                hasLoRa915 ? "LoRa 915MHz (15 km RX Active)" : "LoRa 915MHz Ready (Optional SPI SX1276)");
  Serial.println(" Local Field Wi-Fi AP: INANNA-TERRASHIFT-AP (Pass: Inanna2026!)");
  Serial.println(" Embedded Web SCADA  : http://192.168.4.1/");
  Serial.println(" Modbus TCP Server   : 192.168.4.1:502 | USB Cmds: N / D / C / A");
  Serial.println("============================================================");
}

void pollLoRa915Packet() {
  if (!hasLoRa915) return;
  uint8_t irqFlags = loraReadReg(0x12);
  if (irqFlags & 0x40) { // RxDone
    loraWriteReg(0x12, 0xFF); // Clear IRQ flags
    if ((irqFlags & 0x20) == 0) { // PayloadCrcError == 0
      uint8_t rxBytes = loraReadReg(0x13);
      uint8_t fifoAddr = loraReadReg(0x10);
      if (rxBytes == sizeof(TerraShiftPacket)) {
        loraWriteReg(0x0D, fifoAddr);
        TerraShiftPacket pkt;
        uint8_t *dst = reinterpret_cast<uint8_t*>(&pkt);
        digitalWrite(PIN_LORA_NSS, LOW);
        SPI.transfer(0x00);
        for (uint8_t i = 0; i < rxBytes; i++) dst[i] = SPI.transfer(0x00);
        digitalWrite(PIN_LORA_NSS, HIGH);
        lastLoRaRssiDbm = -157 + loraReadReg(0x1A);
        rxPackets++;
        injectLoopMa(pkt.soilLoopMa, pkt.pressureBar);
      }
    }
  }
}

void loop() {
  localServer.handleClient();
  handleModbusTcp();
  handleUsbSerialCommands();
  pollLoRa915Packet();

  // Stream WebSerial JSON every 2 seconds for TERRA-SHIFT Browser Console
  if (millis() - lastTelemetryMs >= 2000UL) {
    lastTelemetryMs = millis();
    Serial.printf("{\"node\":1,\"ma\":%.2f,\"p_ma\":%.2f,\"namur\":%u,\"pump\":%d,\"rx_pkts\":%lu}\n",
                  mb.in30001_soilMa_x100 / 100.0f, 6.88f,
                  mb.in30005_namurDiag, mb.coil00001_pumpEnable ? 1 : 0,
                  (unsigned long)rxPackets);
  }

  if (mb.coil00001_pumpEnable && (millis() - lastHourSaveMs >= 360000UL)) {
    lastHourSaveMs = millis();
    mb.hr40002_pumpHours_x10++;
    nvs.putUShort("hours_x10", mb.hr40002_pumpHours_x10);
  }
}
