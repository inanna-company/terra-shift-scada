# MEMORIA MAESTRA DEL PROYECTO — TERRA-SHIFT SCADA & IIoT (NASA SPACE APPS 2026)

> **ARCHIVO DE PUNTO DE RETORNO TOTAL (PASO A PASO)**
> Si el chat se cierra, se reinicia o retomás desde otra computadora o sesión de Antigravity, **leé este archivo primero (`d:\01 antigraviti varios\nasa\MEMORIA_PROYECTO_NASA_INANNA.md`)**. Acá está documentado absolutamente todo: arquitectura, separación de repositorios, equipo, credenciales, cómo flashear o editar los ESP32, cómo regenerar videos/audios y cómo actualizar GitHub y la página oficial de NASA Space Apps.

---

## 1. Datos Oficiales del Equipo y Desafío (2026 NASA Space Apps Challenge)

- **Nombre del Proyecto:** `TERRA-SHIFT SCADA & IIoT` (*Orbital-to-Root Crop Adaptation & Routerless Industrial Irrigation*)
- **Desafío Oficial:** `Field Shift: Adapting Farms with NASA Data`
- **Nombre del Equipo:** `INANNA COMPANY` (Presentado estrictamente como **Equipo Concursante de Ingeniería / Mecatrónica**, 100% no comercial y Open-Source)
- **Ciudad de Origen del Equipo:** **Río Cuarto, Córdoba, Argentina** (`-33.1230°, -64.3490°` — Corazón agroindustrial de la Pampa Húmeda cordobesa)
- **Sede Oficial de Competencia (Local Event):** **Santa Rosa de Calamuchita, Córdoba, Argentina** (`-32.0691°, -64.5364°`)
- **Integrantes Oficiales (3 Miembros — Cupo Cerrado / `Seeking Members: OFF`):**
  1. **Fabio Maximiliano Medina Rojas** — *Team Lead / Técnico Superior en Mecatrónica* (`@maximr123`)
  2. **Agustín Alejandro Debia** — *Team Member*
  3. **Iván David Coria** — *Team Member*

---

## 2. Separación Estricta de Repositorios (Concurso NASA vs. Web Corporativa)

Para cumplir al 100% con el espíritu y reglamento del hackathon (cero precios en `$`, cero venta comercial, cero catálogo corporativo dentro de la entrega de la NASA):

| Propósito | Carpeta Local en Disco | Repositorio GitHub | URL Pública en Vivo |
| :--- | :--- | :--- | :--- |
| **1. CONCURSO NASA SPACE APPS 2026** *(100% Técnico, Científico y Open-Source)* | `d:\01 antigraviti varios\nasa` | `https://github.com/inanna-company/terra-shift-scada` | `https://inanna-company.github.io/terra-shift-scada/` |
| **2. PÁGINA CORPORATIVA PROPIA INANNA COMPANY** *(Servicios, divisiones, catálogo comercial separado)* | `d:\01 antigraviti varios\inanna_web_corporativa` | `https://github.com/inanna-company/inanna-company.github.io` | `https://inanna-company.github.io/` |
| **3. SUITE INDUSTRIAL DE PLANTA INANNA** *(Proyecto industrial base previo)* | `d:\01 antigraviti varios\mantenimiendo` | Local (`MEMORIA_PROYECTO_INANNA.md`) | Suite SCADA Java + PWA + 7 Soluciones |

---

## 3. URLs Directas de Todos los Módulos del Proyecto NASA (100% Puros en `EN` | `ES` | `PT`)

Cada página arranca por defecto en **Inglés (`EN`)** para evaluación global de la NASA, y al tocar **`EN`**, **`ES`** o **`PT`** cambia el **100% absoluto del contenido** (interfaz, gráficos, planos SVG P&ID, tabla Modbus, manuales, diapositivas, voces neurales `.mp3` y hasta el video `.mp4` con subtítulos):

1. **Consola Principal Interactiva TERRA-SHIFT SCADA:**
   - Web: `https://inanna-company.github.io/terra-shift-scada/`
   - Local: `d:\01 antigraviti varios\nasa\index.html`
   - Incluye: Video oficial embebido, Mapa satelital global NASA GIBS WMTS (`MODIS NDVI`, `SMAP Soil Moisture`, `MODIS LST`, `VIIRS`), consulta REST en vivo a `NASA POWER API` (20 años `2004–2024`), motor agronómico CMIP6 (`2026 / 2035 / 2050`, `SSP2-4.5 / SSP5-8.5`) sobre 10 cultivos, calendario fenológico de 12 meses, simulador ambiental de ahorro de agua/energía VFD (`P ∝ N³`), consola SCADA `4–20 mA NAMUR NE43` + `ESP-NOW` + `Modbus TCP :502`, enlace `WebSerial USB` real, plano mecatrónico SVG interactivo y Tour Guiado por Voz Neural.

2. **Emulador en Vivo del Código ESP32 y Servidor AP de Campo (`192.168.4.1`):**
   - Web: `https://inanna-company.github.io/terra-shift-scada/esp32/index.html`
   - Local: `d:\01 antigraviti varios\nasa\esp32\index.html`
   - Incluye: Emulación en tiempo real del panel embebido del ESP32 (`http://192.168.4.1` — `SSID: INANNA-TERRASHIFT-AP`), osciloscopio `4–20 mA` (`ADS1115` 16-bit + shunt `165 Ω`), malla animada `ESP-NOW AES-128`, traza de ejecución línea por línea de los dos códigos `.ino` en C++, Monitor Serie `115200 baud` en vivo y registros `Modbus TCP :502`. Tiene 4 modos interactivos (`Nominal 11.68 mA`, `Raíz Seca 6.80 mA`, `Cable Cortado 0.00 mA`, `Cortocircuito 21.40 mA`) + botón de Ciclo Automático.

3. **Reproductor Oficial del Video Demo de 29 Segundos (`< 30s` Reglamentario):**
   - Web: `https://inanna-company.github.io/terra-shift-scada/video/index.html`
   - Local: `d:\01 antigraviti varios\nasa\video\index.html`
   - Videos MP4 Full HD (`1920×1080`, `30 fps`, `29.00s` exactos, H.264 + AAC):
     - Inglés: `assets/video/terra_shift_en.mp4` + `subs_en.vtt` + `poster_en.jpg`
     - Español: `assets/video/terra_shift_es.mp4` + `subs_es.vtt` + `poster_es.jpg`
     - Portugués: `assets/video/terra_shift_pt.mp4` + `subs_pt.vtt` + `poster_pt.jpg`

4. **Presentación Ejecutiva Oficial de 7 Diapositivas (`≤ 7 Slides` Reglamentario + Narración por Voz):**
   - Web: `https://inanna-company.github.io/terra-shift-scada/presentation/deck_7_slides.html`
   - Local: `d:\01 antigraviti varios\nasa\presentation\deck_7_slides.html`
   - Incluye narración neural pura en `EN`, `ES` y `PT` (`assets/audio/slide_{en,es,pt}_{0..6}.mp3`) y exportación a PDF A4 apaisado en 7 páginas exactas.

5. **Centro de 4 Manuales Técnicos y Agronómicos:**
   - Web: `https://inanna-company.github.io/terra-shift-scada/manuals/index.html`
   - Local: `d:\01 antigraviti varios\nasa\manuals\index.html` (`manuals-data.js`)

---

## 4. Mapa Completo de Carpetas y Archivos (`d:\01 antigraviti varios\nasa`)

```text
d:\01 antigraviti varios\nasa\
├── INICIAR_SERVIDOR_LOCAL.bat              <-- Doble clic para abrir toda la web en http://localhost:8765
├── FLASHEAR_ESP32_TERRASHIFT.bat           <-- Estación automática para flashear .bin o compilar .ino en ESP32
├── MEMORIA_PROYECTO_NASA_INANNA.md         <-- ESTE ARCHIVO MAESTRO DE RECUPERACIÓN PASO A PASO
├── SUBMISSION_KIT_INANNA.md                <-- Textos listos para el formulario de NASA Space Apps
├── README.md                               <-- Documentación técnica principal del repositorio GitHub
├── index.html                              <-- Consola Principal TERRA-SHIFT SCADA (EN | ES | PT)
├── manifest.json / sw.js                   <-- Soporte Progressive Web App (PWA Offline v6)
├── esp32\
│   └── index.html                          <-- Emulador Interactivo Código C++ ESP32 + AP 192.168.4.1
├── video\
│   └── index.html                          <-- Showcase del Video Oficial de 29.00s (EN | ES | PT)
├── presentation\
│   └── deck_7_slides.html                  <-- Presentación Oficial de 7 Diapositivas con Voz Neural
├── manuals\
│   ├── index.html                          <-- Visor de los 4 Manuales Oficiales (EN | ES | PT)
│   └── manuals-data.js                     <-- Contenido íntegro trilingüe de los 4 manuales
├── firmware\
│   ├── esp32_field_node_espnow_4_20ma\
│   │   └── esp32_field_node_espnow_4_20ma.ino   <-- Código C++ editable Nodo de Campo (4-20mA + ADS1115 + ESP-NOW)
│   ├── esp32_gateway_scada_modbus\
│   │   └── esp32_gateway_scada_modbus.ino       <-- Código C++ editable Gateway (ESP-NOW + AP 192.168.4.1 + Modbus:502)
│   └── bin\
│       ├── node\
│       │   ├── esp32_field_node_espnow_4_20ma.ino.merged.bin      <-- Binario completo listo para flashear en 0x0
│       │   ├── esp32_field_node_espnow_4_20ma.ino.bin             <-- App binaria (0x10000)
│       │   ├── esp32_field_node_espnow_4_20ma.ino.bootloader.bin  <-- Bootloader (0x1000)
│       │   └── esp32_field_node_espnow_4_20ma.ino.partitions.bin  <-- Tabla particiones (0x8000)
│       └── gateway\
│           ├── esp32_gateway_scada_modbus.ino.merged.bin          <-- Binario completo listo para flashear en 0x0
│           ├── esp32_gateway_scada_modbus.ino.bin                 <-- App binaria (0x10000)
│           ├── esp32_gateway_scada_modbus.ino.bootloader.bin      <-- Bootloader (0x1000)
│           └── esp32_gateway_scada_modbus.ino.partitions.bin      <-- Tabla particiones (0x8000)
├── assets\
│   ├── video\
│   │   ├── terra_shift_en.mp4 / subs_en.vtt / poster_en.jpg       <-- Video Oficial 29.00s Inglés
│   │   ├── terra_shift_es.mp4 / subs_es.vtt / poster_es.jpg       <-- Video Oficial 29.00s Español
│   │   └── terra_shift_pt.mp4 / subs_pt.vtt / poster_pt.jpg       <-- Video Oficial 29.00s Portugués
│   ├── audio\
│   │   ├── demo_{en,es,pt}_{0..5}.mp3      <-- 18 Audios Neurales del Tour Guiado
│   │   └── slide_{en,es,pt}_{0..6}.mp3     <-- 21 Audios Neurales de las 7 Diapositivas
│   └── inanna-isotipo.jpg / inanna-logo-horizontal.jpg / inanna-logo-full.jpg
├── css\styles.css                          <-- Hoja de estilos oscura industrial (#080c12 / #00b8e6)
├── js\
│   ├── nasa-api.js                         <-- Cliente REST NASA POWER + GIBS WMTS + Respaldo Offline
│   ├── crop-engine.js                      <-- Motor Agrofisiológico CMIP6 (10 cultivos + fenología)
│   ├── scada-iiot.js                       <-- Motor 4-20mA NAMUR NE43 + ESP-NOW + Modbus + WebSerial
│   ├── inanna-pro-suite.js                 <-- Plano P&ID SVG Trilingüe + Tour por Voz Neural
│   └── app.js                              <-- Orquestador principal y diccionarios puros EN / ES / PT
└── tools\
    ├── build_esp32_nasa_videos.py          <-- Script Python que genera los 3 videos Full HD de 29.00s
    └── build_all_pure_audio.py             <-- Script Python que genera los 39 audios neurales puros
```

---

## 5. Guía Paso a Paso: Cómo Flashear o Editar el ESP32 (`FLASHEAR_ESP32_TERRASHIFT.bat`)

### A. Flasheo Instantáneo en 4 Segundos (Sin abrir Arduino IDE)
1. Conectá tu placa **ESP32** por cable USB a la PC.
2. Hacé doble clic en:
   `d:\01 antigraviti varios\nasa\FLASHEAR_ESP32_TERRASHIFT.bat`
3. El script detecta automáticamente el puerto `COM` (ej. `COM3`, `COM5`) y te muestra el menú:
   - **Opción `[1]`:** Flashea el binario precompilado completo (`merged.bin` en `0x0`) del **Gateway Central SCADA + AP `192.168.4.1` + Modbus TCP `:502`**.
   - **Opción `[2]`:** Flashea el binario precompilado completo (`merged.bin` en `0x0`) del **Nodo Satélite de Campo `4–20 mA` + `ADS1115` + `ESP-NOW`**.
   - **Opción `[5]`:** Lee la dirección MAC de fábrica del ESP32.
   - **Opción `[6]`:** Borra toda la memoria Flash/NVS (`erase_flash`).
   - **Opción `[7]`:** Abre el **Monitor Serie Interactivo a `115200 baudios`** donde podés enviar con el teclado:
     - `N` = Simular humedad óptima (`12.00 mA` / `50%`)
     - `D` = Simular raíz seca (`6.80 mA` / `17.5%`)
     - `C` = Simular **cable cortado** (`0.85 mA` → Disparo inmediato **NAMUR NE43**)
     - `A` = **SCADA Alarm ACK** (Reconocer alarma y liberar enclavamiento)

### B. Cómo Editar el Código `.ino` y Recompilar Automáticamente
- Si querés cambiar pines GPIO, el nombre de la red Wi-Fi (`INANNA-TERRASHIFT-AP`), la resistencia shunt (`165.0 Ω`) o la MAC específica del Gateway:
  1. Abrí y editá cualquiera de los dos archivos `.ino` con Arduino IDE o VS Code:
     - `firmware\esp32_gateway_scada_modbus\esp32_gateway_scada_modbus.ino`
     - `firmware\esp32_field_node_espnow_4_20ma\esp32_field_node_espnow_4_20ma.ino`
     *(Nota: No necesitás instalar librerías externas; el driver I²C diferencial de 16 bits para el `ADS1115` y el servidor `Modbus TCP :502` ya vienen integrados directo en el `.ino` para que compile siempre sin errores en `esp32:esp32 v3.3.10`)*.
  2. Abrí `FLASHEAR_ESP32_TERRASHIFT.bat` y elegí:
     - **Opción `[3]`:** Recompila el `.ino` del **Gateway**, actualiza `firmware\bin\gateway\*.bin` y lo sube al ESP32.
     - **Opción `[4]`:** Recompila el `.ino` del **Nodo de Campo**, actualiza `firmware\bin\node\*.bin` y lo sube al ESP32.

### C. Cómo Conectarse al ESP32 Flasheado
1. **Por Wi-Fi Directo en el Campo (Sin Router):**
   - Buscá en el celular o notebook la red Wi-Fi: **`INANNA-TERRASHIFT-AP`**
   - Contraseña: **`Inanna2026!`**
   - Abrí el navegador en: **`http://192.168.4.1`** (verás el panel SCADA embebido en tiempo real y JSON en `http://192.168.4.1/api/telemetry`).
2. **Por Cable USB directo a la Consola Web TERRA-SHIFT (`WebSerial`):**
   - Con el Gateway enchufado por USB, abrí `https://inanna-company.github.io/terra-shift-scada/` en Chrome o Edge y tocá **`🔌 Link ESP32 USB (WebSerial)`**. ¡La consola web empieza a graficar en vivo las tramas JSON reales del ESP32!
3. **Por PLC / SCADA Industrial (`Modbus TCP`):**
   - Conectate a la IP del ESP32 (`192.168.4.1`, Puerto **`502`**) y leé los Input/Holding Registers `30001–30006` (Función `0x03` o `0x04`).

---

## 6. Cómo Regenerar Videos o Audios si Cambiás un Guion

Herramientas locales detectadas en esta PC:
- **Python 3.12:** `python` (con `edge-tts`, `Pillow`, `mutagen` instalados)
- **FFmpeg:** `C:\Users\maxi\AppData\Local\CapCut\Apps\1.1.0.95\ffmpeg.exe`
- **Arduino CLI:** `C:\Program Files\Arduino IDE\resources\app\lib\backend\resources\arduino-cli.exe`
- **Esptool:** `C:\Users\maxi\AppData\Local\Programs\Python\Python312\Scripts\esptool.exe`

Comandos para regenerar desde PowerShell en `d:\01 antigraviti varios\nasa`:
```powershell
# Regenerar los 3 videos oficiales MP4 (EN, ES, PT) de exactamente 29.00 segundos (1920x1080 30fps):
python tools\build_esp32_nasa_videos.py

# Regenerar los 39 audios neurales puros (EN, ES, PT) de diapositivas y demo guiada:
python tools\build_all_pure_audio.py
```

---

## 7. Cómo Subir Cambios a GitHub Pages (`terra-shift-scada`)

```powershell
cd "d:\01 antigraviti varios\nasa"
git status
git add -A
git commit -m "Update TERRA-SHIFT SCADA"
git push origin main
```
En ~45 segundos los cambios impactan automáticamente en `https://inanna-company.github.io/terra-shift-scada/`.

---

## 8. Acceso y Estado en la Plataforma Oficial NASA Space Apps 2026

- **URL del Equipo y Proyecto:** `https://www.spaceappschallenge.org/2026/find-a-team/inanna-company/?tab=project`
- **Usuario:** `maximr123`
- **Contraseña:** `Alvear456..`
- **Reglas Críticas de Entrega Verificadas:**
  - [x] **Idioma principal de entrega:** Inglés (`EN`) por defecto para pasar de Sede Local (Santa Rosa de Calamuchita) a Evaluación Global, con selector `EN | ES | PT` 100% puro para el jurado local argentino y regional.
  - [x] **Video Demostrativo:** `29.00 segundos` (`≤ 30s` estricto), `1920×1080`, sin logos de la NASA, sin menores de 18 años, público sin clave.
  - [x] **Presentación:** Exactamente `7 diapositivas` (`≤ 7 slides` estricto), pública sin clave.
  - [x] **Código Abierto y No Comercial:** Repositorio público `https://github.com/inanna-company/terra-shift-scada` sin precios ni ofertas comerciales.
  - [x] **Transparencia de IA (SI Disclosure):** Declarada explícitamente en pie de página, README y formulario de Space Apps.
  - [x] **Botón de Envío Final:** Se guarda todo con **`Save Progress`**. **ATENCIÓN CRONOGRAMA OFICIAL SEDE CALAMUCHITA (`https://nasaspaceapp-argentina.com/agenda.html`):** El domingo 15 de noviembre de **15:00 a 15:30 hs** es el *Control Final* y de **15:30 a 17:00 hs** las *Presentaciones Finales ante el Jurado (3 min exposición + 2 min preguntas)*. Por lo tanto, presionar **`Submit for Judging` ANTES de las `14:45 hs` del domingo**.
  - [x] **Guion del Pitch de 3 Minutos + Preguntas del Jurado:** Ver archivo dedicado `d:\01 antigraviti varios\nasa\PITCH_3_MINUTOS_JURADO_INANNA.md`.
  - [x] **Arquitectura Solar + Doble Radio (`ESP-NOW` `<800 m` + `LoRa 915 MHz SX1276/SX1278` `15 km`):** Ya integrada con autodetección SPI (`SCK=18, MISO=19, MOSI=23, NSS=5, RST=14`) y lectura de panel solar (`GPIO 32`) + modo `Deep Sleep (15 µA)` tanto en los dos códigos `.ino` como en los binarios `.merged.bin` precompilados y en la Diapositiva 4 (`EN / ES / PT`).
