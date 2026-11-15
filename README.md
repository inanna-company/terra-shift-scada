# TERRA-SHIFT SCADA — Orbital-to-Root Agricultural Adaptation & Rural IIoT Platform

![Team INANNA — 2026 NASA Space Apps Challenge](assets/inanna-logo-horizontal.jpg)

**Developed by Contestant Team INANNA (Open-Source Hackathon Project)**  
- **Fabio Maximiliano Medina Rojas** — *Team Lead & System Architect | Higher Technician in Mechatronics (`Técnico Superior en Mecatrónica`)*  
- **Agustín Alejandro Debia** — *Co-Developer | Systems & Agro-Climate Analytics*  
- **Iván David Coria** — *Co-Developer | Field Operations & Rural Validation*  

**Local Event:** Santa Rosa de Calamuchita, Córdoba, Argentina  
**2026 NASA Space Apps Challenge** — *Challenge: "Field Shift: Adapting Farms with NASA Data"*

---

## 🌐 Live Open-Source Hackathon Suite (`English` | `Español` | `Português`)

| Module | Live URL | Description |
| :--- | :--- | :--- |
| **🛰️ Main Interactive SCADA & Climate App** | [https://inanna-company.github.io/terra-shift-scada/](https://inanna-company.github.io/terra-shift-scada/) | Live NASA POWER + GIBS orbital map, 10-crop CMIP6 matrix, 12-month phenology calendar, Water/VFD/Carbon Environmental Simulator, interactive 4–20 mA NAMUR NE43 + ESP-NOW + Modbus simulator, Mechatronic P&ID blueprint, and **Inanna Neural Voice Guided Jury Tour** (`EN / ES / PT`) |
| **📊 Official 7-Slide Demo Deck** | [https://inanna-company.github.io/terra-shift-scada/presentation/deck_7_slides.html](https://inanna-company.github.io/terra-shift-scada/presentation/deck_7_slides.html) | Strictly ≤ 7 widescreen slides (`1280×720` print-ready PDF) in `EN / ES / PT` + **1-Click Inanna Voice Narration** |
| **📚 3 Official Technical, User & Maintenance Manuals** | [https://inanna-company.github.io/terra-shift-scada/manuals/index.html](https://inanna-company.github.io/terra-shift-scada/manuals/index.html) | Complete KaTeX scientific/mechatronic formulas manual, zero-knowledge farmer Plug & Play guide, and Industrial CBM Maintenance manual (`EN / ES / PT`) |

---

## 🌍 Executive Overview

**TERRA-SHIFT SCADA** is a 100% open-source hackathon project bridging planetary-scale **NASA Earth Observation data** with **routerless rural mechatronics**.

Climate change is rapidly shifting thermal envelopes, frost dates, and root-zone soil moisture across agricultural belts worldwide—including Córdoba and the Calamuchita Valley in Argentina. While satellite datasets track macro trends, farmers in low-connectivity rural regions struggle to translate 9 km satellite pixels into crop transition decisions and fault-safe daily irrigation.

**TERRA-SHIFT SCADA** solves both halves of the problem in a single, offline-capable trilingual (`EN / ES / PT`) platform:
1. **Macro Orbital Decision-Support:** Queries live 20-year agroclimatic records from the **NASA POWER API**, renders live **NASA EOSDIS GIBS** satellite layers (*MODIS NDVI, SMAP Root-Zone Soil Moisture, MODIS Land Surface Temperature, VIIRS True Color*), models **2035 & 2050 CMIP6 (`SSP2-4.5` / `SSP5-8.5`) Crop Suitability Shifts** across 10 traditional and climate-resilient crops, generates a **12-Month Seasonal Phenology & Frost/Heat Calendar**, and quantifies **Farm-Scale Freshwater Conservation, VFD Affinity-Law Pump Energy Savings (`P ∝ N³`), and Carbon Reduction**.
2. **Micro Ground-Truth Rural IIoT SCADA:** Cross-validates NASA orbital soil wetness (`GWETROOT`) against open-hardware **24V DC 4–20 mA current-loop probes** (`165.0 Ω 0.1%` Kirchhoff shunt + 16-bit `ADS1115` differential ADC) with **NAMUR NE43 Live-Zero fault diagnostics** (`< 3.6 mA` broken wire protection / `> 20.5 mA` short-circuit detection), transmitted over routerless **AES-128 ESP-NOW** (`< 4 ms`) to a **Modbus RTU (RS485) / Modbus TCP (Port 502)** farm gateway with non-volatile **NVS Flash** persistence and safety interlock relay.

---

## 🛰️ NASA & Space Agency Partner Datasets Integrated

| Source | Dataset / Parameter | Role in TERRA-SHIFT |
| :--- | :--- | :--- |
| **NASA POWER API** | `T2M`, `T2M_MAX`, `T2M_MIN`, `PRECTOTCORR`, `GWETROOT`, `GWETTOP`, `ALLSKY_SFC_SW_DWN`, `RH2M` | Live REST historical 20-year annual & monthly point telemetry + OLS decadal trend regression anywhere on Earth |
| **NASA EOSDIS GIBS** | `MODIS_Terra_NDVI_8Day`, `SMAP_L4_Analyzed_Root_Zone_Soil_Moisture`, `MODIS_Terra_Land_Surface_Temp_Day`, `VIIRS_SNPP` | Real-time WMTS orbital layers over agricultural regions |
| **NASA NEX-GDDP-CMIP6** | Downscaled `SSP2-4.5` & `SSP5-8.5` regional climate trajectories | 2035 & 2050 thermal, frost, and aridity crop suitability & 12-month phenology modeling |
| **NASA Harvest & ECOSTRESS** | Agricultural water-use efficiency & evapotranspiration frameworks | Crop water requirement & Regulated Deficit Irrigation (RDI) calibration |
| **CONAE (Argentina)** | `SAOCOM 1A/1B` L-Band SAR Soil Moisture reference | Regional Space Agency Partner synergy for Argentine Pampas & Córdoba valleys |

---

## ⚙️ Open-Source Repository Structure

```text
├── index.html                         # Main TERRA-SHIFT SCADA App (EN/ES/PT + PWA + Inanna Voice Tour)
├── assets/
│   ├── inanna-*.jpg                   # Team INANNA Visual Identity
│   └── audio/*.mp3                    # Inanna Neural Voice Narration (ES: ElenaNeural | EN: JennyNeural | PT: FranciscaNeural)
├── css/styles.css                     # Aerospace/Industrial Dark Design System, Voice Equalizer & Print CSS
├── js/
│   ├── nasa-api.js                    # Live NASA POWER REST Client, OLS Trend Engine & CMIP6 Projector
│   ├── crop-engine.js                 # Trilingual 10-Crop Multi-Factor Agronomic Suitability Engine
│   ├── scada-iiot.js                  # 4-20 mA NAMUR NE43 Simulator, Sensor Fusion, Modbus & WebSerial
│   ├── inanna-pro-suite.js            # 12-Mo Phenology Calendar, Water/VFD/CO2 Simulator, P&ID SVG & Inanna Voice Tour
│   └── app.js                         # Leaflet GIBS Map, Chart.js Analytics & Trilingual UI Controller
├── presentation/
│   └── deck_7_slides.html             # Official 7-Slide Widescreen Demo Deck (EN/ES/PT, PDF + Voice Narration)
├── manuals/
│   ├── index.html & manuals-data.js   # Interactive Trilingual Manuals Portal (EN/ES/PT + KaTeX Math)
│   ├── MANUAL_01_INGENIERIA_CIENTIFICA.md     # Scientific, Agronomic & Mechatronic Formulas Manual
│   ├── MANUAL_02_USUARIO_PLUG_AND_PLAY.md     # Zero-Knowledge Farmer & User Plug & Play Guide
│   └── MANUAL_03_MANTENIMIENTO_MECATRONICO.md # Industrial Preventive/Predictive/Corrective Maintenance
├── firmware/
│   ├── esp32_field_node_espnow_4_20ma/ # Open ESP32 + ADS1115 4-20mA NAMUR NE43 + AES-128 ESP-NOW Node
│   └── esp32_gateway_scada_modbus/     # Open ESP32 Gateway: ESP-NOW -> Modbus RTU/TCP + NVS + Local AP
├── manifest.json & sw.js              # Offline-First Rural Progressive Web App Cache (v4)
└── SUBMISSION_KIT_INANNA.md           # Official Space Apps project submission reference
```

---

## 🤖 Use of Super Intelligence (SI) / AI Disclosure

In full compliance with the **2026 NASA Space Apps Challenge** guidelines:
- The core solution concept, orbital-to-ground agronomic fusion model, industrial 4–20 mA NAMUR NE43 safety architecture, and ESP-NOW/Modbus hardware design are original works by **Team INANNA** (Santa Rosa de Calamuchita, Córdoba, Argentina).
- Generative AI assistance (*Google Gemini / Antigravity* and neural text-to-speech synthesis) was utilized to accelerate frontend code scaffolding, documentation formatting, trilingual (`EN / ES / PT`) translation refinement, and guided voice narration.
- Zero NASA insignias, logos, or restricted mission identifiers were generated or modified.
