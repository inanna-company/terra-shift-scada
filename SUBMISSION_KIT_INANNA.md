# 🏆 KIT OFICIAL DE ENTREGA — TEAM INANNA COMPANY (NASA SPACE APPS 2026)

URL directa de tu formulario de entrega:  
👉 **`https://www.spaceappschallenge.org/2026/find-a-team/inanna-company/?tab=project`**

> **IMPORTANTE:** Todos los textos de abajo ya están redactados en **inglés técnico impecable**, optimizados para los **5 criterios oficiales del Jurado de la NASA** (*Impact, Creativity, Validity, Relevance, Presentation*) y verificados dentro de los límites estrictos de caracteres.

---

## SECCIÓN A — Project Summary

### 1. `Project Name`
```text
TERRA-SHIFT SCADA: Orbital-to-Root Farm Adaptation & Rural IIoT
```

### 2. `Summary *` *(Límite máximo: 1500 caracteres — Este texto tiene **1,118 caracteres** / 162 palabras)*
```text
TERRA-SHIFT SCADA is an interactive agricultural climate-adaptation decision-support platform and routerless rural IIoT SCADA developed by Team INANNA COMPANY for "Field Shift: Adapting Farms with NASA Data." Climate change is shifting temperatures, frost windows, and rainfall across farming belts like Córdoba, Argentina, while rural connectivity gaps prevent farmers from turning macro satellite pixels into field action.

Our platform queries live 20-year NASA POWER agroclimatology series and renders live NASA EOSDIS GIBS satellite layers (MODIS NDVI, SMAP Root-Zone Soil Moisture, MODIS Land Surface Temperature, and VIIRS) for any clicked farm GPS coordinate on Earth. It models 2035–2050 CMIP6 (SSP2-4.5/SSP5-8.5) crop suitability shifts across 10 traditional and resilient alternative crops (such as sorghum, chickpea, olive, pistachio, and high-altitude Malbec). Finally, it bridges orbital data with offline-first ESP32 field nodes (AES-128 ESP-NOW + industrial 4–20 mA probes with NAMUR NE43 broken-wire protection and Modbus TCP/RTU) for fail-safe precision irrigation.
```

---

## SECCIÓN B — Project Links

*(URLs oficiales con tu cuenta `github.com/inanna-company` y repositorio público `terra-shift-scada` con GitHub Pages activo)*:

### 1. `Project Demonstration *` *(Link público al Deck Oficial de 7 Slides en inglés)*
```text
https://inanna-company.github.io/terra-shift-scada/presentation/deck_7_slides.html
```

### 2. `Project *` *(Link público a la Web App interactiva en vivo)*
```text
https://inanna-company.github.io/terra-shift-scada/
```
*(Y el código fuente completo + firmware ESP32 queda público en `https://github.com/inanna-company/terra-shift-scada`, que también podés sumar como link en NASA/Other Data).*

---

## SECCIÓN C — Project Information

### 1. `Project Details *` *(Copiar y pegar en el editor de texto enriquecido)*

**What TERRA-SHIFT SCADA Does**
**TERRA-SHIFT SCADA** (engineered by **Team INANNA COMPANY**: Fabio Maximiliano Medina Rojas, Agustín Alejandro Debia, and Iván David Coria in Santa Rosa de Calamuchita, Córdoba, Argentina) is an end-to-end **Orbital-to-Root Agricultural Climate Adaptation & Rural Automation System**. It empowers smallholder farmers, agricultural cooperatives, agronomists, and regional water managers to answer two urgent questions:
1. *Which traditional crops are losing viability on my exact parcel over the next 10–25 years, and which climate-resilient crops and water strategies offer higher stability and economic return?*
2. *How do we execute precision adaptation in rural fields that lack reliable Wi-Fi/cellular coverage and where cheap sensors fail?*

**How It Works (Dual-Layer Orbital + Industrial Architecture)**
1. **Live Planetary Intelligence Layer (Macro Scale):**
   - Users select regional presets (e.g., *Santa Rosa de Calamuchita*, *Río Cuarto Pampas Core*, *Traslasierra*, *Mendoza*, *San Joaquin Valley*) or click **any GPS coordinate on Earth**.
   - The web application fetches live 20-year historical series (`2004–2024`) from the **NASA POWER Agroclimatology REST API** (`T2M`, `T2M_MAX`, `T2M_MIN`, `PRECTOTCORR`, `GWETROOT` root-zone soil wetness, `GWETTOP`, `ALLSKY_SFC_SW_DWN` solar irradiance, and `RH2M`) and displays real-time **NASA EOSDIS GIBS WMTS** satellite overlays (**MODIS Terra NDVI**, **SMAP L4 Root-Zone Soil Moisture**, **MODIS Land Surface Temperature**, and **VIIRS True Color**).
   - Combining observed Ordinary Least Squares (OLS) decadal trends with **NASA NEX-GDDP-CMIP6** regional projections (`SSP2-4.5` and `SSP5-8.5` for `2035` and `2050`), our **Crop Suitability Shift Engine** scores 10 crops across thermal envelopes, pollination heat-shock penalties, frost limits, and water balance under Rainfed, Regenerative Cover-Crop, and Precision IIoT Drip scenarios.

2. **Routerless Ground-Truth & Irrigation SCADA Layer (Micro Scale):**
   - Macro satellite pixels (`9 km` SMAP) cannot detect a clogged drip line or a rodent-cut field cable. We pair orbital `GWETROOT` data with open industrial **ESP32 C++ firmware**:
   - **4–20 mA Current Loop + NAMUR NE43 Live-Zero Diagnostics:** Field probes use a `24V DC` loop across a precision `165.0 Ω (0.1%)` shunt resistor and 16-bit `ADS1115` differential ADC. If current drops below **`3.60 mA`** (broken wire/power loss), naive sensors read `0%` moisture and flood the field; **TERRA-SHIFT** immediately triggers a **NAMUR NE43 Underscale Fault**, locks the safety interlock relay, and falls back to NASA's orbital moisture budget until maintenance `Alarm ACK`.
   - **AES-128 ESP-NOW Rural Mesh & Modbus RTU/TCP:** Solar field nodes transmit P2P MAC-to-MAC frames (`< 4 ms` latency) without routers or cellular plans to a central ESP32 Gateway speaking **Modbus RTU over isolated RS485 (`MAX485`)** and **Modbus TCP (Port 502)** with fixed-point (`×100`) registers and **NVS** flash persistence for pump horometers.

**Intended Impact & Regional Findings**
In Córdoba and Calamuchita, our analysis highlights rising summer heat stress and rainfall volatility affecting early rainfed maize and soybean, while revealing strong `2035–2050` resilience and economic margins for **grain sorghum, Kabuli chickpea, high-altitude Malbec vineyards, super-high-density olive, pistachio, and serrana aromatics**—cutting supplemental water demand by up to **35%** when paired with closed-loop drip automation.

**Tools, Languages & Hardware Stack**
- **Frontend & Analytics:** HTML5, CSS3, Vanilla JavaScript (ES6+), Leaflet.js (WMTS orbital mapping), Chart.js, WebSerial API (live USB hardware bridge), Offline Service Worker (PWA), Bilingual `EN/ES` engine, Printable PDF Farm Plan.
- **Embedded & Industrial Hardware:** ESP32 (C++ / Arduino), `ADS1115` 16-bit ADC, `165 Ω 0.1%` shunt, 4–20 mA transmitters (`NAMUR NE43`), `ESP-NOW` (AES-128), `MAX485` RS485 (`Modbus RTU`), `Modbus TCP` (Port 502), ESP32 `Preferences` NVS Flash.
- **AI Transparency Disclosure:** Core system architecture, agronomic-mechatronic fusion, and industrial NAMUR NE43/ESP-NOW/Modbus design are original works by Team INANNA COMPANY; generative AI (*Google Gemini / Antigravity*) assisted with UI code scaffolding, layout formatting, and English translation.

---

### 2. `Use of Super Intelligence (SI) *` *(Marcar estas opciones en el desplegable)*
- [x] `Coding, Debugging, or Troubleshooting`
- [x] `Writing, Editing, or Translation`
- [x] `Presentation, Video, or Audio`

---

### 3. `NASA Data *` *(Agregar cada fila con `+ Add New Link`)*

| Link Text | Link Url |
| :--- | :--- |
| `NASA POWER Agroclimatology API (T2M, PRECTOTCORR, GWETROOT, Solar)` | `https://power.larc.nasa.gov/` |
| `NASA EOSDIS GIBS (MODIS NDVI, MODIS LST, SMAP L4, VIIRS WMTS)` | `https://earthdata.nasa.gov/eosdis/science-system-description/eosdis-components/gibs` |
| `NASA SMAP (Soil Moisture Active Passive Mission)` | `https://smap.jpl.nasa.gov/` |
| `NASA NEX-GDDP-CMIP6 Global Daily Downscaled Projections` | `https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6` |
| `NASA Harvest & ECOSTRESS Agricultural Water Stress Frameworks` | `https://nasaharvest.org/` |

---

### 4. `Space Agency Partner & Other Data` *(Agregar cada fila con `+ Add New Link`)*

| Link Text | Link Url |
| :--- | :--- |
| `INANNA COMPANY — TERRA-SHIFT SCADA Open Repository & ESP32 Firmware` | `https://github.com/inanna-company/terra-shift-scada` |
| `CONAE Argentina — SAOCOM 1A/1B L-Band SAR Soil Moisture Mission` | `https://www.argentina.gob.ar/ciencia/conae/misiones-espaciales/saocom` |
| `Leaflet.js Open-Source Interactive Mapping Library` | `https://leafletjs.com/` |
| `Chart.js Open-Source HTML5 Data Visualization Library` | `https://www.chartjs.org/` |
| `OpenStreetMap & CARTO Dark Basemap Tiles` | `https://www.openstreetmap.org/copyright` |
| `Espressif ESP-IDF / Arduino ESP32 ESP-NOW Documentation` | `https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/network/esp_now.html` |
| `Google Gemini / Antigravity (AI Coding & Translation Assistance)` | `https://deepmind.google/technologies/gemini/` |
