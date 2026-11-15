# 🏆 KIT OFICIAL DE ENTREGA — TEAM INANNA (NASA SPACE APPS 2026)

URL directa de tu formulario de entrega:  
👉 **`https://www.spaceappschallenge.org/2026/find-a-team/inanna-company/?tab=project`**

> **100% PURO CONCURSO HACKATHON (SIN PRECIOS NI CONTENIDO CORPORATIVO COMERCIAL):** Todos los textos presentan a **Team INANNA** estrictamente como un equipo concursante open-source oriundo de **Río Cuarto, Córdoba, Argentina** compitiendo en la sede oficial **Santa Rosa de Calamuchita**.

---

## SECCIÓN A — Project Summary

### 1. `Project Name`
```text
TERRA-SHIFT SCADA: Orbital-to-Root Farm Adaptation & Rural IIoT
```

### 2. `Summary *` *(Límite máximo: 1500 caracteres)*
```text
TERRA-SHIFT SCADA is an open-source agricultural climate-adaptation decision-support platform and routerless rural IIoT SCADA developed by Team INANNA for "Field Shift: Adapting Farms with NASA Data." Climate change is shifting temperatures, frost windows, and rainfall across farming belts like Córdoba, Argentina, while rural connectivity gaps prevent farmers from turning macro satellite pixels into field action.

Our platform queries live 20-year NASA POWER agroclimatology series and renders live NASA EOSDIS GIBS satellite layers (MODIS NDVI, SMAP Root-Zone Soil Moisture, MODIS Land Surface Temperature, and VIIRS) for any clicked farm GPS coordinate on Earth. It models 2035–2050 CMIP6 (SSP2-4.5/SSP5-8.5) crop suitability shifts across 10 traditional and resilient alternative crops (such as sorghum, chickpea, olive, pistachio, and high-altitude Malbec), paired with a Guided Neural Voice Tour (EN/ES/PT). Finally, it bridges orbital data with offline-first ESP32 field nodes (AES-128 ESP-NOW + industrial 4–20 mA probes with NAMUR NE43 broken-wire protection and Modbus TCP/RTU) for fail-safe precision irrigation.
```

---

## SECCIÓN B — Project Links

### 1. `Project Demonstration *` *(Link público al Video Oficial de 29.00s `<30s` mostrando la emulación en vivo del código ESP32 + fusión NASA, con selector 100% puro EN / ES / PT y acceso directo al Deck de 7 Slides)*
```text
https://inanna-company.github.io/terra-shift-scada/video/index.html
```
*(Alternativa válida reglamento ≤ 7 Slides: `https://inanna-company.github.io/terra-shift-scada/presentation/deck_7_slides.html` — ambos links están cruzados e incluidos también dentro de Project Details).*

### 2. `Project *` *(Link público a la Web App interactiva en vivo + Emulador ESP32 + Código y Binarios `.bin` en GitHub)*
```text
https://inanna-company.github.io/terra-shift-scada/
```
*(Emulador directo ESP32 C++ & AP `192.168.4.1`: `https://inanna-company.github.io/terra-shift-scada/esp32/index.html` | Repositorio Open-Source con `.ino`, `.bin` y `.bat`: `https://github.com/inanna-company/terra-shift-scada`)*

---

## SECCIÓN C — Project Information

### 1. `Project Details *`

**What TERRA-SHIFT SCADA Does**
**TERRA-SHIFT SCADA** (engineered by contestant **Team INANNA**: Fabio Maximiliano Medina Rojas — *Higher Technician in Mechatronics*, Agustín Alejandro Debia, and Iván David Coria in Santa Rosa de Calamuchita, Córdoba, Argentina) is an open-source **Orbital-to-Root Agricultural Climate Adaptation & Rural Automation System** available in **English, Spanish, and Portuguese (`EN / ES / PT`)** with an interactive **Guided Neural Voice Tour narrated by Inanna**. It empowers smallholder farmers, agricultural cooperatives, agronomists, and rural technical schools to answer two urgent questions:
1. *Which traditional crops are losing viability on my exact parcel over the next 10–25 years, and which climate-resilient crops and water strategies offer higher harvest stability and freshwater conservation?*
2. *How do we execute precision adaptation in rural fields that lack reliable Wi-Fi/cellular coverage and where low-cost voltage sensors fail?*

**How It Works (Dual-Layer Orbital + Open Mechatronic Architecture)**
1. **Live Planetary Intelligence, 12-Month Phenology & Environmental Impact Layer (Macro Scale):**
   - Users select regional presets (e.g., *Santa Rosa de Calamuchita*, *Río Cuarto Pampas Core*, *Traslasierra*, *Mendoza*, *San Joaquin Valley*) or click **any GPS coordinate on Earth**.
   - The web application fetches live 20-year historical & monthly series (`2004–2024`) from the **NASA POWER Agroclimatology REST API** (`T2M`, `T2M_MAX`, `T2M_MIN`, `PRECTOTCORR`, `GWETROOT` root-zone soil wetness, `GWETTOP`, `ALLSKY_SFC_SW_DWN` solar irradiance, and `RH2M`) and displays real-time **NASA EOSDIS GIBS WMTS** satellite overlays (**MODIS Terra NDVI**, **SMAP L4 Root-Zone Soil Moisture**, **MODIS Land Surface Temperature**, and **VIIRS True Color**).
   - Combining observed Ordinary Least Squares (OLS) decadal trends with **NASA NEX-GDDP-CMIP6** regional projections (`SSP2-4.5` and `SSP5-8.5` for `2035` and `2050`), our **Crop Suitability Shift Engine** scores 10 crops across thermal envelopes, pollination heat-shock penalties, frost limits, and water balance, generating a **12-Month Seasonal Phenology & Frost/Heat Calendar** and a **Farm-Scale Freshwater Conservation, VFD Pump Affinity-Law (`P ∝ N³`) Energy & Carbon Simulator**.

2. **Routerless Ground-Truth, Live P&ID & Irrigation SCADA Layer (Micro Scale):**
   - Macro satellite pixels (`9 km` SMAP) cannot detect a clogged drip line or a rodent-cut field cable. We pair orbital `GWETROOT` data with open **ESP32 C++ firmware** and an interactive **Mechatronic P&ID Kirchhoff Blueprint**:
   - **4–20 mA Current Loop + NAMUR NE43 Live-Zero Diagnostics:** Field probes use a `24V DC` loop across a precision `165.0 Ω (0.1%)` Kirchhoff shunt resistor and 16-bit `ADS1115` differential ADC. If current drops below **`3.60 mA`** (broken wire/power loss), naive sensors read `0%` moisture and flood the field; **TERRA-SHIFT** immediately triggers a **NAMUR NE43 Underscale Fault**, locks the safety interlock relay, and falls back to NASA's orbital moisture budget until maintenance `Alarm ACK`.
   - **AES-128 ESP-NOW Rural Mesh & Modbus RTU/TCP:** Solar field nodes transmit P2P MAC-to-MAC frames (`< 4 ms` latency) without routers or cellular plans to a central ESP32 Gateway speaking **Modbus RTU over isolated RS485 (`MAX485`)** and **Modbus TCP (Port 502)** with fixed-point (`×100`) registers and **NVS** flash persistence for pump horometers, backed by **3 Official Trilingual Manuals** (Scientific KaTeX Engineering, Zero-Knowledge Farmer Plug & Play, and Industrial CBM Maintenance).

**Intended Impact, 3 Inclusive Adoption Tiers & 6-Device Solar LoRa + ESP32 Ecosystem**
- **3 Inclusive Adoption Tiers (Nobody Left Behind):**
  1. **Tier 1 — PC-Only / Zero Hardware (Smallholder & Family Farmers, 0.5–15 ha):** Requires zero sensors or electronics. With just a basic PC (cached offline as a PWA), family farmers click their parcel, access 20-year NASA POWER + SMAP + MODIS diagnostics, identify climate-resilient crops, check a 12-month frost/irrigation calendar, and print a 1-click PDF field plan.
  2. **Tier 2 — Plug & Play USB / Local AP (Medium Farms, Rural Schools & Cooperatives, 15–200 ha):** Using that same PC and our 4-second flasher (`FLASHEAR_ESP32_TERRASHIFT.bat`), users plug an ESP32 Gateway via USB WebSerial (`192.168.4.1`) and add modular Solar + LoRa/ESP-NOW nodes one by one.
  3. **Tier 3 — 30 km LoRa Mesh + Industrial SCADA (Large Agribusiness, 200–10,000+ ha):** Deploys full fleets of Solar + LoRa 915 MHz nodes bridged over Modbus TCP (:502) and isolated RS485 into industrial PLCs, 100 HP VFD pumps, and enterprise SCADA.
- **6 Plug-and-Play Zero-Signal Solar + LoRa 915 MHz + ESP32 Field Devices (Shared Motherboard):**
  1. **Solar Frost & Thermal-Inversion Sentinel** (Dual PT100 4–20 mA at 40 cm / 1.80 m + Reed Switch anemometer/rain gauge + 15 km LoRa alert & automatic anti-frost micro-sprinkler trigger).
  2. **Solar Bi-Stable Latching Solenoid Valve + Burst-Pipe Detector** (50 ms pulse 0.00 mA hold via DRV8871 + inline flowmeter shutting off clogged or animal-ruptured drip branches).
  3. **Solar Soil-Health Probe (NPK + Salinity EC + pH over RS485 Modbus)** (Cross-validating NASA MODIS NDVI yellowing against underground salinity, water stress, or nutrient deficiency).
  4. **Solar Australian-Tank, Livestock Trough & Deep-Well Level Monitor** (Submersible 4–20 mA hydrostatic probe preventing pump dry-run cavitation with NAMUR NE43 cut-wire protection).
  5. **Hilltop Solar Mesh Repeater (25–30 km) + Tractor/Pickup Cab OLED/E-Ink Monitor** (Relaying hidden mountain valleys and live-harvesting field status while driving across zero-signal farms).
  6. **Solar Silobag Grain-Preservation Sentinel Lance (CO₂ + Intergranular Moisture)** (Detecting wildlife bag tears and early biological fermentation 10 km away across Río Cuarto's grain belt).
- **Regional Córdoba Findings:** In Río Cuarto and Calamuchita, our analysis highlights rising summer heat stress affecting early rainfed maize and soybean, while revealing strong `2035–2050` resilience for **grain sorghum, Kabuli chickpea, high-altitude Malbec vineyards, super-high-density olive, pistachio, and serrana aromatics**—cutting supplemental freshwater demand by up to **38%**.

**Tools, Languages & Open Hardware Stack**
- **Frontend & Analytics:** HTML5, CSS3, Vanilla JavaScript (ES6+), Leaflet.js (WMTS orbital mapping), Chart.js, KaTeX, WebSerial API (live USB hardware bridge), Neural Voice Guided Tour (`EN/ES/PT`), Offline Service Worker (PWA), Printable PDF Farm Plan.
- **Embedded & Mechatronic Hardware:** ESP32 (C++ / Arduino), `ADS1115` 16-bit ADC, `165 Ω 0.1%` shunt, 4–20 mA transmitters (`NAMUR NE43`), `ESP-NOW` (AES-128), `MAX485` RS485 (`Modbus RTU`), `Modbus TCP` (Port 502), ESP32 `Preferences` NVS Flash.
- **AI Transparency Disclosure:** Core system architecture, agronomic-mechatronic fusion, and industrial NAMUR NE43/ESP-NOW/Modbus design are original works by contestant Team INANNA; generative AI (*Google Gemini / Antigravity* and neural TTS audio) assisted with UI code scaffolding, multilingual translation, and guided voice narration.
