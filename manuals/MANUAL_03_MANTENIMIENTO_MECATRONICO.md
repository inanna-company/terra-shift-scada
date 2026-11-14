# 📙 MANUAL 03 — Mantenimiento Industrial Mecatrónico (Preventivo, Predictivo, Correctivo y Calibración)

- **Código Documento:** `INANNA-MNT-TS2026-03` (Rev 2.0 — ISO 14224 / RCM / TPM / NAMUR NE43)
- **Dirección Técnica Mecatrónica:** **Fabio Maximiliano Medina Rojas — Técnico Superior en Mecatrónica**
- **Equipo de Ingeniería (INANNA COMPANY):** Fabio Maximiliano Medina Rojas • Agustín Alejandro Debia • Iván David Coria
- **Divisiones:** `SERVICE INANNA` • `INDUSTRIES INANNA` • `AUTOMATION INANNA`
- **Versión Web Trilingüe (EN | ES | PT):** [Abrir Manual de Mantenimiento Interactivo](https://inanna-company.github.io/terra-shift-scada/manuals/index.html?doc=m3)

---

## ⚠️ Regla de Oro de Seguridad Electromecánica (LOTO — Lockout / Tagout)
Antes de abrir el tablero del variador de frecuencia (VFD), intervenir la bomba centrífuga o manipular borneras `24V DC` / `RS485`, seccionar interruptor principal, colocar **candado personal y tarjeta LOTO**, y verificar `0.0 V AC/DC` con multímetro True-RMS CAT III/IV.

---

## 1. Mantenimiento Preventivo Sistemático (Horómetro NVS Registro `40002`)

El Gateway ESP32 almacena en memoria Flash no volátil (**NVS**) las horas reales de bombeo (`40002`) y ciclos de arranque (`40003`):

| Intervalo / Horómetro | Subsistema | Acción Mecatrónica Preventiva |
| :--- | :--- | :--- |
| **Cada 250 h / Trimestral** | Nodos Solares y Filtrado | Limpieza de paneles solares; purga y retrolavado de filtros de anillas/malla; inspección de prensaestopas `IP67` y fichas M12. |
| **Cada 750 h / Semestral** | Tablero y Bus RS485 | Reapriete dinamométrico de borneras DIN (`0.5 N·m`); control de resistencias terminadoras de `120 Ω` en extremos del bus RS485; limpieza de ventiladores VFD. |
| **Cada 1.500 h (Alerta SCADA)** | Bomba Centrífuga y Sellos | Inspección de sello mecánico de eje, control vibratorio/térmico de rodamientos, cambio de O-rings y ejecución de **`⟲ Reset Servicio NVS`** en SCADA. |
| **Cada 3.000 h / Anual** | Banco LiFePO4 y PAT | Prueba de capacidad bajo carga (`V_bus >= 12.8 V`) y medición con telurímetro de jabalina de protección atmosférica (`R_PAT < 10 Ω`). |

---

## 2. Mantenimiento Predictivo / Basado en Condición (CBM)

1. **Predicción Temprana de Taponamiento de Goteros (Divergencia Orbital-Terrestre):** Si el Registro `30002` (sonda `4–20 mA`) cae `> 24%` por debajo del Registro `30003` (`NASA GWETROOT`) pese al riego activo, el sistema anticipa incrustación calcárea local antes de que caiga el vigor fotosintético `MODIS NDVI`.
2. **Predicción de Cavitación y Rotura Hidráulica (Registro `30004` Presión):**
   - *Suba progresiva de presión (`> 5.5 bar`) a iguales RPM del VFD:* Predice colmatación de filtros antes de falla por sobrecorriente.
   - *Caída brusca (`< 1.8 bar`) en marcha:* Detecta rotura de cañería matriz o succión de aire/cavitación.
3. **Degradación RF y Baterías:** Monitoreo de tendencia `RSSI` (`ESP-NOW`) por crecimiento de follaje y pendiente nocturna $\Delta V/\Delta t$ en celdas solares.

---

## 3. Mantenimiento Correctivo (Árbol de Fallas NAMUR NE43) y Calibración Patrón

- **`NE43_UNDERSCALE_FAULT` (`< 3.60 mA` / `< 0.594 V` en shunt):** Cable cortado, fusible de `100 mA` abierto o falla en fuente `24V DC`. Reparar con empalme estanco en gel `IP68`, comprobar corriente en rango `4.00–20.00 mA` y presionar **`✓ Reconocer Alarma (ACK)`** para liberar el relé de enclavamiento (`Coil 00002`).
- **`NE43_OVERSCALE_FAULT` (`> 20.50 mA` / `> 3.383 V` en shunt):** Humedad en conector M12 o cortocircuito en par trenzado. Secar/limpiar con dieléctrico, contrastar con inyector de `12.00 mA` y ejecutar **`Alarm ACK`**.
- **Calibración Metrológica Anual de 3 Puntos (`165.0 Ω 0.1%`):** Inyectar con calibrador certificado `4.000 mA` (`0.660 V = 0.0%`), `12.000 mA` (`1.980 V = 50.0%`) y `20.000 mA` (`3.300 V = 100.0%`), más prueba de disparo seguro a `3.40 mA` (`< 100 ms`).
