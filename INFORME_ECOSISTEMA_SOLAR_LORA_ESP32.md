# 📡 INFORME TÉCNICO OFICIAL: ECOSISTEMA MODULAR DE 6 DISPOSITIVOS RURALES SOLARES (`LoRa 915 MHz` + `ESP32`) SIN SEÑAL

**Proyecto:** `TERRA-SHIFT SCADA & IIoT` — *2026 NASA Space Apps Challenge ("Field Shift: Adapting Farms with NASA Data")*  
**Equipo Concursante:** `INANNA` — **Fabio Maximiliano Medina Rojas** (*Técnico Superior en Mecatrónica*), **Agustín Alejandro Debia**, **Iván David Coria**  
**Origen del Equipo:** Río Cuarto, Córdoba, Argentina • **Sede Oficial:** Santa Rosa de Calamuchita, Córdoba, Argentina  

---

## Escala Inclusiva en 3 Niveles: Desde una Sola PC Familiar hasta Grandes Empresas Agroindustriales

Para que **TERRA-SHIFT SCADA** beneficie tanto al pequeño granjero familiar que solo tiene una computadora como a grandes complejos agroindustriales, el ecosistema funciona en **3 escalones progresivos y modulares**:

1. **🌱 Nivel 1 — Modo "Solo una PC" (Cero Hardware • Granjeros Familiares, Huertas y Pequeños Productores de 0.5 a 15 ha):**
   - **No requiere comprar ni conectar placas ni sensores.** Con solo una PC básica (o celular) que descarga la aplicación web progresiva (PWA offline), el productor hace clic sobre su chacra en el mapa, obtiene 20 años reales de clima **NASA POWER + humedad SMAP + vigor MODIS**, descubre qué cultivos resilientes plantar hacia 2035–2050, revisa su calendario de 12 meses de heladas/riego e **imprime su Plan Agronómico en PDF** en un clic.
2. **🚜 Nivel 2 — Modo "PC + USB / AP Local Plug & Play" (Productores Medianos, Escuelas Agrotécnicas y Cooperativas de 15 a 200 ha):**
   - Con esa misma PC y nuestro instalador automático de 4 segundos (`FLASHEAR_ESP32_TERRASHIFT.bat`), enchufan un **ESP32 Gateway por cable USB (`WebSerial`)** o Wi-Fi propio (`192.168.4.1`) y van sumando de a uno los módulos solares abiertos según su prioridad (heladas, electroválvulas biestables, aguadas o suelo).
3. **🏭 Nivel 3 — Modo "Gran Empresa Agroindustrial" (Estancias Extensivas, Bodegas y Acopios de 200 a +10.000 ha):**
   - Despliega redes completas de decenas de nodos solares **LoRa 915 MHz (15–30 km)**, repetidores en cumbre y lanzas de silobolsa, integrándose directo por **Modbus TCP (Puerto 502) y RS485 aislado** con los PLCs industriales (Siemens, Schneider, Allen-Bradley), variadores VFD de bombas de alta potencia y sistemas SCADA corporativos existentes.

---

## Arquitectura Base Universal ("Un Solo Cerebro Solar, 6 Dispositivos de Campo")

Todos los dispositivos del ecosistema comparten **una única placa madre universal Open-Hardware** diseñada para operar en lotes extensivos y valles serranos con **cero cobertura 4G/Wi-Fi y cero red eléctrica**:

- **Microcontrolador y Gestión Energética:** `ESP32` en modo *Deep Sleep* (`15 µA` en reposo) + **Panel Solar Fotovoltaico Monocristalino (`5W–10W`)** + Batería **`LiFePO4`** (>2.000 ciclos térmicos) + elevador DC-DC pulsado de `24V DC`.
- **Comunicaciones Rurales de Doble Radio sin Abono:**
  - **Capa Local de Cuadro (`ESP-NOW 2.4 GHz AES-128`):** Latencia `< 4 ms` entre sensores cercanos hasta `~500–800 m`.
  - **Capa Troncal de Larga Distancia (`LoRa Sub-GHz 915 MHz ISM Libre — SX1276 / SX1278`):** Enlace de **`5 a 15 km`** (y hasta **`25–30 km`** con posta repetidora de cumbre) directo al **Gateway Central SCADA (`Modbus RTU RS485` / `Modbus TCP :502`)**.
- **Instrumentación Industrial Segura:** Lazo de corriente **`4–20 mA` bajo norma `NAMUR NE43`** (`< 3.60 mA` detección instantánea de cable cortado) + Bus diferencial **`RS485 Modbus RTU (MAX485)`**.

---

## Catálogo Técnico de los 6 Dispositivos Solares `LoRa + ESP32`

### 1. ❄️ Nodo Solar Centinela de Heladas e Inversión Térmica *(Ideal Calamuchita, Vid, Olivo y Garbanzo)*
- **Qué resuelve:** El satélite de la NASA ve la temperatura macro del valle, pero en las hondonadas serranas se embolsa el aire helado (`-2 °C`) y te quema toda la floración en una sola madrugada.
- **Qué lleva:** `ESP32 Solar + LoRa` + **2 sondas industriales `PT100` (`4–20 mA`)** (una a `40 cm` del suelo y otra a `1.80 m` para detectar inversión térmica) + **anemómetro y pluviómetro de cazoletas** por contacto magnético *Reed Switch* (¡cuenta pulsos despertando al ESP32 sin gastar batería!).
- **Qué hace sin señal:** Cuando detecta caída brusca al punto de rocío, dispara alerta por **LoRa a 15 km** hasta el casco y activa solo el riego anti-helada.

---

### 2. 🚰 Nodo Solar de Electroválvulas *Latch* (Biestables) + Detección de Caño Roto
- **Qué resuelve:** Una electroválvula común consume corriente todo el tiempo y agota cualquier batería solar. En cambio, una **electroválvula *Latch* (biestable de pulso `9V/12V DC`)** abre con un pulso de **`50 milisegundos`** y queda abierta horas con un imán interno consumiendo **`0.00 mA`**, y cierra con otro pulso invertido de `50 ms` (usando un puente H chico tipo `DRV8871`).
- **Plus mecatrónico:** Le sumás un **caudalímetro de pulsos o `4–20 mA`** en la manguera maestra: si la válvula abrió pero no pasa agua (filtro tapado) o si el caudal se dispara al doble (un animal rompió el caño de goteo), **cierra sola esa rama** y avisa por LoRa para no vaciar el tanque.

---

### 3. 🧪 Nodo Solar de Salud de Suelo (`NPK + Salinidad EC + pH`) por `RS485 Modbus`
- **Qué resuelve:** El desafío *Field Shift* pide específicamente **proteger la salud del suelo** en las rotaciones.
- **Qué lleva:** Una sonda agrícola encapsulada `IP68` conectada directo al puerto **`RS485 (MAX485)`** que ya tiene nuestro ESP32 (`Humedad + Temperatura + Conductividad Eléctrica EC + pH + Nitrógeno/Fósforo/Potasio`).
- **Fusión brutal con la NASA:** Cuando el satélite **NASA MODIS NDVI** detecta desde el espacio que un sector del lote se está poniendo amarillo, este nodo te confirma desde abajo si es **estrés hídrico**, **salinización por agua de pozo dura** o **falta de nutrientes**.

---

### 4. 🌊 Monitor Solar de Tanque Australiano, Aguadas y Nivel Dinámico de Pozo (`4–20 mA`)
- **Qué resuelve:** En verano baja la napa o se vacía el tanque australiano a 5 km de la casa; la bomba sumergible chupa aire (cavitación) y se quema, o la hacienda se queda sin bebida en el potrero lejano.
- **Qué lleva:** **Transmisor hidrostático sumergible de acero inoxidable (`4–20 mA`)** tirado al fondo del tanque australiano o dentro del caño camisa de la perforación + `ESP32 Solar + LoRa`.
- **Seguridad industrial:** Bloquea el arranque de la bomba antes de trabajar en seco y, si se corta el cable en el molino/tanque, salta **NAMUR NE43 (`< 3.6 mA`)**.

---

### 5. 🏔️ Posta Repetidora Solar de Cumbre (*Mesh Repeater*) + Monitor Portátil en Tractor/Chata
- **Para zonas quebradas sin línea de vista (Calamuchita / Traslasierra):** Una cajita estanca `IP67` de 300 gramos en lo alto de un poste o loma (`ESP32 + LoRa 915 MHz + Panelcito Solar de 5W`) que no tiene sensores: solo **escucha los paquetes del valle oculto y los salta por arriba del cerro** hasta **`25–30 km`**.
- **Pantalla en la Chata o Tractor:** Un `ESP32 + LoRa + pantallita OLED/E-Ink` enchufado al `12V` de la camioneta o tractor. Cuando el productor recorre el campo sin nada de señal celular, la pantallita va levantando en vivo el estado de cada lote, aguada y válvula a kilómetros a la redonda.

---

### 6. 🌾 Lanza Solar Centinela de Silobolsa (`CO₂` + Humedad Intergranular — ¡100% Río Cuarto!)
- **Qué resuelve:** En todo el sur de Córdoba quedan cosechas enteras de maíz, soja, sorgo y garbanzo guardadas en **silobolsas** en lotes aislados sin luz ni señal. Si entra agua por rotura de un peludo/chancho o sube la humedad, el grano fermenta y **emite `CO₂`** semanas antes de echarse a perder.
- **Qué lleva:** Una lanza con sensor **`CO₂` + temperatura/humedad** + `ESP32 Solar + LoRa 915 MHz`. Si sube el `CO₂` por actividad biológica o detecta desgarro, manda alarma directa al casco de la estancia a 10 km.


---

## Eventos Climáticos Fortuitos y Anomalías Atmosféricas Súbitas (*Cisnes Negros Climáticos*)

Los promedios climáticos históricos y proyecciones multidecadales (**NASA POWER / CMIP6**) guían qué cultivos sembrar a 10–25 años, pero en la campaña real una cosecha puede perderse en **pocas horas** por anomalías atmosféricas abruptas. La fusión entre satélites de la NASA y nuestra red autónoma **Solar + LoRa + ESP32** protege al productor frente a ambos fenómenos:

1. **🌊 Súper El Niño y el “Latigazo Hidroclimático” (`La Niña → Súper El Niño`):**
   - **Monitoreo Orbital NASA:** Vigilado desde el espacio mediante altimetría oceánica **NASA Sentinel-6 Michael Freilich**, **SWOT** y precipitación **GPM IMERG**.
   - **Acción en Campo (Río Cuarto y Calamuchita):** Tras años secos de *La Niña* (donde brillan la rotación a sorgo/garbanzo, las válvulas Latch de consumo `0.00 mA` y la protección de pozo del **Nodo #4**), la transición brusca a un **Súper El Niño** dispara lluvias torrenciales, lavado de nutrientes o cambios de conductividad en suelo (medidos en vivo por el **Nodo #3 RS485 NPK+EC**) e infiltración de humedad en acopios rurales donde la **Lanza Solar de `CO₂` (Nodo #6)** salva silobolsas enteros antes de que el grano fermente.

2. **❄️ Rupturas del Vórtice Polar (Ártico en Hemisferio Norte y Austral/Antártico en el Cono Sur):**
   - **Monitoreo Orbital NASA:** Vigiladas mediante reanálisis estratosférico **NASA MERRA-2 y GEOS**.
   - **Acción en Campo (Doble Hemisferio):** Al operar globalmente en ambos hemisferios, **TERRA-SHIFT SCADA** contempla tanto las rupturas del **Vórtice Polar Ártico** (que desploman la temperatura en cuencas agrícolas de Norteamérica y Eurasia tras calentamientos súbitos estratosféricos) como los debilitamientos del **Vórtice Polar Austral / Antártico (*Modo Anular del Sur — SAM*)**, responsables de inyectar irrupciones polares tardías en plena primavera sobre Córdoba tras días cálidos. Cuando ese aire helado (`-2 °C`) se embolsa en las hondonadas sin señal de Calamuchita, el **Nodo #1 (Doble PT100 + LoRa 15 km)** detecta la inversión térmica a `40 cm` del suelo y enciende autónomamente el riego anti-helada salvando la floración.
