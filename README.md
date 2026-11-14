# TERRA-SHIFT SCADA — Orbital-to-Root Agricultural Adaptation & Rural IIoT Platform

**Developed by Team INANNA COMPANY**  
*Fabio Maximiliano Medina Rojas • Agustín Alejandro Debia • Iván David Coria*  
**Local Event:** Santa Rosa de Calamuchita, Córdoba, Argentina  
**2026 NASA Space Apps Challenge** — *Challenge: "Field Shift: Adapting Farms with NASA Data"*

---

## 🌍 Executive Overview

**TERRA-SHIFT SCADA** bridges the gap between planetary-scale **NASA Earth Observation data** and **routerless industrial farm automation**.

Climate change is rapidly shifting thermal envelopes, frost dates, and root-zone soil moisture across agricultural belts worldwide—including Córdoba and the Calamuchita Valley in Argentina. While satellite datasets track macro trends, farmers in low-connectivity rural regions struggle to translate 9 km satellite pixels into crop transition decisions and fault-safe daily irrigation.

**TERRA-SHIFT SCADA** solves both halves of the problem in a single, offline-capable bilingual (`EN / ES`) platform:
1. **Macro Orbital Decision-Support:** Queries live 20-year agroclimatic records from the **NASA POWER API**, renders live **NASA EOSDIS GIBS** satellite layers (*MODIS NDVI, SMAP Root-Zone Soil Moisture, MODIS Land Surface Temperature, VIIRS True Color*), and models **2035 & 2050 CMIP6 (`SSP2-4.5` / `SSP5-8.5`) Crop Suitability Shifts** across 10 traditional and climate-resilient alternative crops.
2. **Micro Ground-Truth Rural IIoT SCADA (`AUTOMATION INANNA`):** Cross-validates NASA orbital soil wetness (`GWETROOT`) against industrial **4–20 mA current-loop probes** (`165 Ω 0.1%` shunt + 16-bit `ADS1115`) with **NAMUR NE43 Live-Zero fault diagnostics** (`< 3.6 mA` broken wire protection), transmitted over routerless **AES-128 ESP-NOW** to a **Modbus RTU (RS485) / Modbus TCP (Port 502)** farm gateway with non-volatile **NVS** persistence.

---

## 🛰️ NASA & Space Agency Partner Datasets Integrated

| Source | Dataset / Parameter | Role in TERRA-SHIFT |
| :--- | :--- | :--- |
| **NASA POWER API** | `T2M`, `T2M_MAX`, `T2M_MIN`, `PRECTOTCORR`, `GWETROOT`, `GWETTOP`, `ALLSKY_SFC_SW_DWN`, `RH2M` | Live REST historical multi-decade point telemetry & trend regression anywhere on Earth |
| **NASA EOSDIS GIBS** | `MODIS_Terra_NDVI_8Day`, `SMAP_L4_Analyzed_Root_Zone_Soil_Moisture`, `MODIS_Terra_Land_Surface_Temp_Day`, `VIIRS_SNPP` | Real-time WMTS orbital layers over agricultural regions |
| **NASA NEX-GDDP-CMIP6** | Downscaled `SSP2-4.5` & `SSP5-8.5` regional climate trajectories | 2035 & 2050 thermal, frost, and aridity crop suitability shift modeling |
| **NASA Harvest & ECOSTRESS** | Agricultural water-use efficiency & evapotranspiration frameworks | Crop water requirement & Regulated Deficit Irrigation (RDI) calibration |
| **CONAE (Argentina)** | `SAOCOM 1A/1B` L-Band SAR Soil Moisture reference | Regional Space Agency Partner synergy for Argentine Pampas & Córdoba valleys |

---

## ⚙️ Repository Structure

```text
├── index.html                         # Main TERRA-SHIFT SCADA Interactive Web App (EN/ES + PWA)
├── css/styles.css                     # INANNA Aerospace/Industrial Dark Design System & Print CSS
├── js/
│   ├── nasa-api.js                    # Live NASA POWER REST Client, OLS Trend Engine & CMIP6 Projector
│   ├── crop-engine.js                 # 10-Crop Multi-Factor Suitability & Economic Shift Model
│   ├── scada-iiot.js                  # 4-20 mA NAMUR NE43 Simulator, Sensor Fusion, Modbus & WebSerial
│   └── app.js                         # Leaflet GIBS Map, Chart.js Analytics & Bilingual UI Controller
├── presentation/
│   └── deck_7_slides.html             # Official 7-Slide Widescreen Demo Deck (English, PDF-ready)
├── firmware/
│   ├── esp32_field_node_espnow_4_20ma/ # ESP32 + ADS1115 4-20mA NAMUR NE43 + AES-128 ESP-NOW Node
│   └── esp32_gateway_scada_modbus/     # ESP32 Gateway: ESP-NOW -> Modbus RTU/TCP + NVS + Local AP
├── manifest.json & sw.js              # Offline-First Rural Progressive Web App Cache
└── SUBMISSION_KIT_INANNA.md           # Ready-to-paste official Space Apps form answers
```

---

## 🚀 Running Locally in Seconds

No build step or API keys required:
```bash
python -m http.server 8080
```
Then open `http://localhost:8080` (and `http://localhost:8080/presentation/deck_7_slides.html` for the 7-slide presentation).

---

## 🤖 Use of Super Intelligence (SI) / AI Disclosure

In full compliance with the **2026 NASA Space Apps Challenge** guidelines:
- The core solution concept, orbital-to-ground agronomic fusion model, industrial 4–20 mA NAMUR NE43 safety architecture, and ESP-NOW/Modbus hardware design are original works by **Team INANNA COMPANY**.
- Generative AI assistance (*Google Gemini / Antigravity*) was utilized to accelerate frontend code scaffolding, documentation formatting, and English translation refinement.
- Zero NASA insignias, logos, or restricted mission identifiers were generated or modified.
