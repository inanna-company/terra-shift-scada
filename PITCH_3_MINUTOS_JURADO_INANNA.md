# 🎙️ GUION OFICIAL PITCH DE 3 MINUTOS + PREGUNTAS DEL JURADO (15:30 HS)
**Equipo:** `INANNA COMPANY` (Fabio Maximiliano Medina Rojas, Agustín Alejandro Debia, Iván David Coria)  
**Origen:** Río Cuarto, Córdoba • **Sede:** Santa Rosa de Calamuchita (Modalidad Híbrida / Virtual)  
**Desafío:** *Field Shift: Adapting Farms with NASA Data*  
**Formato Oficial del Jurado (Domingo 15/11 — 15:30 a 17:00 hs):** **3 Minutos de Exposición + 2 Minutos de Preguntas**

---

## 🖥️ ¿QUÉ COMPARTIR EN PANTALLA DURANTE LOS 3 MINUTOS?
1. Tener abiertas 3 pestañas listas en Chrome/Edge (en **Español `ES`** para el jurado local de Calamuchita, mostrando que con 1 clic cambia 100% a **Inglés `EN`** para la instancia global de la NASA):
   - **Pestaña 1:** Consola en Vivo (`https://inanna-company.github.io/terra-shift-scada/`)
   - **Pestaña 2:** Emulador del Código ESP32 en Vivo (`https://inanna-company.github.io/terra-shift-scada/esp32/index.html`)
   - **Pestaña 3:** Presentación de 7 Diapositivas (`https://inanna-company.github.io/terra-shift-scada/presentation/deck_7_slides.html`)
2. En cámara: tener sobre la mesa la **protoboard real con el ESP32 + potenciómetro/lazo + LEDs/relé** lista para mostrar en vivo cuando hablen de hardware.

---

## ⏱️ ESTRUCTURA EXACTA DE 3 MINUTOS (1 MINUTO CADA INTEGRANTE)

### 🟢 MINUTO 1 (`0:00 – 1:00`) — EL PROBLEMA REAL Y LOS DATOS DE LA NASA
*(Puede hablar **Agustín** o **Iván** mientras en pantalla se ve el Mapa Satelital de `TERRA-SHIFT SCADA` sobre Río Cuarto y Santa Rosa de Calamuchita)*

> **"¡Buenas tardes al jurado! Somos el equipo INANNA: Fabio Medina Rojas, Agustín Debia e Iván Coria, desde Río Cuarto, el corazón agroindustrial del sur de Córdoba, compitiendo en Santa Rosa de Calamuchita en el desafío *Field Shift*."**
>
> **"Hoy los productores enfrentan dos problemas críticos a la vez: primero, el desplazamiento climático —los datos históricos de NASA POWER muestran picos de más de 40 grados en floración y lluvias cada vez más erráticas que hacen caer el rinde del maíz y la soja en secano—. Y segundo: aunque la NASA tiene datos satelitales increíbles, un píxel de satélite de 9 kilómetros no ve un gotero tapado, y en el medio del campo o entre las sierras de Calamuchita NO hay Wi-Fi ni 4G."**
>
> **"Por eso creamos TERRA-SHIFT SCADA: una plataforma abierta que une la observación satelital de la NASA con mecatrónica rural autónoma sin internet. Haciendo clic en cualquier lote del planeta, consulta 20 años reales de NASA POWER, capas MODIS y humedad radicular SMAP, y proyecta con modelos CMIP6 a 2035 y 2050 qué cultivos pierden aptitud y cuáles ganan resiliencia —como sorgo, garbanzo Kabuli, olivo o vid Malbec de altura—, ahorrando hasta un 38% de agua dulce."**

---

### 🔵 MINUTO 2 (`1:00 – 2:00`) — LA INNOVACIÓN MECATRÓNICA: SOLAR + LORA 15 KM + ESP-NOW + 4–20 mA
*(Habla **Fabio** mostrando en cámara la protoboard con el ESP32 y en pantalla el Emulador C++ `esp32/index.html`)*

> **"Para llevar esa inteligencia de la NASA hasta la raíz en lugares donde no hay absolutamente nada de señal ni red eléctrica, diseñamos una arquitectura mecatrónica abierta basada en ESP32 con alimentación solar fotovoltaica."**
>
> **"Cada nodo de campo funciona con un panel solar compacto y batería LiFePO4 en modo de ultra bajo consumo, y resuelve las comunicaciones en doble capa sin pagar un peso de abono celular: dentro del lote usa protocolo ESP-NOW cifrado en menos de 4 milisegundos, y para cruzar miles de hectáreas o quebradas serranas de hasta 15 kilómetros transmite por radio LoRa de 915 MHz directo al Gateway del casco, que habla Modbus RTU y TCP con cualquier bomba o PLC."**
>
> **"Y acá está nuestro diferencial de seguridad industrial: en vez de sensores analógicos comunes de 0 a 5 Volts, usamos lazo de corriente industrial de 4 a 20 miliamperes bajo norma NAMUR NE43. Si un roedor o una máquina corta el cable en el campo, un sensor común lee cero Volts, cree que el suelo está 0% seco y deja la bomba prendida 48 horas vaciando la perforación. En TERRA-SHIFT —como ven acá en nuestro código y protoboard—, al caer debajo de 3.6 miliamperes el ESP32 detecta cable cortado en menos de 5 milisegundos, bloquea el relé de la bomba y conmuta automáticamente al respaldo satelital GWETROOT de la NASA hasta que se repara el cable."**

---

### 🟣 MINUTO 3 (`2:00 – 3:00`) — IMPACTO ABIERTO, DEMO EN VIVO Y CIERRE
*(Habla **Iván** o **Agustín** mostrando el cambio instantáneo `ES / EN / PT` y el reporte PDF)*

> **"Pensamos TERRA-SHIFT para que cualquier productor, cooperativa o escuela agrotécnica lo pueda usar hoy mismo sin barreras:**
> - **Primero:** Funciona como aplicación web progresiva offline, 100% traducida y narrada en Español, Inglés y Portugués, e imprime en un clic el plan agronómico de transición y calendario de riego de 12 meses en PDF para llevar al lote.
> - **Segundo:** Publicamos todo como código y hardware 100% abierto: los esquemas electrónicos por Ley de Kirchhoff, los 4 manuales técnicos y de mantenimiento, y un instalador automático que flashea los binarios en cualquier ESP32 en 4 segundos."**
>
> **"Desde la llanura pampeana de Río Cuarto hasta los valles de Calamuchita, TERRA-SHIFT convierte décadas de ciencia espacial de la NASA en decisiones concretas de siembra y en cada gota de agua protegida en la raíz. ¡Muchas gracias, quedamos atentos a sus preguntas!"**

---

## 🛡️ MACHETE PARA LOS 2 MINUTOS DE PREGUNTAS DEL JURADO (RESPUESTAS CLAVADAS DE 20 SEGUNDOS)

### 1. *"¿Cómo llega el dato si en el medio de las sierras o en un campo grande no alcanza el Wi-Fi ni el ESP-NOW?"*
> **Respuesta:** *"Excelente pregunta. Por eso implementamos topología híbrida de doble radio sin internet: **ESP-NOW (2.4 GHz)** conecta los sensores cercanos dentro de un mismo cuadro de riego hasta ~500 metros con latencia menor a 4 ms, y el nodo cabecera solar retransmite por **LoRa Sub-GHz en 915 MHz (banda libre ISM Argentina)**, que atraviesa topografía serrana y alcanza entre **5 y 15 kilómetros** directo hasta el Gateway del casco sin depender de 4G, routers ni abonos satelitales."*

### 2. *"¿Cómo se alimentan los sensores y los transmisores de 24V en el medio del lote?"*
> **Respuesta:** *"Con **energía solar autónoma y gestión por pulsos**: un **panel solar monocristalino de 5 a 10 W** carga una celda **LiFePO4** (que soporta más de 2.000 ciclos y altas temperaturas de verano). El ESP32 permanece en **Deep Sleep consumiendo apenas 15 microamperes**, despierta una vez por minuto, habilita el elevador DC-DC de 24V durante 80 milisegundos para leer el lazo 4–20 mA sobre la resistencia shunt de 165 Ohms, transmite el paquete por LoRa/ESP-NOW y vuelve a dormir. Eso le da autonomía continua incluso con más de una semana seguida de días nublados."*

### 3. *"¿Qué datos exactos de la NASA usan y no es solo un mapa decorativo?"*
> **Respuesta:** *"Los datos de la NASA son el corazón matemático en las dos escalas: en **macro-planificación**, consumimos en vivo por API REST 20 años (2004–2024) de **NASA POWER** (`T2M`, picos térmicos `T2M_MAX`, heladas `T2M_MIN`, lluvia `PRECTOTCORR`, radiación solar y humedad radicular `GWETROOT`), capas satelitales **EOSDIS GIBS (MODIS NDVI/LST y SMAP L4)** y proyecciones **NEX-GDDP-CMIP6** para puntuar la aptitud fisiológica de 10 cultivos. Y en **micro-ejecución**, `GWETROOT` actúa como **sensor virtual de respaldo (fail-safe)** cuando el diagnóstico NAMUR NE43 detecta la rotura física de un cable en tierra."*

### 4. *"¿Cuánto cuesta armar un nodo abierto como este frente a un equipo comercial importado?"*
> **Respuesta:** *"Un datalogger agrícola comercial cerrado con telemetría propietaria suele ser inaccesible para pequeños y medianos productores y exige abonos mensuales en dólares. Nuestra arquitectura es **100% Open Hardware** basada en componentes estándar de mercado (**ESP32 + módulo LoRa SX1276 + ADC ADS1115 de 16 bits + shunt 0.1% + panelcito solar**), reduciendo drásticamente la barrera de acceso, sin licencias ni abonos recurrentes, y siendo 100% reparable por cualquier técnico local o escuela técnica."*

### 5. *"¿Cómo validan la recomendación de cambiar de cultivo en Córdoba?"*
> **Respuesta:** *"Nuestro motor agrofisiológico cruza cuatro factores críticos con los datos de la NASA en Río Cuarto y Calamuchita: envolvente térmica media, penalización por golpe de calor en floración (>38–40 °C en enero), piso de heladas y déficit hídrico. Así demuestra numéricamente por qué el maíz temprano en secano sufre estrés creciente bajo escenarios CMIP6 2050, mientras cultivos como **sorgo granífero, garbanzo Kabuli, olivo o vid de altura con goteo controlado** mantienen más de 85% de aptitud reduciendo hasta un 38% el uso de agua."*
