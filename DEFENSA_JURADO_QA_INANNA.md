# 🛡️ MANUAL DE DEFENSA ANTE EL JURADO (Q&A 2 MINUTOS + MACHETE TÉCNICO)
**Proyecto:** `TERRA-SHIFT SCADA` — *Field Shift: Adapting Farms with NASA Data*  
**Equipo:** **INANNA COMPANY** (*Fabio Maximiliano Medina Rojas, Agustín Alejandro Debia, Iván David Coria*)  
**Origen:** Río Cuarto, Córdoba • **Sede Oficial:** Santa Rosa de Calamuchita, Córdoba (`15:30 hs` — 3 min Pitch + 2 min Q&A)

---

## ⚡ 1. REGLAS TÁCTICAS DE ORO PARA LOS 2:00 MINUTOS DE PREGUNTAS
1. **Respuestas de 20 segundos (Estructura `Afirmación → Dato duro → Prueba en pantalla`):** No se extiendan 1 minuto en una sola respuesta; si responden en 20 segundos entran 4 o 5 preguntas y el jurado les pone puntaje perfecto en los 5 criterios.
2. **Siempre mostrar en pantalla mientras responden:** Tené abiertas estas **4 pestañas en Español (`ES`)**:
   - Pestaña 1: **Consola SCADA Principal** (`index.html?lang=es`)
   - Pestaña 2: **Emulador ESP32 + Código C++** (`esp32/index.html?lang=es`)
   - Pestaña 3: **Simulador LoRa 30 km + Pantalla OLED 12V Chata** (`lora/index.html?lang=es`)
   - Pestaña 4: **Entrenador y Buscador Q&A** (`pitch/index.html?lang=es`) *(en segunda pantalla o celular tuyo para machete rápido)*
3. **Reparto de Pelotas (Quién contesta qué):**
   - 🔧 **Fabio Maximiliano Medina Rojas (Mecatrónica / Hardware / Firmware):** Lazo `4–20 mA`, `NAMUR NE43`, `ESP32`, `.bin`, `ADS1115`, Válvulas Latch `0.00 mA`, `Modbus TCP / RS485`.
   - 🛰️ **Agustín Alejandro Debia (Ciencia NASA / Clima / Inclusión Social):** `NASA POWER`, `SMAP`, `MODIS NDVI`, `CMIP6`, `Súper El Niño`, `Vórtice Polar Ártico/Austral`, Rotación de Cultivos y **Escalón 1 (Productor con Solo una PC)**.
   - 📡 **Iván David Coria (Operación Rural / LoRa 30 km / Impacto Regional):** Calamuchita sin señal, Posta Repetidora de Cumbre `#5`, Pantalla `OLED 12V` en la chata, Lanza de `CO₂` en silobolsas de Río Cuarto y ahorro de agua/energía.

---

## 🔢 2. MACHETE DE CIFRAS EXACTAS (En la punta de la lengua)

| Tema | Dato Exacto para Decir sin Dudar |
|---|---|
| **APIs y Misiones NASA reales** | `NASA POWER` (20 años T2M, lluvia, radiación y `GWETROOT`), `EOSDIS GIBS` (`MODIS NDVI` 250 m, `LST`, `SMAP L4` 9 km), `NEX-GDDP-CMIP6` (`SSP2-4.5` y `SSP5-8.5`), `Sentinel-6 / SWOT / GPM` (ENSO) y `MERRA-2` (Vórtice Polar) |
| **Lazo Industrial 4–20 mA** | `4.00 mA = 0%` humedad • `12.00 mA = 50%` • `20.00 mA = 100%` (alimentado en `24 V DC`) |
| **Norma Alemana NAMUR NE43** | `< 3.60 mA` = **Cable cortado / sensor sin energía** (enclava bomba en `< 4 ms`) • `> 20.50 mA` = **Cortocircuito** |
| **Ley de Kirchhoff / Conversión ADC** | Resistencia *shunt* de precisión `165.0 Ω` (`0.1%`) → convierte `4–20 mA` en `0.660 V – 3.300 V` leídos por `ADS1115` diferencial de `16 bits` |
| **Electroválvula Biestable (Latch)** | Abre con un pulso de `50 ms` (`9V/12V` vía puente H `DRV8871`), retiene con imán permanente gastando **`0.00 mA`** y cierra con pulso inverso de `50 ms` |
| **Autonomía Solar de los Nodos** | Panel solar `5W` + batería `LiFePO₄ 3.2V` (2.000+ ciclos) + `ESP32 Deep Sleep` de **`15 µA`** (> 15 días de autonomía aún con lluvia continua sin sol) |
| **Comunicaciones sin Señal Celular** | Corto alcance: `ESP-NOW` (`2.4 GHz`, `< 2.4 ms`, cifrado `AES-128`) • Largo alcance: `LoRa 915 MHz` (`SX1276`, `15 km` directo y **`25–30 km`** con Repetidora de Cumbre `#5`) |
| **Integración Industrial PLC/SCADA** | `Modbus TCP` puerto `502` + `Modbus RTU` sobre `RS485 (MAX485)` escalado punto fijo `×100` (`Int16`): Regs `30001–30020` y Bobinas `00001–00004` |
| **Ahorro Hídrico y Energético** | `28% a 42%` menos extracción de acuífero y hasta `35–50%` menos consumo eléctrico en bombeo aplicando leyes de afinidad en variador `VFD` ($P \propto N^3$) |

---

## 🎯 3. LAS 16 PREGUNTAS DEL JURADO (Organizadas por los 5 Criterios Oficiales NASA)

### CRITERIO A — VALIDEZ CIENTÍFICA Y SATELITAL (NASA DATA)

#### P1. *“¿Cómo se conectan realmente los datos de la NASA con el ESP32? ¿No son dos cosas separadas?”*
> **Respuesta Nocaut (20s):**  
> “Están fusionados en lazo cerrado: la API **NASA POWER (`GWETROOT`, `T2M`, `PRECTOTCORR`)** y **MODIS NDVI** definen la línea base hídrica y detectan estrés vegetal desde el espacio; el **ESP32** corrige esa lectura al milímetro en la raíz con lazos `4–20 mA` y `RS485`. Y lo más importante: si un animal corta el cable del sensor en el campo (`< 3.6 mA`), el ESP32 **no riega a ciegas**: bloquea el error y usa automáticamente la humedad radicular satelital **NASA SMAP** guardada en memoria como respaldo de emergencia.”

#### P2. *“Los satélites como NASA POWER (50 km) o SMAP (9 km) tienen píxeles grandes. ¿Sirven para un campo chico o una huerta?”*
> **Respuesta Nocaut (20s):**  
> “Exactamente por esa razón física creamos una arquitectura **híbrida Espacio-Tierra**: ningún sensor enterrado puede predecir cómo va a cambiar el régimen de lluvias y olas de calor de acá a 2035 o 2050 —eso lo dan **20 años de NASA POWER + CMIP6** y **MODIS NDVI a 250 metros**—; mientras que en las hondonadas serranas de Calamuchita, nuestros nodos solares **PT100 `4–20 mA` y `RS485`** resuelven el microclima metro a metro donde el píxel satelital promedia el valle.”

#### P3. *“¿La app consulta datos reales de la NASA en vivo o son números inventados/estáticos?”*
> **Respuesta Nocaut (15s):**  
> “100% reales en vivo: cuando tocás cualquier coordenada del planeta en el mapa, el navegador hace un `fetch` directo al endpoint oficial `power.larc.nasa.gov` trayendo las series reales agroclimáticas y renderiza los mosaicos satelitales reales de `gibs.earthdata.nasa.gov`. Además guarda caché local para seguir funcionando si en el campo se corta internet.”

#### P4. *“¿Qué pasa ante fenómenos climáticos fortuitos extremos como un Súper El Niño o la ruptura del Vórtice Polar?”*
> **Respuesta Nocaut (25s):**  
> “Los promedios `CMIP6` guían qué cultivo rotar a 15 años, pero los *cisnes negros climáticos* destruyen una campaña en horas:  
> 1) Ante el latigazo **La Niña → Súper El Niño** (monitoreado por **NASA Sentinel-6, SWOT y GPM**), pasamos de cuidar el pozo en sequía (**Nodo #4**) a detectar lavado de nutrientes (**Nodo #3 NPK RS485**) y fermentación por humedad en silobolsas (**Nodo #6 CO₂**).  
> 2) Y como operamos en ambos hemisferios, contemplamos tanto rupturas del **Vórtice Polar Ártico** en el Hemisferio Norte (**NASA MERRA-2**) como debilitamientos del **Vórtice Polar Austral/Antártico (Modo Anular del Sur)** que meten heladas tardías primaverales de `-2 °C` en Calamuchita, donde nuestro **Nodo #1 PT100** prende solo el riego anti-helada.”

---

### CRITERIO B — RELEVANCIA AL DESAFÍO (*FIELD SHIFT: ADAPTING FARMS*)

#### P5. *“El desafío Field Shift pide ayudar a decidir rotaciones y cuidar la salud del suelo. ¿Cómo lo resuelven?”*
> **Respuesta Nocaut (20s):**  
> “Lo atacamos de punta a punta: primero, nuestra **Matriz Agronómica** cruza temperatura máxima, días de helada, radiación y déficit hídrico NASA para rankear **10 cultivos** —mostrando por ejemplo cuándo rotar de maíz tardío sufriente a **sorgo granífero, garbanzo, vid u olivo**— con su calendario fenológico de 12 meses. Segundo, en suelo real, el **Nodo Solar #3 RS485** mide **NPK, pH y Conductividad Eléctrica (salinidad)**: si el satélite `MODIS NDVI` ve un manchón amarillo, sabemos al instante si falta nitrógeno o si el agua dura de pozo está salinizando el lote.”

---

### CRITERIO C — INGENIERÍA MECATRÓNICA Y HARDWARE RURAL

#### P6. *“¿Por qué usan lazo de corriente `4–20 mA` y `NAMUR NE43` en vez de los sensores baratos de Arduino de `0 a 5 V`?”*
> **Respuesta Nocaut (20s):**  
> “Dos razones industriales críticas: primero, en tiradas de 100 metros en el campo, un cable de voltaje cae por resistencia y mete ruido electromagnético de bombas y variadores; por **Ley de Kirchhoff**, la corriente de `4–20 mA` es idéntica en todo el cable. Segundo, el **Cero Vivo**: `0%` de humedad son `4.00 mA`, nunca `0 mA`. Si un peludo o una rastra corta el cable, cae a `0.00 mA` (`< 3.6 mA NAMUR NE43`), el ESP32 detecta **cable cortado en 4 ms** y bloquea la bomba en vez de creer que el suelo está seco e inundar todo el lote.”

#### P7. *“Una electroválvula de riego en el medio del campo consume mucha corriente. ¿No les vacía la batería solar en dos horas?”*
> **Respuesta Nocaut (20s):**  
> “Una electroválvula solenoide común de 24V sí te agota cualquier batería solar. Por eso en el **Nodo #2** aplicamos **Electroválvulas Biestables (Latch de 9V/12V DC)** manejadas con un puente H `DRV8871`: abren con un pulso eléctrico de apenas **50 milisegundos** y quedan abiertas horas retenidas por un imán interno consumiendo **`0.00 mA`**. Y si el caudalímetro detecta el doble de caudal porque se rompió la manguera, manda un pulso inverso de 50 ms y cierra sola esa rama.”

#### P8. *“En Santa Rosa de Calamuchita o Traslasierra hay cerros en el medio y cero señal de celular. ¿Cómo llega el dato?”*
> **Respuesta Nocaut (20s):**  
> “No dependemos ni de 4G ni de Starlink ni de routers Wi-Fi. Usamos radio industrial libre **LoRa `915 MHz`**, y para valles encajonados diseñamos la **Posta Repetidora Solar de Cumbre (#5)**: una cajita estanca `IP67` de 300 gramos con panel de 5W arriba de un poste en el filo del cerro que escucha los paquetes del valle oculto y los salta hasta **25–30 km** directo al casco o a la **pantalla OLED 12V enchufada en la chata o el tractor**.”

#### P9. *“¿Tienen código real de microcontrolador o es solamente una maqueta web?”*
> **Respuesta Nocaut (20s):**  
> “Es firmware **C++ industrial 100% real y ya compilado**: en la carpeta `firmware/` del repositorio público están tanto los códigos fuente editables `.ino` para el Gateway SCADA y para los Nodos Solares (`ADS1115`, `NAMUR NE43`, `ESP-NOW`, `LoRa 915 MHz`, `Modbus TCP :502` y `Deep Sleep 15 µA`) como los binarios precompilados `.merged.bin` listos para flashear en 4 segundos en cualquier ESP32 con nuestro instalador automático.”

---

### CRITERIO D — IMPACTO SOCIAL, INCLUSIÓN Y ESCALABILIDAD

#### P10. *“¿Qué pasa con el pequeño productor familiar o quintero que apenas tiene una computadora vieja y cero plata para sensores?”*
> **Respuesta Nocaut (20s):**  
> “Pensamos la plataforma en **3 Escalones Inclusivos**: en el **Escalón 1 (Modo Solo PC, costo cero)** no necesita comprar ni un solo cable. Entra gratis desde cualquier PC o celular —incluso se guarda offline como PWA si se conecta una vez en la escuela rural o el pueblo—, elige su lote, recibe todo el diagnóstico satelital de la NASA, qué cultivos rotar y descarga su **Plan Agronómico en PDF listo para imprimir**.”

#### P11. *“¿Y sirve también para una gran empresa agroindustrial que ya tiene PLCs Siemens o Schneider instalados?”*
> **Respuesta Nocaut (20s):**  
> “Totalmente, ese es nuestro **Escalón 3**: nuestro ESP32 Gateway habla nativamente **Modbus TCP en el puerto `502` y Modbus RTU por `RS485`** con registros enteros `×100` (`30001+` y `40001+`) documentados. Cualquier PLC industrial Siemens, Allen-Bradley o SCADA corporativo lee tanto los sensores solares del campo como la humedad satelital de la NASA sin cambiar su infraestructura actual.”

#### P12. *“¿Por qué incluyeron una lanza para Silobolsas (Nodo #6)?”*
> **Respuesta Nocaut (20s):**  
> “Porque somos de **Río Cuarto**, corazón agrícola del sur de Córdoba, donde millones de toneladas de maíz, soja, sorgo y garbanzo quedan guardadas meses en silobolsas en lotes sin luz ni señal. Si un peludo rompe el plástico y entra humedad de lluvia, el grano respira y libera **dióxido de carbono (`CO₂`) semanas antes de calentarse y pudrirse**. Nuestra lanza solar detecta ese pico temprano de `CO₂` y avisa por LoRa a 14 km salvando toda la cosecha.”

---

### CRITERIO E — VIABILIDAD, REGLAS NASA Y TRANSPARENCIA EN IA (SI)

#### P13. *“¿Qué tan accesible es armar estos equipos en Argentina? ¿Se consiguen los repuestos?”*
> **Respuesta Nocaut (20s):**  
> “100% accesible con electrónica estándar que se compra hoy mismo en Córdoba o Río Cuarto: usamos una **única placa madre universal** basada en `ESP32` estándar, conversor `ADS1115`, módulo `MAX485` y radio `SX1276 915 MHz` con panelcito solar de `5W` y celda `LiFePO₄`. Al ser **Open-Hardware**, hasta una escuela agrotécnica o cooperativa rural puede ensamblar y mantener sus propios nodos en el campo.”

#### P14. *“¿Usaron Inteligencia Artificial para desarrollar el proyecto? ¿Cómo cumplen la regla de Super Intelligence (SI) de NASA 2026?”*
> **Respuesta Nocaut (20s):**  
> “Cumplimos al 100% con total transparencia tanto en el pie de página de la plataforma como en el formulario oficial: toda la **arquitectura mecatrónica rural, el diseño de lazo `4–20 mA NAMUR NE43`, la red `LoRa / ESP-NOW` y el enfoque agronómico regional Córdoba** son autoría original de nuestro equipo técnico; y utilizamos asistencia de IA generativa (Gemini / Antigravity) como acelerador para estructurar interfaz web, documentación técnica y localización pura en inglés, español y portugués, sin usar ningún logo restringido de la NASA.”

#### P15. *“Si ganan en Santa Rosa de Calamuchita, ¿cuál es el próximo paso real de TERRA-SHIFT SCADA?”*
> **Respuesta Nocaut (20s):**  
> “Instalar el primer piloto físico mixto entre **Río Cuarto y el Valle de Calamuchita**: un lote extensivo con monitoreo de rotación y silobolsa en Río Cuarto, y un lote frutihortícola/viñedo serrano con el Nodo Centinela de Heladas `#1` y la Posta Repetidora `#5` en Calamuchita, articulando con productores locales y escuelas técnicas para validar ahorro real de agua en esta misma campaña.”

#### P16. *“En una sola frase: ¿por qué TERRA-SHIFT SCADA merece representar a Santa Rosa de Calamuchita a nivel global?”*
> **Respuesta Nocaut (15s):**  
> “Porque convierte datos espaciales abiertos de la NASA en decisiones reales para todos: gratis en cualquier PC para el pequeño agricultor familiar, e irrompible con seguridad industrial `4–20 mA` y `LoRa Solar 30 km` para el campo profundo sin señal.”
