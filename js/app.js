/**
 * TERRA-SHIFT SCADA — Main Interactive Controller (EN | ES | PT)
 * Team INANNA COMPANY — Santa Rosa de Calamuchita, Córdoba, Argentina
 * 2026 NASA Space Apps Challenge ("Field Shift: Adapting Farms with NASA Data")
 */

const I18N = {
  en: {
    ribOrbital: 'ORBITAL TELEMETRY: NASA POWER + EOSDIS GIBS + NEX-GDDP-CMIP6',
    ribConae: 'CONAE SAOCOM L-BAND SAR PARTNER REF',
    ribField: 'FIELD SCADA: ESP-NOW AES-128 (<4 ms) • 4–20 mA NAMUR NE43 • MODBUS TCP:502 / RS485',
    ribEvent: 'ORIGIN: RÍO CUARTO, AR • EVENT: SANTA ROSA DE CALAMUCHITA',
    apiQuerying: 'QUERYING NASA POWER...',
    apiLive: 'LIVE NASA POWER API (200 OK)',
    apiCache: 'CALIBRATED NASA OFFLINE CACHE',
    subtitle: 'Orbital-to-Root Agricultural Adaptation & Rural IIoT SCADA • <strong>Team INANNA</strong>',
    navOrbital: '1. Orbital Telemetry',
    navShift: '2. Crop Shift Matrix',
    navScada: '3. Ground IIoT SCADA',
    navManuals: '📚 Manuals (3)',
    navSlides: '7-Slide Demo Deck ↗',
    btnPrint: 'Export PDF Plan',
    heroBadge: '2026 NASA SPACE APPS CHALLENGE • FIELD SHIFT',
    heroTitle: 'Bridging Planetary NASA Earth Observations with Routerless Rural Automation',
    heroDesc: 'Click any farm coordinate on Earth or select a preset agro-zone. TERRA-SHIFT queries live 20-year NASA POWER & GIBS satellite telemetry, projects 2035–2050 CMIP6 crop suitability shifts, and cross-validates orbital soil moisture against industrial 4–20 mA (NAMUR NE43) ESP-NOW field probes.',
    lblPreset: 'Agro-Ecological Preset',
    optPresetCal: '🏔️ Santa Rosa de Calamuchita, Córdoba (Local Event)',
    optPresetRio: '🌾 Río Cuarto — Pampas Core, Córdoba (Team Origin)',
    optPresetTras: 'Villa Dolores — Traslasierra Semi-Arid (AR)',
    optPresetMen: 'Luján de Cuyo — Andean Oasis, Mendoza (AR)',
    optPresetFre: 'San Joaquin Valley, California (US Benchmark)',
    optPresetCus: '📍 Custom Map GPS Coordinate',
    lblHorizon: 'Projection Horizon',
    optHor2026: '2026 (Current Satellite State)',
    optHor2035: '2035 (Near-Term Adaptation)',
    optHor2050: '2050 (Mid-Century Shift)',
    lblScenario: 'CMIP6 Climate Pathway',
    optSsp245: 'SSP2-4.5 (Moderate Stabilization)',
    optSsp585: 'SSP5-8.5 (High Emissions / Severe Heat)',
    lblMgmt: 'On-Farm Water Strategy',
    optMgmtRain: 'Rainfed (No Supplemental Irrigation)',
    optMgmtRegen: 'Regenerative Cover Crops (+Infiltration)',
    optMgmtDrip: 'Precision Drip + INANNA 4–20 mA IIoT',
    kpiTemp: 'Mean Temp (Projected)',
    kpiHeat: 'Extreme Canopy Peak',
    kpiPrec: 'Annual Precipitation',
    kpiGwet: 'NASA Root-Zone Wetness',
    kpiTopCrop: 'Top Resilient Crop',
    kpiWaterSave: 'IIoT Drip Demand',
    minFrost: 'Min Frost',
    vs2005: 'vs 2005',
    decUnit: '°C/dec',
    mmYr: 'mm/yr',
    suitabilityLbl: 'Suitability',
    shiftWord: 'shift',
    rainfedZero: '0 (Rainfed)',
    dripHintClosed: 'Closed-loop 4–20 mA + SMAP',
    dripHintSwitch: 'Switch to Precision Drip to boost yield',
    mapTitle: 'Live NASA GIBS Orbital Imagery & GPS Inspector (Click Any Farm)',
    mapSub: 'Real-time WMTS tiles from NASA EOSDIS + Live REST telemetry from power.larc.nasa.gov',
    layerNdvi: 'MODIS NDVI',
    layerSmap: 'SMAP Soil Moisture',
    layerLst: 'MODIS Surface Temp',
    layerViirs: 'VIIRS True Color',
    layerNone: 'Base Dark',
    chartClimateTitle: '20-Year NASA POWER Historical Record & CMIP6 Trajectory',
    chartShiftTitle: 'Crop Suitability Shift: 2005 Historical vs. Target Horizon (%)',
    chartTempLegend: 'Mean Temp T2M (°C)',
    chartPrecLegend: 'Precipitation (mm/yr)',
    chartHistLegend: '2005 Historical Rainfed',
    matrixTitle: 'Agronomic Crop Suitability & Transition Roadmap',
    matrixSub: 'Ranked dynamically from NASA thermal, frost, radiation, and root-zone moisture envelopes',
    matrixBadge: '10 REGIONAL & ALTERNATIVE CROPS MODELED',
    badgeViable: 'VIABLE / RECOMMENDED',
    badgeAdapt: 'ADAPTATION REQUIRED',
    badgeRisk: 'HIGH CLIMATE RISK',
    waterReq: 'Water req',
    base2005: '2005 Base',
    projShort: 'Proj',
    cardShift: 'Shift',
    cardIrrig: 'Irrig',
    cardGross: 'Heat Limit',
    scadaTitle: 'INANNA Industrial Ground-Truth & Irrigation SCADA (Offline-First Rural Architecture)',
    scadaSub: '4–20 mA Current Loop (NAMUR NE43) + AES-128 ESP-NOW Rural Mesh + Modbus RTU/TCP Gateway',
    btnWebSerial: '🔌 Link ESP32 USB (WebSerial)',
    btnAlarmAck: '✓ SCADA Alarm ACK',
    btnResetHorometer: '⟲ Service Reset NVS',
    scadaWhyTitle: 'Why Ground-Truth Hardware Matters:',
    scadaWhyDesc: 'Satellite pixels (9 km SMAP) cannot see a clogged drip line or a rodent-chewed sensor cable. INANNA fuses NASA orbital wetness with 24V DC 4–20 mA probes over routerless ESP-NOW.',
    lblHorometer: 'NVS Horometer:',
    lblCycles: 'Cycles:',
    relayTripped: 'INTERLOCK TRIPPED (SAFE STOP)',
    relayPumpOn: 'VFD PUMP RUNNING',
    relayStandby: 'ARMED / STANDBY',
    loopSimTitle: 'Interactive 4–20 mA Current Loop & NAMUR NE43 Live-Zero Tester (NODE-01)',
    btnSimCut: '⚡ Simulate Cut Wire (1.20 mA)',
    btnSimDry: '🌵 Dry Root Zone (6.80 mA = 17.5%)',
    btnSimOpt: '💧 Optimal 50% (12.00 mA)',
    btnSimShort: '🔥 Loop Short-Circuit (21.20 mA)',
    namurFaultZone: '<3.6 mA WIRE FAULT',
    namurLinearZone: '4.0 mA (0%) ──── LINEAR MEASUREMENT ──── 20.0 mA (100%)',
    namurShortZone: '>20.5 mA SHORT',
    lblElecMa: 'Loop Current',
    lblElecShunt: 'Shunt V (165Ω 0.1%)',
    lblElecAdc: 'ADS1115 (16-bit)',
    lblElecMoist: 'Calibrated Moisture',
    espNowTitle: 'ESP-NOW P2P Field Satellite Nodes (No Router / No Cellular Needed)',
    modbusTitle: 'Live Modbus TCP (Port 502) & RS485 RTU Register Map (Fixed-Point ×100)',
    modbusBadge: 'PLC / SCADA READY',
    thReg: 'Register',
    thType: 'Type',
    thTag: 'Tag Name',
    thRaw: 'Raw Int16',
    thEng: 'Engineering Value',
    historianTitle: 'Timestamped SCADA Alarm & Event Historian',
    footTeamTitle: 'Team INANNA (Río Cuarto, Córdoba) — 2026 NASA Space Apps Challenge',
    footEvent: '<strong>Team Origin:</strong> Río Cuarto, Córdoba, AR • <strong>Local Event:</strong> Santa Rosa de Calamuchita, AR',
    footChallenge: '<strong>Challenge:</strong> Field Shift: Adapting Farms with NASA Data',
    footRoster: '<strong>Contestant Team:</strong> Fabio Maximiliano Medina Rojas (Team Lead — Higher Technician in Mechatronics), Agustín Alejandro Debia, Iván David Coria.',
    footDataTitle: 'Official NASA & Space Agency Partner Data',
    footDataList: `
      <li>• <strong>NASA POWER API:</strong> Multi-decade Agroclimatology (T2M, PRECTOTCORR, GWETROOT, Solar)</li>
      <li>• <strong>NASA EOSDIS GIBS:</strong> MODIS NDVI, MODIS LST, SMAP L4 Soil Moisture, VIIRS</li>
      <li>• <strong>NASA NEX-GDDP-CMIP6:</strong> SSP2-4.5 &amp; SSP5-8.5 Climate Projections</li>
      <li>• <strong>NASA Harvest &amp; ECOSTRESS:</strong> Crop Water Use Efficiency Frameworks</li>
      <li>• <strong>CONAE (Argentina):</strong> SAOCOM 1A/1B L-Band SAR Regional Reference</li>
    `,
    footSiTitle: 'Transparency & Use of AI / Super Intelligence (SI) Disclosure',
    footSiDesc: '<strong>AI-Assisted Development Notice (Per 2026 NASA Space Apps Rules):</strong> Core system architecture, agronomic-mechatronic fusion concept, 4–20 mA NAMUR NE43 industrial design, and ESP-NOW/Modbus engineering were conceived by Team INANNA COMPANY. Generative AI coding/structuring assistance (Google Gemini / Antigravity) was used to accelerate UI scaffolding, multilingual translation, and code documentation. No NASA logos, insignias, or restricted mission identifiers are used or modified.'
  },

  es: {
    ribOrbital: 'TELEMETRÍA ORBITAL: NASA POWER + EOSDIS GIBS + NEX-GDDP-CMIP6',
    ribConae: 'REF. SOCIO ESPACIAL: CONAE SAOCOM BANDA-L SAR',
    ribField: 'SCADA DE CAMPO: ESP-NOW AES-128 (<4 ms) • 4–20 mA NAMUR NE43 • MODBUS TCP:502 / RS485',
    ribEvent: 'ORIGEN: RÍO CUARTO, AR • SEDE: SANTA ROSA DE CALAMUCHITA',
    apiQuerying: 'CONSULTANDO NASA POWER...',
    apiLive: 'API NASA POWER EN VIVO (200 OK)',
    apiCache: 'CACHÉ OFFLINE NASA CALIBRADO',
    subtitle: 'Adaptación Climática Agrícola Orbital-a-Raíz y SCADA Rural IIoT • <strong>Equipo INANNA</strong>',
    navOrbital: '1. Telemetría Orbital',
    navShift: '2. Matriz de Cultivos',
    navScada: '3. SCADA Rural IIoT',
    navManuals: '📚 Manuales (3)',
    navSlides: 'Presentación 7 Slides ↗',
    btnPrint: 'Exportar Plan PDF',
    heroBadge: 'NASA SPACE APPS CHALLENGE 2026 • DESAFÍO FIELD SHIFT',
    heroTitle: 'Uniendo Observación Terrestre de la NASA con Automatización Rural sin Internet',
    heroDesc: 'Hacé clic en cualquier lote agrícola del planeta o elegí una zona precargada. TERRA-SHIFT consulta 20 años reales de NASA POWER e imágenes satelitales GIBS, proyecta la aptitud de cultivos al 2035–2050 (CMIP6) y valida la humedad orbital contra sondas industriales 4–20 mA (NAMUR NE43) por red ESP-NOW.',
    lblPreset: 'Zona Agroecológica Precargada',
    optPresetCal: '🏔️ Santa Rosa de Calamuchita, Córdoba (Sede Oficial)',
    optPresetRio: '🌾 Río Cuarto — Zona Núcleo Agrícola, Córdoba (Origen del Equipo)',
    optPresetTras: 'Villa Dolores — Valle Semiárido Traslasierra (AR)',
    optPresetMen: 'Luján de Cuyo — Oasis Andino Irrigado, Mendoza (AR)',
    optPresetFre: 'Valle de San Joaquín, California (Ref. Global)',
    optPresetCus: '📍 Coordenada GPS Personalizada en Mapa',
    lblHorizon: 'Horizonte de Proyección',
    optHor2026: '2026 (Estado Satelital Actual)',
    optHor2035: '2035 (Adaptación Cercana)',
    optHor2050: '2050 (Transición Media Centuria)',
    lblScenario: 'Trayectoria Climática CMIP6',
    optSsp245: 'SSP2-4.5 (Estabilización Moderada)',
    optSsp585: 'SSP5-8.5 (Altas Emisiones / Calor Severo)',
    lblMgmt: 'Estrategia Hídrica en Lote',
    optMgmtRain: 'Secano (Sin Riego Suplementario)',
    optMgmtRegen: 'Cultivos de Cobertura Regenerativos (+Infiltración)',
    optMgmtDrip: 'Goteo de Precisión + IIoT INANNA 4–20 mA',
    kpiTemp: 'Temp. Media (Proyectada)',
    kpiHeat: 'Pico Térmico Extremo',
    kpiPrec: 'Precipitación Anual',
    kpiGwet: 'Humedad Radicular NASA',
    kpiTopCrop: 'Cultivo Resiliente Líder',
    kpiWaterSave: 'Demanda Riego IIoT',
    minFrost: 'Mín. Helada',
    vs2005: 'vs 2005',
    decUnit: '°C/déc',
    mmYr: 'mm/año',
    suitabilityLbl: 'Aptitud',
    shiftWord: 'cambio',
    rainfedZero: '0 (Secano)',
    dripHintClosed: 'Lazo cerrado 4–20 mA + SMAP',
    dripHintSwitch: 'Activá Goteo IIoT para elevar rinde',
    mapTitle: 'Imágenes Orbitales NASA GIBS en Vivo e Inspector GPS (Clic en cualquier campo)',
    mapSub: 'Mosaicos WMTS en tiempo real de NASA EOSDIS + Telemetría REST en vivo desde power.larc.nasa.gov',
    layerNdvi: 'MODIS NDVI (Vigor)',
    layerSmap: 'SMAP Humedad Suelo',
    layerLst: 'MODIS Temp. Superficie',
    layerViirs: 'VIIRS Color Real',
    layerNone: 'Mapa Base Oscuro',
    chartClimateTitle: 'Registro Histórico Real NASA POWER (20 años) y Trayectoria CMIP6',
    chartShiftTitle: 'Cambio de Aptitud Agrícola: Base Histórica 2005 vs. Horizonte (%)',
    chartTempLegend: 'Temp. Media T2M (°C)',
    chartPrecLegend: 'Precipitación (mm/año)',
    chartHistLegend: 'Base 2005 Secano',
    matrixTitle: 'Matriz de Aptitud Agronómica y Hoja de Ruta de Transición',
    matrixSub: 'Ordenado dinámicamente según envolventes térmicas, heladas, radiación y humedad radicular NASA',
    matrixBadge: '10 CULTIVOS REGIONALES Y ALTERNATIVOS MODELADOS',
    badgeViable: 'VIABLE / RECOMENDADO',
    badgeAdapt: 'REQUIERE ADAPTACIÓN',
    badgeRisk: 'ALTO RIESGO CLIMÁTICO',
    waterReq: 'Req. hídrico',
    base2005: 'Base 2005',
    projShort: 'Proy',
    cardShift: 'Cambio',
    cardIrrig: 'Riego',
    cardGross: 'Tope Calor',
    scadaTitle: 'Consola Industrial SCADA de Campo e Irrigación INANNA (Arquitectura Rural Offline)',
    scadaSub: 'Lazo de Corriente 4–20 mA (NAMUR NE43) + Malla Rural ESP-NOW AES-128 + Gateway Modbus RTU/TCP',
    btnWebSerial: '🔌 Vincular ESP32 USB (WebSerial)',
    btnAlarmAck: '✓ Reconocer Alarma (ACK)',
    btnResetHorometer: '⟲ Reset Servicio NVS',
    scadaWhyTitle: 'Por qué importa el Hardware en Tierra:',
    scadaWhyDesc: 'Un píxel satelital (9 km SMAP) no detecta una manguera de goteo tapada ni un cable mordido por roedores. INANNA fusiona la humedad orbital NASA con sondas industriales 24V DC 4–20 mA por ESP-NOW sin router.',
    lblHorometer: 'Horómetro NVS:',
    lblCycles: 'Ciclos:',
    relayTripped: 'RELÉ ENCLAVADO (PARADA SEGURA)',
    relayPumpOn: 'BOMBA VFD EN MARCHA',
    relayStandby: 'ARMADO / EN ESPERA',
    loopSimTitle: 'Probador Interactivo Lazo 4–20 mA y Cero Vivo NAMUR NE43 (NODE-01)',
    btnSimCut: '⚡ Simular Cable Cortado (1.20 mA)',
    btnSimDry: '🌵 Suelo Seco (6.80 mA = 17.5%)',
    btnSimOpt: '💧 Óptimo 50% (12.00 mA)',
    btnSimShort: '🔥 Cortocircuito en Lazo (21.20 mA)',
    namurFaultZone: '<3.6 mA FALLA CABLE',
    namurLinearZone: '4.0 mA (0%) ──── MEDICIÓN LINEAL ──── 20.0 mA (100%)',
    namurShortZone: '>20.5 mA CORTO',
    lblElecMa: 'Corriente de Lazo',
    lblElecShunt: 'Tensión Shunt (165Ω)',
    lblElecAdc: 'ADS1115 (16 bits)',
    lblElecMoist: 'Humedad Calibrada',
    espNowTitle: 'Nodos Satélite de Campo ESP-NOW P2P (Sin Router Wi-Fi ni Señal Celular)',
    modbusTitle: 'Mapa de Registros Modbus TCP (Puerto 502) y RS485 RTU en Vivo (Punto Fijo ×100)',
    modbusBadge: 'LISTO PARA PLC / SCADA',
    thReg: 'Registro',
    thType: 'Tipo',
    thTag: 'Variable / Tag',
    thRaw: 'Entero Int16',
    thEng: 'Valor de Ingeniería',
    historianTitle: 'Historiador de Eventos y Alarmas SCADA con Estampa de Tiempo',
    footTeamTitle: 'Equipo INANNA (Río Cuarto, Córdoba) — NASA Space Apps Challenge 2026',
    footEvent: '<strong>Ciudad de Origen:</strong> Río Cuarto, Córdoba • <strong>Sede Oficial:</strong> Santa Rosa de Calamuchita, AR',
    footChallenge: '<strong>Desafío:</strong> Field Shift: Adapting Farms with NASA Data',
    footRoster: '<strong>Equipo Concursante:</strong> Fabio Maximiliano Medina Rojas (Líder Técnico — Técnico Superior en Mecatrónica), Agustín Alejandro Debia, Iván David Coria.',
    footDataTitle: 'Datos Oficiales de la NASA y Agencias Espaciales Socias',
    footDataList: `
      <li>• <strong>NASA POWER API:</strong> Agroclimatología multidecadal (T2M, PRECTOTCORR, GWETROOT, Radiación Solar)</li>
      <li>• <strong>NASA EOSDIS GIBS:</strong> Capas MODIS NDVI, MODIS Temp. Superficial, SMAP L4 Humedad, VIIRS</li>
      <li>• <strong>NASA NEX-GDDP-CMIP6:</strong> Proyecciones climáticas regionalizadas SSP2-4.5 y SSP5-8.5</li>
      <li>• <strong>NASA Harvest y ECOSTRESS:</strong> Marcos de eficiencia hídrica agrícola</li>
      <li>• <strong>CONAE (Argentina):</strong> Referencia regional radar Banda-L SAOCOM 1A/1B</li>
    `,
    footSiTitle: 'Transparencia y Declaración de Uso de IA / Super Intelligence (SI)',
    footSiDesc: '<strong>Aviso de Desarrollo Asistido por IA (Reglamento NASA Space Apps 2026):</strong> La arquitectura central, fusión agronómica-mecatrónica, diseño industrial 4–20 mA NAMUR NE43 e ingeniería ESP-NOW/Modbus fueron concebidos originalmente por Team INANNA COMPANY. Se utilizó asistencia de IA generativa (Google Gemini / Antigravity) para acelerar maquetado UI, traducción multilingüe y documentación. No se utilizan ni modifican logotipos ni insignias restringidas de la NASA.'
  },

  pt: {
    ribOrbital: 'TELEMETRIA ORBITAL: NASA POWER + EOSDIS GIBS + NEX-GDDP-CMIP6',
    ribConae: 'REF. PARCEIRO ESPACIAL: CONAE SAOCOM BANDA-L SAR',
    ribField: 'SCADA DE CAMPO: ESP-NOW AES-128 (<4 ms) • 4–20 mA NAMUR NE43 • MODBUS TCP:502 / RS485',
    ribEvent: 'ORIGEM: RÍO CUARTO, AR • EVENTO: SANTA ROSA DE CALAMUCHITA',
    apiQuerying: 'CONSULTANDO NASA POWER...',
    apiLive: 'API NASA POWER AO VIVO (200 OK)',
    apiCache: 'CACHE OFFLINE NASA CALIBRADO',
    subtitle: 'Adaptação Climática Agrícola Orbital-à-Raiz e SCADA Rural IIoT • <strong>Equipe INANNA</strong>',
    navOrbital: '1. Telemetria Orbital',
    navShift: '2. Matriz de Culturas',
    navScada: '3. SCADA Rural IIoT',
    navManuals: '📚 Manuais (3)',
    navSlides: 'Apresentação 7 Slides ↗',
    btnPrint: 'Exportar Plano PDF',
    heroBadge: 'NASA SPACE APPS CHALLENGE 2026 • DESAFIO FIELD SHIFT',
    heroTitle: 'Unindo Observações Terrestres da NASA com Automação Rural sem Internet',
    heroDesc: 'Clique em qualquer coordenada agrícola na Terra ou selecione uma zona predefinida. O TERRA-SHIFT consulta 20 anos reais de telemetria satelital NASA POWER e GIBS, projeta mudanças de aptidão agrícola para 2035–2050 (CMIP6) e valida a umidade orbital com sondas industriais 4–20 mA (NAMUR NE43) via rede ESP-NOW.',
    lblPreset: 'Zona Agroecológica Predefinida',
    optPresetCal: '🏔️ Santa Rosa de Calamuchita, Córdoba (Sede Oficial)',
    optPresetRio: '🌾 Río Cuarto — Núcleo Agrícola Pampas, Córdoba (Origem da Equipe)',
    optPresetTras: 'Villa Dolores — Vale Semiárido Traslasierra (AR)',
    optPresetMen: 'Luján de Cuyo — Oásis Andino Irrigado, Mendoza (AR)',
    optPresetFre: 'Vale de San Joaquin, Califórnia (Ref. Global)',
    optPresetCus: '📍 Coordenada GPS Personalizada no Mapa',
    lblHorizon: 'Horizonte de Projeção',
    optHor2026: '2026 (Estado Satelital Atual)',
    optHor2035: '2035 (Adaptação de Curto Prazo)',
    optHor2050: '2050 (Transição de Meio Século)',
    lblScenario: 'Cenário Climático CMIP6',
    optSsp245: 'SSP2-4.5 (Estabilização Moderada)',
    optSsp585: 'SSP5-8.5 (Altas Emissões / Calor Extremo)',
    lblMgmt: 'Estratégia Hídrica na Fazenda',
    optMgmtRain: 'Sequeiro (Sem Irrigação Suplementar)',
    optMgmtRegen: 'Plantas de Cobertura Regenerativas (+Infiltração)',
    optMgmtDrip: 'Gotejamento de Precisão + IIoT INANNA 4–20 mA',
    kpiTemp: 'Temp. Média (Projetada)',
    kpiHeat: 'Pico Térmico Extremo',
    kpiPrec: 'Precipitação Anual',
    kpiGwet: 'Umidade Radicular NASA',
    kpiTopCrop: 'Cultura Resiliente Líder',
    kpiWaterSave: 'Demanda Gotejo IIoT',
    minFrost: 'Mín. Geada',
    vs2005: 'vs 2005',
    decUnit: '°C/déc',
    mmYr: 'mm/ano',
    suitabilityLbl: 'Aptidão',
    shiftWord: 'mudança',
    rainfedZero: '0 (Sequeiro)',
    dripHintClosed: 'Malha fechada 4–20 mA + SMAP',
    dripHintSwitch: 'Ative Gotejamento IIoT para elevar produtividade',
    mapTitle: 'Imagens Orbitais NASA GIBS ao Vivo e Inspetor GPS (Clique em qualquer fazenda)',
    mapSub: 'Mosaicos WMTS em tempo real da NASA EOSDIS + Telemetria REST ao vivo de power.larc.nasa.gov',
    layerNdvi: 'MODIS NDVI (Vigor)',
    layerSmap: 'SMAP Umidade do Solo',
    layerLst: 'MODIS Temp. Superfície',
    layerViirs: 'VIIRS Cor Verdadeira',
    layerNone: 'Mapa Base Escuro',
    chartClimateTitle: 'Série Histórica Real NASA POWER (20 anos) e Trajetória CMIP6',
    chartShiftTitle: 'Mudança de Aptidão Agrícola: Base 2005 vs. Horizonte Alvo (%)',
    chartTempLegend: 'Temp. Média T2M (°C)',
    chartPrecLegend: 'Precipitação (mm/ano)',
    chartHistLegend: 'Base 2005 Sequeiro',
    matrixTitle: 'Matriz de Aptidão Agronômica e Roteiro de Transição',
    matrixSub: 'Classificado dinamicamente por envelopes térmicos, geadas, radiação e umidade radicular da NASA',
    matrixBadge: '10 CULTURAS REGIONAIS E ALTERNATIVAS MODELADAS',
    badgeViable: 'VIÁVEL / RECOMENDADA',
    badgeAdapt: 'REQUER ADAPTAÇÃO',
    badgeRisk: 'ALTO RISCO CLIMÁTICO',
    waterReq: 'Req. hídrico',
    base2005: 'Base 2005',
    projShort: 'Proj',
    cardShift: 'Variação',
    cardIrrig: 'Irrig',
    cardGross: 'Limite Calor',
    scadaTitle: 'Console Industrial SCADA de Campo e Irrigação INANNA (Arquitetura Rural Offline)',
    scadaSub: 'Laço de Corrente 4–20 mA (NAMUR NE43) + Rede Rural ESP-NOW AES-128 + Gateway Modbus RTU/TCP',
    btnWebSerial: '🔌 Conectar ESP32 USB (WebSerial)',
    btnAlarmAck: '✓ Confirmar Alarme (ACK)',
    btnResetHorometer: '⟲ Reset Manutenção NVS',
    scadaWhyTitle: 'Por que o Hardware de Campo é Essencial:',
    scadaWhyDesc: 'Um pixel de satélite (9 km SMAP) não enxerga um tubo de gotejamento entupido nem um cabo roído no campo. A INANNA funde a umidade orbital da NASA com sondas industriais 24V DC 4–20 mA via ESP-NOW sem roteador.',
    lblHorometer: 'Horímetro NVS:',
    lblCycles: 'Ciclos:',
    relayTripped: 'RELÉ TRAVADO (PARADA SEGURA)',
    relayPumpOn: 'BOMBA VFD EM OPERAÇÃO',
    relayStandby: 'ARMADO / EM ESPERA',
    loopSimTitle: 'Simulador Interativo Laço 4–20 mA e Zero Vivo NAMUR NE43 (NODE-01)',
    btnSimCut: '⚡ Simular Cabo Rompido (1.20 mA)',
    btnSimDry: '🌵 Solo Seco (6.80 mA = 17.5%)',
    btnSimOpt: '💧 Ideal 50% (12.00 mA)',
    btnSimShort: '🔥 Curto-Circuito no Laço (21.20 mA)',
    namurFaultZone: '<3.6 mA FALHA CABO',
    namurLinearZone: '4.0 mA (0%) ──── MEDIÇÃO LINEAR ──── 20.0 mA (100%)',
    namurShortZone: '>20.5 mA CURTO',
    lblElecMa: 'Corrente do Laço',
    lblElecShunt: 'Tensão Shunt (165Ω)',
    lblElecAdc: 'ADS1115 (16 bits)',
    lblElecMoist: 'Umidade Calibrada',
    espNowTitle: 'Nós Satélite de Campo ESP-NOW P2P (Sem Roteador Wi-Fi / Sem Sinal Celular)',
    modbusTitle: 'Mapa de Registradores Modbus TCP (Porta 502) e RS485 RTU ao Vivo (Ponto Fixo ×100)',
    modbusBadge: 'PRONTO PARA CLP / SCADA',
    thReg: 'Registrador',
    thType: 'Tipo',
    thTag: 'Variável / Tag',
    thRaw: 'Inteiro Int16',
    thEng: 'Valor de Engenharia',
    historianTitle: 'Historiador de Eventos e Alarmes SCADA com Carimbo de Tempo',
    footTeamTitle: 'Equipe INANNA (Río Cuarto, Córdoba) — NASA Space Apps Challenge 2026',
    footEvent: '<strong>Cidade de Origem:</strong> Río Cuarto, Córdoba • <strong>Evento Local:</strong> Santa Rosa de Calamuchita, AR',
    footChallenge: '<strong>Desafio:</strong> Field Shift: Adapting Farms with NASA Data',
    footRoster: '<strong>Equipe Concursante:</strong> Fabio Maximiliano Medina Rojas (Líder Técnico — Técnico Superior em Mecatrônica), Agustín Alejandro Debia, Iván David Coria.',
    footDataTitle: 'Dados Oficiais da NASA e Agências Espaciais Parceiras',
    footDataList: `
      <li>• <strong>NASA POWER API:</strong> Agroclimatologia multidecadal (T2M, PRECTOTCORR, GWETROOT, Radiação Solar)</li>
      <li>• <strong>NASA EOSDIS GIBS:</strong> Camadas MODIS NDVI, MODIS Temp. Superfície, SMAP L4 Umidade, VIIRS</li>
      <li>• <strong>NASA NEX-GDDP-CMIP6:</strong> Projeções climáticas regionalizadas SSP2-4.5 e SSP5-8.5</li>
      <li>• <strong>NASA Harvest e ECOSTRESS:</strong> Modelos de eficiência hídrica agrícola</li>
      <li>• <strong>CONAE (Argentina):</strong> Referência regional radar Banda-L SAOCOM 1A/1B</li>
    `,
    footSiTitle: 'Transparência e Declaração de Uso de IA / Super Intelligence (SI)',
    footSiDesc: '<strong>Aviso de Desenvolvimento Assistido por IA (Regras NASA Space Apps 2026):</strong> A arquitetura central, fusão agronômica-mecatrônica, projeto industrial 4–20 mA NAMUR NE43 e engenharia ESP-NOW/Modbus foram concebidos originalmente pela Equipe INANNA COMPANY. Assistência de IA generativa (Google Gemini / Antigravity) foi utilizada para acelerar a interface, tradução multilíngue e documentação. Nenhum logotipo ou insígnia restrita da NASA foi utilizado ou modificado.'
  }
};

function detectInitialLang() {
  const params = new URLSearchParams(window.location.search);
  const urlLang = (params.get('lang') || '').toLowerCase();
  if (['en', 'es', 'pt'].includes(urlLang)) return urlLang;
  const saved = localStorage.getItem('inanna_lang');
  if (['en', 'es', 'pt'].includes(saved)) return saved;
  return 'en';
}

const APP_STATE = {
  lang: detectInitialLang(),
  preset: 'riocuarto',
  lat: -33.123,
  lon: -64.349,
  horizon: 2050,
  scenario: 'ssp245',
  management: 'drip_iiot',
  nasaData: null,
  activeGibsLayer: 'ndvi'
};
window.APP_STATE = APP_STATE;

let mapInstance = null;
let mapMarker = null;
let gibsTileLayer = null;
let climateChart = null;
let shiftChart = null;

const GIBS_LAYERS = {
  ndvi: {
    url: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_NDVI_8Day/default/default/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png',
    maxNativeZoom: 9,
    opacity: 0.72,
    attr: 'NASA EOSDIS GIBS • MODIS Terra NDVI 8-Day'
  },
  smap: {
    url: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/SMAP_L4_Analyzed_Root_Zone_Soil_Moisture/default/default/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png',
    maxNativeZoom: 6,
    opacity: 0.68,
    attr: 'NASA EOSDIS GIBS • SMAP L4 Root-Zone Soil Moisture'
  },
  lst: {
    url: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_Land_Surface_Temp_Day/default/default/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png',
    maxNativeZoom: 7,
    opacity: 0.68,
    attr: 'NASA EOSDIS GIBS • MODIS Land Surface Temp'
  },
  viirs: {
    url: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_CorrectedReflectance_TrueColor/default/default/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
    maxNativeZoom: 9,
    opacity: 0.88,
    attr: 'NASA EOSDIS GIBS • VIIRS SNPP True Color'
  }
};

function getCropLocalized(crop, fieldBase) {
  if (APP_STATE.lang === 'es') return crop[`${fieldBase}Es`] || crop[`${fieldBase}En`];
  if (APP_STATE.lang === 'pt') return crop[`${fieldBase}Pt`] || crop[`${fieldBase}En`];
  return crop[`${fieldBase}En`];
}

function getZoneLocalized(node) {
  if (APP_STATE.lang === 'es') return node.zoneEs;
  if (APP_STATE.lang === 'pt') return node.zonePt;
  return node.zoneEn;
}

function initMap() {
  mapInstance = L.map('orbitalMap', {
    center: [APP_STATE.lat, APP_STATE.lon],
    zoom: 7,
    minZoom: 2,
    maxZoom: 15
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap & CARTO',
    subdomains: 'abcd',
    maxZoom: 18
  }).addTo(mapInstance);

  setGibsLayer('ndvi');

  mapMarker = L.circleMarker([APP_STATE.lat, APP_STATE.lon], {
    radius: 9,
    color: '#00b8e6',
    weight: 3,
    fillColor: '#1890ff',
    fillOpacity: 0.85
  }).addTo(mapInstance);

  mapInstance.on('click', async (e) => {
    APP_STATE.lat = Number(e.latlng.lat.toFixed(4));
    APP_STATE.lon = Number(e.latlng.lng.toFixed(4));
    APP_STATE.preset = 'custom';
    document.getElementById('selPreset').value = 'custom';
    mapMarker.setLatLng([APP_STATE.lat, APP_STATE.lon]);
    await refreshNasaAndRender();
  });
}

function setGibsLayer(layerKey) {
  APP_STATE.activeGibsLayer = layerKey;
  if (gibsTileLayer) {
    mapInstance.removeLayer(gibsTileLayer);
    gibsTileLayer = null;
  }
  if (layerKey !== 'none' && GIBS_LAYERS[layerKey]) {
    const cfg = GIBS_LAYERS[layerKey];
    gibsTileLayer = L.tileLayer(cfg.url, {
      maxNativeZoom: cfg.maxNativeZoom,
      maxZoom: 15,
      opacity: cfg.opacity,
      attribution: cfg.attr
    }).addTo(mapInstance);
  }
  document.querySelectorAll('.layer-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.layer === layerKey);
  });
}

async function refreshNasaAndRender() {
  const t = I18N[APP_STATE.lang];
  const statusBadge = document.getElementById('apiStatusBadge');
  statusBadge.textContent = t.apiQuerying;
  statusBadge.className = 'badge badge-warn';

  const presetArg = APP_STATE.preset !== 'custom' ? APP_STATE.preset : null;
  const data = await window.nasaOrbitalService.fetchLocationData(APP_STATE.lat, APP_STATE.lon, presetArg);
  APP_STATE.nasaData = data;

  const proj = window.nasaOrbitalService.projectClimate(data, APP_STATE.horizon, APP_STATE.scenario);
  window.inannaScada.nasaGwet = proj.gwet;

  renderAll();
}

function renderAll() {
  if (!APP_STATE.nasaData) return;
  applyTranslations();

  const t = I18N[APP_STATE.lang];
  const data = APP_STATE.nasaData;
  const isLive = data.source === 'LIVE_NASA_POWER_API';
  const statusBadge = document.getElementById('apiStatusBadge');
  statusBadge.textContent = isLive ? t.apiLive : t.apiCache;
  statusBadge.className = isLive ? 'badge badge-green' : 'badge badge-cyan';

  const hist = data.baselines.historical2005;
  const proj = window.nasaOrbitalService.projectClimate(data, APP_STATE.horizon, APP_STATE.scenario);
  const crops = window.cropSuitabilityEngine.evaluateAll(data, APP_STATE.horizon, APP_STATE.scenario, APP_STATE.management);

  document.getElementById('mapCoordsOverlay').textContent =
    `LAT ${APP_STATE.lat.toFixed(3)}° | LON ${APP_STATE.lon.toFixed(3)}° | ELEV ~${data.elevM}m | SOLAR ${proj.solar} MJ/m²/d`;

  const dTemp = (proj.t2m - hist.t2m).toFixed(2);
  document.getElementById('kpiTempVal').textContent = `${proj.t2m.toFixed(1)} °C`;
  document.getElementById('kpiTempDelta').textContent =
    `${dTemp >= 0 ? '+' : ''}${dTemp} °C ${t.vs2005} (${data.trends.tempSlopeDecade >= 0 ? '+' : ''}${data.trends.tempSlopeDecade}${t.decUnit})`;

  document.getElementById('kpiHeatVal').textContent = `${proj.tMax.toFixed(1)} °C`;
  document.getElementById('kpiHeatDelta').textContent = `${t.minFrost}: ${proj.tMin.toFixed(1)} °C`;

  const dPrec = proj.precMm - hist.precMm;
  document.getElementById('kpiPrecVal').textContent = `${proj.precMm} ${t.mmYr}`;
  document.getElementById('kpiPrecDelta').textContent = `${dPrec >= 0 ? '+' : ''}${dPrec} mm ${t.vs2005}`;

  document.getElementById('kpiGwetVal').textContent = `${(proj.gwet * 100).toFixed(1)} %`;
  document.getElementById('kpiGwetDelta').textContent = `SMAP / GLDAS GWETROOT`;

  const topCrop = crops[0];
  document.getElementById('kpiTopCropVal').textContent = getCropLocalized(topCrop, 'name').split('(')[0].trim();
  document.getElementById('kpiTopCropDelta').textContent =
    `${t.suitabilityLbl}: ${topCrop.scoreTarget}% (${topCrop.deltaVsHist >= 0 ? '+' : ''}${topCrop.deltaVsHist}% ${t.shiftWord})`;

  document.getElementById('kpiWaterVal').textContent =
    APP_STATE.management === 'drip_iiot' ? `${topCrop.irrigationM3Ha} m³/ha` : t.rainfedZero;
  document.getElementById('kpiWaterDelta').textContent =
    APP_STATE.management === 'drip_iiot' ? t.dripHintClosed : t.dripHintSwitch;

  renderCharts(data, proj, crops);
  renderCropCards(crops);
  renderScadaPanel();
  if (window.inannaProSuite) {
    window.inannaProSuite.renderAllPro();
  }
}

function renderCharts(data, proj, crops) {
  const t = I18N[APP_STATE.lang];
  const ctx1 = document.getElementById('climateTrendChart').getContext('2d');
  const p2035 = window.nasaOrbitalService.projectClimate(data, 2035, APP_STATE.scenario);
  const p2050 = window.nasaOrbitalService.projectClimate(data, 2050, APP_STATE.scenario);

  const labels = [...data.years.map(String), '2035 (CMIP6)', '2050 (CMIP6)'];
  const tempSeries = [...data.t2m, p2035.t2m, p2050.t2m];
  const precSeries = [...data.precMm, p2035.precMm, p2050.precMm];

  if (climateChart) climateChart.destroy();
  climateChart = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          type: 'line',
          label: t.chartTempLegend,
          data: tempSeries,
          borderColor: '#00b8e6',
          backgroundColor: 'rgba(0, 184, 230, 0.18)',
          borderWidth: 2.4,
          tension: 0.3,
          yAxisID: 'yTemp'
        },
        {
          type: 'bar',
          label: t.chartPrecLegend,
          data: precSeries,
          backgroundColor: precSeries.map((_, i) => i >= data.years.length ? 'rgba(168, 85, 247, 0.45)' : 'rgba(24, 144, 255, 0.32)'),
          borderColor: precSeries.map((_, i) => i >= data.years.length ? '#a855f7' : '#1890ff'),
          borderWidth: 1,
          yAxisID: 'yPrec'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#cbd5e1', font: { size: 11 } } } },
      scales: {
        x: { ticks: { color: '#94a3b8', maxRotation: 45, font: { size: 10 } }, grid: { color: 'rgba(148,163,184,0.08)' } },
        yTemp: { position: 'left', ticks: { color: '#00b8e6', font: { size: 10 } }, grid: { color: 'rgba(148,163,184,0.1)' } },
        yPrec: { position: 'right', ticks: { color: '#93c5fd', font: { size: 10 } }, grid: { drawOnChartArea: false } }
      }
    }
  });

  const ctx2 = document.getElementById('cropShiftChart').getContext('2d');
  const top8 = crops.slice(0, 8);
  if (shiftChart) shiftChart.destroy();
  shiftChart = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: top8.map(c => getCropLocalized(c, 'name').split('(')[0].trim()),
      datasets: [
        {
          label: t.chartHistLegend,
          data: top8.map(c => c.score2005),
          backgroundColor: 'rgba(148, 163, 184, 0.38)',
          borderColor: '#94a3b8',
          borderWidth: 1
        },
        {
          label: `${APP_STATE.horizon} (${APP_STATE.scenario.toUpperCase()})`,
          data: top8.map(c => c.scoreTarget),
          backgroundColor: top8.map(c => c.scoreTarget >= 74 ? 'rgba(16, 185, 129, 0.68)' : 'rgba(245, 158, 11, 0.65)'),
          borderColor: top8.map(c => c.scoreTarget >= 74 ? '#10b981' : '#f59e0b'),
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#cbd5e1', font: { size: 11 } } } },
      scales: {
        x: { ticks: { color: '#cbd5e1', font: { size: 10 } }, grid: { display: false } },
        y: { min: 0, max: 100, ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { color: 'rgba(148,163,184,0.1)' } }
      }
    }
  });
}

function renderCropCards(crops) {
  const grid = document.getElementById('cropMatrixGrid');
  const t = I18N[APP_STATE.lang];

  grid.innerHTML = crops.map((c, idx) => {
    const badgeClass = c.scoreTarget >= 74 ? 'badge-green' : (c.scoreTarget >= 54 ? 'badge-warn' : 'badge-crit');
    const badgeText = c.scoreTarget >= 74 ? t.badgeViable : (c.scoreTarget >= 54 ? t.badgeAdapt : t.badgeRisk);
    const cardClass = idx < 3 && c.scoreTarget >= 74 ? 'crop-card recommended' : (c.deltaVsHist < -8 ? 'crop-card declining' : 'crop-card');
    const barColor = c.scoreTarget >= 74 ? '#10b981' : (c.scoreTarget >= 54 ? '#f59e0b' : '#ef4444');
    const deltaSign = c.deltaVsHist >= 0 ? `+${c.deltaVsHist}%` : `${c.deltaVsHist}%`;

    return `
      <article class="${cardClass}">
        <div class="crop-top">
          <div>
            <div class="crop-name">#${idx + 1} ${getCropLocalized(c, 'name')}</div>
            <div class="crop-sci">${c.sci} • ${t.waterReq}: ${c.waterReqMm} mm</div>
          </div>
          <span class="badge ${badgeClass}">${badgeText}</span>
        </div>
        <div class="score-bars">
          <div class="score-row">
            <span>${t.base2005}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${c.score2005}%;background:#64748b;"></div></div>
            <span>${c.score2005}%</span>
          </div>
          <div class="score-row">
            <span><strong>${APP_STATE.horizon} ${t.projShort}</strong></span>
            <div class="bar-track"><div class="bar-fill" style="width:${c.scoreTarget}%;background:${barColor};"></div></div>
            <span><strong>${c.scoreTarget}%</strong></span>
          </div>
        </div>
        <div class="crop-meta">
          <span>${t.cardShift}: <strong>${deltaSign}</strong></span>
          <span>${t.cardIrrig}: <strong>${c.irrigationM3Ha} m³/ha</strong></span>
          <span>${t.cardGross}: <strong>${c.heatCritC}°C</strong></span>
        </div>
        <div class="crop-advice">${getCropLocalized(c, 'advice')}</div>
      </article>
    `;
  }).join('');
}

function renderScadaPanel() {
  const snap = window.inannaScada.getTelemetrySnapshot();
  const lang = APP_STATE.lang;
  const t = I18N[lang];
  const sl = snap.soilLoop;

  document.getElementById('valLoopMa').textContent = `${sl.ma.toFixed(2)} mA`;
  document.getElementById('valKirchhoffV').textContent = `${sl.vSense.toFixed(3)} V`;
  document.getElementById('valAdsCounts').textContent = `${sl.adcCounts} cts`;
  document.getElementById('valLoopPct').textContent = sl.pct !== null ? `${sl.pct.toFixed(1)} %` : 'FAULT!';

  const diagEl = document.getElementById('namurStatusBadge');
  diagEl.textContent = sl.label[lang] || sl.label.en;
  diagEl.className = `badge badge-${sl.statusBadge === 'ok' ? 'green' : sl.statusBadge}`;

  document.getElementById('fusionDecisionBox').textContent = snap.fusionDecision[lang] || snap.fusionDecision.en;
  document.getElementById('fusionDecisionBox').style.borderLeftColor =
    sl.statusBadge === 'crit' ? '#ef4444' : (sl.statusBadge === 'warn' ? '#f59e0b' : '#00b8e6');

  document.getElementById('nvsHorometer').textContent = `${snap.pumpHours.toFixed(1)} h`;
  document.getElementById('nvsCycles').textContent = `${snap.irrigCycles}`;
  const relayEl = document.getElementById('relayStatusBadge');
  relayEl.textContent = snap.safetyRelayLocked ? t.relayTripped : (snap.pumpActive ? t.relayPumpOn : t.relayStandby);
  relayEl.className = `badge ${snap.safetyRelayLocked ? 'badge-crit' : (snap.pumpActive ? 'badge-green' : 'badge-cyan')}`;

  document.getElementById('espNowNodesGrid').innerHTML = snap.nodes.map(n => {
    const evalNode = window.inannaScada.evaluateCurrentLoop(n.ma);
    const bCls = evalNode.statusBadge === 'ok' ? 'badge-green' : `badge-${evalNode.statusBadge}`;
    return `
      <div class="node-card">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <strong style="color:#fff;">${n.id} • ${getZoneLocalized(n)}</strong>
          <span class="badge ${bCls}">${evalNode.pct !== null ? evalNode.pct + '%' : 'FAULT'}</span>
        </div>
        <div style="color:#94a3b8;">MAC ${n.mac} | AES-128 | ${n.latMs} ms | ${n.rssi} dBm</div>
        <div style="color:#00b8e6;">Loop: ${n.ma.toFixed(2)} mA | Solar Bus: ${n.battV} V DC</div>
      </div>
    `;
  }).join('');

  document.getElementById('modbusTableBody').innerHTML = snap.registers.map(r => `
    <tr>
      <td><strong>${r.reg}</strong></td>
      <td>${r.type}</td>
      <td>${r.name}</td>
      <td style="color:#00b8e6;">${r.raw}</td>
      <td>${r.eng}</td>
    </tr>
  `).join('');

  document.getElementById('alarmHistorian').innerHTML = snap.alarms.map(a => {
    const col = a.level === 'ALARM' ? '#fca5a5' : (a.level === 'WARN' ? '#fcd34d' : (a.level === 'ACK' ? '#6ee7b7' : '#94a3b8'));
    const txt = (a.msg && typeof a.msg === 'object') ? (a.msg[lang] || a.msg.en) : a.msg;
    return `<div style="color:${col};">[${a.ts}] <strong>${a.level}</strong> — ${txt}</div>`;
  }).join('');

  if (window.inannaProSuite) {
    window.inannaProSuite.renderPidBlueprint();
  }
}
window.renderScadaPanel = renderScadaPanel;

function applyTranslations() {
  const lang = APP_STATE.lang;
  const t = I18N[lang];
  document.documentElement.lang = lang;

  // Sync active language pill button & slide deck link
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  const slidesLink = document.getElementById('navSlides');
  slidesLink.href = `presentation/deck_7_slides.html?lang=${lang}`;
  const manualsLink = document.getElementById('navManuals');
  if (manualsLink) manualsLink.href = `manuals/index.html?lang=${lang}`;

  const textMap = {
    ribOrbital: t.ribOrbital,
    ribConae: t.ribConae,
    ribField: t.ribField,
    ribEvent: t.ribEvent,
    navOrbital: t.navOrbital,
    navShift: t.navShift,
    navScada: t.navScada,
    navManuals: t.navManuals,
    navSlides: t.navSlides,
    btnPrint: t.btnPrint,
    heroBadge: t.heroBadge,
    heroTitle: t.heroTitle,
    heroDesc: t.heroDesc,
    lblPreset: t.lblPreset,
    optPresetCal: t.optPresetCal,
    optPresetRio: t.optPresetRio,
    optPresetTras: t.optPresetTras,
    optPresetMen: t.optPresetMen,
    optPresetFre: t.optPresetFre,
    optPresetCus: t.optPresetCus,
    lblHorizon: t.lblHorizon,
    optHor2026: t.optHor2026,
    optHor2035: t.optHor2035,
    optHor2050: t.optHor2050,
    lblScenario: t.lblScenario,
    optSsp245: t.optSsp245,
    optSsp585: t.optSsp585,
    lblMgmt: t.lblMgmt,
    optMgmtRain: t.optMgmtRain,
    optMgmtRegen: t.optMgmtRegen,
    optMgmtDrip: t.optMgmtDrip,
    kpiTempLbl: t.kpiTemp,
    kpiHeatLbl: t.kpiHeat,
    kpiPrecLbl: t.kpiPrec,
    kpiGwetLbl: t.kpiGwet,
    kpiTopCropLbl: t.kpiTopCrop,
    kpiWaterLbl: t.kpiWaterSave,
    mapPanelTitle: t.mapTitle,
    mapPanelSub: t.mapSub,
    btnLayerNdvi: t.layerNdvi,
    btnLayerSmap: t.layerSmap,
    btnLayerLst: t.layerLst,
    btnLayerViirs: t.layerViirs,
    btnLayerNone: t.layerNone,
    chartClimateTitle: t.chartClimateTitle,
    chartShiftTitle: t.chartShiftTitle,
    matrixTitle: t.matrixTitle,
    matrixSub: t.matrixSub,
    matrixBadge: t.matrixBadge,
    scadaTitle: t.scadaTitle,
    scadaSub: t.scadaSub,
    btnWebSerial: t.btnWebSerial,
    btnAlarmAck: t.btnAlarmAck,
    btnResetHorometer: t.btnResetHorometer,
    scadaWhyTitle: t.scadaWhyTitle,
    scadaWhyDesc: t.scadaWhyDesc,
    lblHorometer: t.lblHorometer,
    lblCycles: t.lblCycles,
    loopSimTitle: t.loopSimTitle,
    btnSimCut: t.btnSimCut,
    btnSimDry: t.btnSimDry,
    btnSimOpt: t.btnSimOpt,
    btnSimShort: t.btnSimShort,
    namurFaultZone: t.namurFaultZone,
    namurLinearZone: t.namurLinearZone,
    namurShortZone: t.namurShortZone,
    lblElecMa: t.lblElecMa,
    lblElecShunt: t.lblElecShunt,
    lblElecAdc: t.lblElecAdc,
    lblElecMoist: t.lblElecMoist,
    espNowTitle: t.espNowTitle,
    modbusTitle: t.modbusTitle,
    modbusBadge: t.modbusBadge,
    thReg: t.thReg,
    thType: t.thType,
    thTag: t.thTag,
    thRaw: t.thRaw,
    thEng: t.thEng,
    historianTitle: t.historianTitle,
    footTeamTitle: t.footTeamTitle,
    footDataTitle: t.footDataTitle,
    footSiTitle: t.footSiTitle
  };

  for (const [id, val] of Object.entries(textMap)) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  // Rich HTML fields
  document.getElementById('brandSubtitle').innerHTML = t.subtitle;
  document.getElementById('footEvent').innerHTML = t.footEvent;
  document.getElementById('footChallenge').innerHTML = t.footChallenge;
  document.getElementById('footRoster').innerHTML = t.footRoster;
  document.getElementById('footDataList').innerHTML = t.footDataList;
  document.getElementById('footSiDesc').innerHTML = t.footSiDesc;
}

function setLanguage(lang) {
  if (!['en', 'es', 'pt'].includes(lang)) return;
  APP_STATE.lang = lang;
  localStorage.setItem('inanna_lang', lang);
  renderAll();
}

document.addEventListener('DOMContentLoaded', async () => {
  initMap();
  if (window.inannaProSuite) {
    window.inannaProSuite.initControls();
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  document.getElementById('selPreset').addEventListener('change', async (e) => {
    const val = e.target.value;
    if (val !== 'custom' && window.NASA_PRESETS[val]) {
      const p = window.NASA_PRESETS[val];
      APP_STATE.preset = val;
      APP_STATE.lat = p.lat;
      APP_STATE.lon = p.lon;
      mapInstance.setView([p.lat, p.lon], 8);
      mapMarker.setLatLng([p.lat, p.lon]);
      await refreshNasaAndRender();
    }
  });

  document.getElementById('selHorizon').addEventListener('change', (e) => {
    APP_STATE.horizon = Number(e.target.value);
    if (APP_STATE.nasaData) {
      const proj = window.nasaOrbitalService.projectClimate(APP_STATE.nasaData, APP_STATE.horizon, APP_STATE.scenario);
      window.inannaScada.nasaGwet = proj.gwet;
      renderAll();
    }
  });

  document.getElementById('selScenario').addEventListener('change', (e) => {
    APP_STATE.scenario = e.target.value;
    if (APP_STATE.nasaData) {
      const proj = window.nasaOrbitalService.projectClimate(APP_STATE.nasaData, APP_STATE.horizon, APP_STATE.scenario);
      window.inannaScada.nasaGwet = proj.gwet;
      renderAll();
    }
  });

  document.getElementById('selMgmt').addEventListener('change', (e) => {
    APP_STATE.management = e.target.value;
    renderAll();
  });

  document.querySelectorAll('.layer-btn').forEach(btn => {
    btn.addEventListener('click', () => setGibsLayer(btn.dataset.layer));
  });

  document.getElementById('btnPrint').addEventListener('click', () => window.print());

  const slider = document.getElementById('loopCurrentSlider');
  slider.addEventListener('input', (e) => {
    window.inannaScada.setLoopCurrent(parseFloat(e.target.value));
    renderScadaPanel();
  });

  document.querySelectorAll('.scada-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ma = parseFloat(btn.dataset.ma);
      slider.value = ma;
      window.inannaScada.setLoopCurrent(ma);
      if (window.inannaProSuite) {
        window.inannaProSuite.playTone((ma < 3.6 || ma > 20.5) ? 'alarm' : 'beep');
      }
      renderScadaPanel();
    });
  });

  document.getElementById('btnAlarmAck').addEventListener('click', () => {
    const ok = window.inannaScada.acknowledgeAlarm();
    if (window.inannaProSuite) {
      window.inannaProSuite.playTone(ok ? 'ok' : 'alarm');
    }
    renderScadaPanel();
  });

  document.getElementById('btnResetHorometer').addEventListener('click', () => {
    window.inannaScada.resetServiceHorometer();
    renderScadaPanel();
  });

  document.getElementById('btnWebSerial').addEventListener('click', async () => {
    await window.inannaScada.connectWebSerial(() => {
      slider.value = window.inannaScada.loopMa;
      renderScadaPanel();
    });
    renderScadaPanel();
  });

  setInterval(() => {
    if (window.inannaScada.pumpActive && !window.inannaScada.safetyRelayLocked) {
      window.inannaScada.pumpHours += 0.1;
      window.inannaScada.saveNvs();
      renderScadaPanel();
    }
  }, 6000);

  await refreshNasaAndRender();

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
});
