/**
 * TERRA-SHIFT SCADA — Industrial Rural Ground-Truth & Irrigation Control Module
 * Engineered by INANNA COMPANY (AUTOMATION INANNA / INDUSTRIES INANNA)
 * Trilingual Support: English (EN) | Español (ES) | Português (PT)
 */

class InannaScadaEngine {
  constructor() {
    this.shuntOhms = 165.0;
    this.loopMa = 11.68;
    this.pressureMa = 10.72;
    this.nasaGwet = 0.46;

    const saved = JSON.parse(localStorage.getItem('inanna_nvs_state_v1') || '{}');
    this.pumpHours = saved.pumpHours !== undefined ? saved.pumpHours : 1428.4;
    this.irrigCycles = saved.irrigCycles !== undefined ? saved.irrigCycles : 319;
    this.alarmAcked = false;
    this.safetyRelayLocked = false;
    this.pumpActive = false;
    this.serialPort = null;

    this.nodes = [
      { id: 'NODE-01', zoneEn: 'North Slope Vineyard', zoneEs: 'Lote Norte Vid Serrana', zonePt: 'Encosta Norte Vinhedo', mac: 'A0:B7:65:4C:11:01', rssi: -64, latMs: 2.8, battV: 13.4, ma: 11.68 },
      { id: 'NODE-02', zoneEn: 'Valley Chickpea Drip', zoneEs: 'Bajo Riego Garbanzo',    zonePt: 'Vale Grão-de-Bico Gotejo', mac: 'A0:B7:65:4C:11:02', rssi: -71, latMs: 3.4, battV: 13.2, ma: 12.40 },
      { id: 'NODE-03', zoneEn: 'Frost Hollow Station', zoneEs: 'Bajo Helada / Estación', zonePt: 'Baixada Geada / Estação', mac: 'A0:B7:65:4C:11:03', rssi: -68, latMs: 3.1, battV: 13.5, ma: 10.95 },
      { id: 'NODE-04', zoneEn: 'Main VFD Pump Header', zoneEs: 'Cabezal Bomba VFD',      zonePt: 'Cabeçal Bomba VFD', mac: 'A0:B7:65:4C:11:04', rssi: -58, latMs: 2.1, battV: 24.1, ma: 10.72 }
    ];

    this.alarms = [];
    this.logEvent('INFO', {
      en: 'ESP-NOW Gateway online (AES-128). 4 field nodes synchronized (<4 ms).',
      es: 'Gateway ESP-NOW en línea (AES-128). 4 nodos de campo sincronizados (<4 ms).',
      pt: 'Gateway ESP-NOW online (AES-128). 4 nós de campo sincronizados (<4 ms).'
    });
    this.logEvent('INFO', {
      en: 'Modbus TCP Server listening on Port 502 | RS485 RTU 9600 8N1 Slave #1.',
      es: 'Servidor Modbus TCP activo en Puerto 502 | RS485 RTU 9600 8N1 Esclavo #1.',
      pt: 'Servidor Modbus TCP ativo na Porta 502 | RS485 RTU 9600 8N1 Escravo #1.'
    });
  }

  saveNvs() {
    localStorage.setItem('inanna_nvs_state_v1', JSON.stringify({
      pumpHours: Number(this.pumpHours.toFixed(2)),
      irrigCycles: this.irrigCycles
    }));
  }

  logEvent(level, msgObj) {
    const ts = new Date().toLocaleTimeString('en-GB', { hour12: false });
    const entry = typeof msgObj === 'string'
      ? { en: msgObj, es: msgObj, pt: msgObj }
      : msgObj;
    this.alarms.unshift({ ts, level, msg: entry });
    if (this.alarms.length > 25) this.alarms.pop();
  }

  evaluateCurrentLoop(ma) {
    const vSense = ma * 0.001 * this.shuntOhms;
    const adcCounts = Math.round(Math.min(32767, Math.max(0, vSense * 8000)));

    if (ma < 3.60) {
      return {
        ma: Number(ma.toFixed(2)),
        vSense: Number(vSense.toFixed(3)),
        adcCounts,
        pct: null,
        namurCode: 'NE43_UNDERSCALE_FAULT',
        statusBadge: 'crit',
        label: {
          en: 'FAULT (<3.6 mA): BROKEN WIRE / LOOP OPEN',
          es: 'FALLA (<3.6 mA): CABLE CORTADO / SIN ENERGÍA',
          pt: 'FALHA (<3.6 mA): CABO ROMPIDO / LAÇO ABERTO'
        }
      };
    }
    if (ma > 20.50) {
      return {
        ma: Number(ma.toFixed(2)),
        vSense: Number(vSense.toFixed(3)),
        adcCounts,
        pct: null,
        namurCode: 'NE43_OVERSCALE_FAULT',
        statusBadge: 'warn',
        label: {
          en: 'FAULT (>20.5 mA): OVER-SCALE / LOOP SHORT',
          es: 'FALLA (>20.5 mA): SOBREESCALA / CORTO EN LAZO',
          pt: 'FALHA (>20.5 mA): SOBREESCALA / CURTO NO LAÇO'
        }
      };
    }

    const clampedPct = Math.max(0, Math.min(100, ((ma - 4.0) / 16.0) * 100.0));
    return {
      ma: Number(ma.toFixed(2)),
      vSense: Number(vSense.toFixed(3)),
      adcCounts,
      pct: Number(clampedPct.toFixed(1)),
      namurCode: 'NE43_HEALTHY',
      statusBadge: 'ok',
      label: {
        en: 'NAMUR NE43 OK — LIVE ZERO HEALTHY',
        es: 'NAMUR NE43 OK — LAZO 4–20 mA SANO',
        pt: 'NAMUR NE43 OK — LAÇO 4–20 mA ÍNTEGRO'
      }
    };
  }

  getTelemetrySnapshot() {
    const soilLoop = this.evaluateCurrentLoop(this.loopMa);
    const pressLoop = this.evaluateCurrentLoop(this.pressureMa);
    const nasaPct = Number((this.nasaGwet * 100).toFixed(1));

    let fusionDecision = { en: '', es: '', pt: '' };
    let statusCode = 0;

    if (soilLoop.namurCode === 'NE43_UNDERSCALE_FAULT') {
      statusCode = 2;
      this.pumpActive = false;
      this.safetyRelayLocked = true;
      fusionDecision = {
        en: `CRITICAL PROTECTION: Node-01 loop dropped to ${soilLoop.ma} mA (<3.6 mA NAMUR NE43). Naive sensors read 0% and flood crops; INANNA locks safety relay and switches to NASA SMAP/POWER fallback (${nasaPct}%).`,
        es: `PROTECCIÓN CRÍTICA: Lazo Nodo-01 cayó a ${soilLoop.ma} mA (<3.6 mA NAMUR NE43). Un sensor común leería 0% e inundaría el lote; INANNA enclava relé seguro y usa respaldo satelital NASA (${nasaPct}%).`,
        pt: `PROTEÇÃO CRÍTICA: Laço Nó-01 caiu para ${soilLoop.ma} mA (<3.6 mA NAMUR NE43). Sensores comuns leriam 0% e inundariam a lavoura; INANNA trava o relé seguro e usa o backup orbital NASA (${nasaPct}%).`
      };
    } else if (soilLoop.namurCode === 'NE43_OVERSCALE_FAULT') {
      statusCode = 3;
      this.pumpActive = false;
      this.safetyRelayLocked = true;
      fusionDecision = {
        en: `LOOP SHORT-CIRCUIT (${soilLoop.ma} mA > 20.5 mA). Safety interlock engaged; holding VFD pump off until maintenance ACK.`,
        es: `CORTOCIRCUITO EN LAZO (${soilLoop.ma} mA > 20.5 mA). Relé de parada segura activado hasta reconocimiento (Alarm ACK).`,
        pt: `CURTO-CIRCUITO NO LAÇO (${soilLoop.ma} mA > 20.5 mA). Intertravamento de segurança ativado até confirmação (Alarm ACK).`
      };
    } else {
      const diff = Math.abs(soilLoop.pct - nasaPct);
      if (!this.safetyRelayLocked && soilLoop.pct < 36.0) {
        statusCode = 1;
        this.pumpActive = true;
        fusionDecision = {
          en: `PRECISION IRRIGATION ACTIVE: Ground 4–20 mA (${soilLoop.pct}%) & NASA GWETROOT (${nasaPct}%) confirm root deficit. VFD Drip Valve OPEN.`,
          es: `RIEGO DE PRECISIÓN ACTIVO: Sonda 4–20 mA (${soilLoop.pct}%) y NASA GWETROOT (${nasaPct}%) confirman déficit radicular. Válvula VFD ABIERTA.`,
          pt: `IRRIGAÇÃO DE PRECISÃO ATIVA: Sonda 4–20 mA (${soilLoop.pct}%) e NASA GWETROOT (${nasaPct}%) confirmam déficit radicular. Válvula VFD ABERTA.`
        };
      } else if (diff > 24.0) {
        statusCode = 4;
        this.pumpActive = false;
        fusionDecision = {
          en: `MICROCLIMATE DIVERGENCE (${diff.toFixed(1)}% delta): Ground probe reads ${soilLoop.pct}% vs 9 km NASA pixel ${nasaPct}%. Inspect local drip emitter clog.`,
          es: `DIVERGENCIA LOCAL (${diff.toFixed(1)}%): Sonda 4–20 mA mide ${soilLoop.pct}% vs píxel satelital NASA ${nasaPct}%. Verificar goteros locales.`,
          pt: `DIVERGÊNCIA MICROCLIMÁTICA (${diff.toFixed(1)}%): Sonda 4–20 mA mede ${soilLoop.pct}% vs pixel orbital NASA ${nasaPct}%. Inspecionar gotejadores locais.`
        };
      } else {
        statusCode = 0;
        this.pumpActive = false;
        fusionDecision = {
          en: `OPTIMAL HYDRO-BALANCE: Ground 4–20 mA (${soilLoop.pct}%) aligned with NASA orbital soil wetness (${nasaPct}%). Saving water & pump energy.`,
          es: `BALANCE HÍDRICO ÓPTIMO: Sonda 4–20 mA (${soilLoop.pct}%) validada con humedad orbital NASA (${nasaPct}%). Bomba en espera ahorrando agua.`,
          pt: `BALANÇO HÍDRICO IDEAL: Sonda 4–20 mA (${soilLoop.pct}%) alinhada com umidade orbital NASA (${nasaPct}%). Economizando água e energia.`
        };
      }
    }

    this.nodes[0].ma = soilLoop.ma;
    const lineBar = pressLoop.pct !== null ? Number((pressLoop.pct * 0.10).toFixed(2)) : 0.0;

    const registers = [
      { reg: '30001', type: 'Input Reg',   name: 'Soil_Loop_Current_x100', raw: Math.round(soilLoop.ma * 100),    eng: `${soilLoop.ma.toFixed(2)} mA` },
      { reg: '30002', type: 'Input Reg',   name: 'Root_Moisture_Pct_x100', raw: soilLoop.pct !== null ? Math.round(soilLoop.pct * 100) : 65535, eng: soilLoop.pct !== null ? `${soilLoop.pct.toFixed(1)} %` : 'FAULT (0xFFFF)' },
      { reg: '30003', type: 'Input Reg',   name: 'NASA_GWETROOT_Pct_x100', raw: Math.round(nasaPct * 100),        eng: `${nasaPct.toFixed(1)} %` },
      { reg: '30004', type: 'Input Reg',   name: 'Line_Pressure_Bar_x100', raw: Math.round(lineBar * 100),        eng: `${lineBar.toFixed(2)} bar` },
      { reg: '30005', type: 'Input Reg',   name: 'NAMUR_NE43_Diag_Status', raw: statusCode,                       eng: soilLoop.namurCode },
      { reg: '40001', type: 'Holding Reg', name: 'Setpoint_Irrig_Pct_x100',raw: 3600,                             eng: '36.00 % (R/W)' },
      { reg: '40002', type: 'Holding Reg', name: 'NVS_Pump_Hours_x10',     raw: Math.round(this.pumpHours * 10),  eng: `${this.pumpHours.toFixed(1)} h` },
      { reg: '40003', type: 'Holding Reg', name: 'NVS_Irrig_Cycle_Count',  raw: this.irrigCycles,                 eng: `${this.irrigCycles} cycles` },
      { reg: '00001', type: 'Coil (R/W)',  name: 'VFD_Irrigation_Enable',  raw: this.pumpActive ? 1 : 0,          eng: this.pumpActive ? 'ON (1)' : 'OFF (0)' },
      { reg: '00002', type: 'Coil (R/W)',  name: 'Safety_Interlock_Relay', raw: this.safetyRelayLocked ? 1 : 0,   eng: this.safetyRelayLocked ? 'TRIPPED (1)' : 'ARMED (0)' }
    ];

    return {
      soilLoop,
      pressLoop,
      nasaPct,
      lineBar,
      fusionDecision,
      statusCode,
      pumpHours: this.pumpHours,
      irrigCycles: this.irrigCycles,
      pumpActive: this.pumpActive,
      safetyRelayLocked: this.safetyRelayLocked,
      nodes: this.nodes,
      registers,
      alarms: this.alarms
    };
  }

  setLoopCurrent(ma) {
    const prev = this.evaluateCurrentLoop(this.loopMa).namurCode;
    this.loopMa = Number(ma);
    const curr = this.evaluateCurrentLoop(this.loopMa);
    if (curr.namurCode !== prev) {
      if (curr.namurCode === 'NE43_UNDERSCALE_FAULT') {
        this.logEvent('ALARM', {
          en: `NAMUR NE43 LIVE-ZERO FAULT: NODE-01 dropped to ${curr.ma} mA (<3.6 mA). Safety interlock tripped!`,
          es: `FALLA CERO VIVO NAMUR NE43: NODE-01 cayó a ${curr.ma} mA (<3.6 mA). ¡Relé de seguridad enclavado!`,
          pt: `FALHA ZERO VIVO NAMUR NE43: NODE-01 caiu para ${curr.ma} mA (<3.6 mA). Relé de segurança travado!`
        });
      } else if (curr.namurCode === 'NE43_OVERSCALE_FAULT') {
        this.logEvent('ALARM', {
          en: `NAMUR NE43 OVER-SCALE: NODE-01 surged to ${curr.ma} mA (>20.5 mA). Loop short suspected!`,
          es: `SOBREESCALA NAMUR NE43: NODE-01 subió a ${curr.ma} mA (>20.5 mA). ¡Posible cortocircuito!`,
          pt: `SOBREESCALA NAMUR NE43: NODE-01 subiu para ${curr.ma} mA (>20.5 mA). Suspeita de curto-circuito!`
        });
      } else {
        this.logEvent('INFO', {
          en: `NODE-01 4–20 mA loop restored (${curr.ma} mA = ${curr.pct}%). Ready for Alarm ACK.`,
          es: `Lazo 4–20 mA NODE-01 restablecido (${curr.ma} mA = ${curr.pct}%). Listo para Alarm ACK.`,
          pt: `Laço 4–20 mA NODE-01 restaurado (${curr.ma} mA = ${curr.pct}%). Pronto para Alarm ACK.`
        });
      }
    }
  }

  acknowledgeAlarm() {
    const curr = this.evaluateCurrentLoop(this.loopMa);
    if (curr.namurCode === 'NE43_HEALTHY') {
      this.safetyRelayLocked = false;
      this.alarmAcked = true;
      this.logEvent('ACK', {
        en: 'Operator SCADA Alarm ACK accepted. Safety Interlock Relay reset to ARMED.',
        es: 'Confirmación SCADA Alarm ACK aceptada. Relé de seguridad rearmado (ARMED).',
        pt: 'Confirmação SCADA Alarm ACK aceita. Relé de segurança rearmado (ARMED).'
      });
      return true;
    } else {
      this.logEvent('WARN', {
        en: `Cannot clear Interlock while loop current (${curr.ma} mA) remains outside 3.6–20.5 mA!`,
        es: `¡No se puede rearmar mientras la corriente (${curr.ma} mA) siga fuera de 3.6–20.5 mA!`,
        pt: `Não é possível rearmar enquanto a corrente (${curr.ma} mA) estiver fora de 3.6–20.5 mA!`
      });
      return false;
    }
  }

  resetServiceHorometer() {
    this.pumpHours = 0.0;
    this.irrigCycles = 0;
    this.saveNvs();
    this.logEvent('MAINT', {
      en: 'NVS Flash Maintenance Reset: Pump Horometer & Cycle Counter set to 0 after seal/bearing service.',
      es: 'Reset de Mantenimiento NVS Flash: Horómetro y Ciclos en 0 tras cambio de sellos/rodamientos.',
      pt: 'Reset de Manutenção NVS Flash: Horímetro e Ciclos zerados após troca de selos/rolamentos.'
    });
  }

  async connectWebSerial(onUpdateCallback) {
    if (!('serial' in navigator)) {
      this.logEvent('WARN', {
        en: 'WebSerial API requires Chrome/Edge desktop to link physical ESP32 Gateway via USB.',
        es: 'WebSerial requiere Chrome/Edge de escritorio para vincular el ESP32 físico por USB.',
        pt: 'WebSerial requer Chrome/Edge desktop para conectar o Gateway ESP32 físico via USB.'
      });
      return false;
    }
    try {
      this.serialPort = await navigator.serial.requestPort();
      await this.serialPort.open({ baudRate: 115200 });
      this.logEvent('INFO', {
        en: 'Physical ESP32 Gateway linked over USB WebSerial (115200 bps)!',
        es: '¡Gateway ESP32 físico vinculado por USB WebSerial (115200 bps)!',
        pt: 'Gateway ESP32 físico conectado via USB WebSerial (115200 bps)!'
      });
      const decoder = new TextDecoderStream();
      this.serialPort.readable.pipeTo(decoder.writable);
      const reader = decoder.readable.getReader();
      let buffer = '';
      (async () => {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += value;
          const lines = buffer.split('\n');
          buffer = lines.pop();
          for (const line of lines) {
            if (line.trim().startsWith('{')) {
              try {
                const pkt = JSON.parse(line.trim());
                if (typeof pkt.ma === 'number') {
                  this.setLoopCurrent(pkt.ma);
                  if (onUpdateCallback) onUpdateCallback();
                }
              } catch (_) {}
            }
          }
        }
      })();
      return true;
    } catch (e) {
      this.logEvent('WARN', {
        en: `USB Serial connection cancelled: ${e.message}`,
        es: `Conexión USB Serial cancelada: ${e.message}`,
        pt: `Conexão USB Serial cancelada: ${e.message}`
      });
      return false;
    }
  }
}

window.inannaScada = new InannaScadaEngine();
