/**
 * TERRA-SHIFT SCADA — Phenology, Environmental Impact, Mechatronic P&ID & Inanna Neural Voice Tour
 * Open-Source Hackathon Project by Team INANNA (Santa Rosa de Calamuchita, Córdoba, Argentina)
 * 2026 NASA Space Apps Challenge — "Field Shift: Adapting Farms with NASA Data"
 *
 * Neural Voice Engine ("Bóveda Web de Inanna"):
 * - Español (AR): es-AR-ElenaNeural (Official Inanna V2 Voice)
 * - English (US): en-US-JennyNeural
 * - Português (BR): pt-BR-FranciscaNeural
 */

const PRO_I18N = {
  en: {
    navPhenology: '3. 12-Mo Calendar',
    navRoi: '4. Water & Climate Impact',
    navScadaNew: '5. Ground IIoT SCADA',
    btnAutoDemoStart: '🎙️ Guided Demo (Inanna Voice)',
    btnAutoDemoStop: '⏹ Stop Inanna Tour',
    demoStepPrefix: '🎙️ INANNA VOICE TOUR',
    btnPrevStep: '⏮ Prev',
    btnPauseStep: '⏸ Pause',
    btnResumeStep: '▶ Resume',
    btnNextStep: '⏭ Next',
    btnSilenceNow: '🤫 Mute Voice',
    phenTitle: '12-Month Crop Phenology, Frost/Heat Risk & Irrigation Calendar',
    phenSub: 'Derived from NASA POWER monthly climatology scaled to selected CMIP6 horizon & hemisphere',
    phenCropLbl: 'Inspect Crop Calendar:',
    phenChartTemp: 'Projected Monthly Temp (°C)',
    phenChartRain: 'Monthly Rain (mm)',
    phenChartEtc: 'Crop Water Need ETc (mm)',
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    stages: {
      sow: 'Sowing / Planting',
      veg: 'Vegetative Growth',
      flo: 'Flowering / Critical',
      fill: 'Grain / Fruit Fill',
      harv: 'Harvest Window',
      dorm: 'Dormancy / Cover Crop'
    },
    riskFrost: '❄️ Frost Watch',
    riskHeat: '🔥 Heat Peak',
    riskDrip: '💧 Drip Active',
    riskOpt: '✓ Optimal',
    roiTitle: 'Farm-Scale Water Conservation, Pump Energy & Climate Impact Simulator',
    roiSub: 'Quantifies freshwater saved, VFD pump affinity-law efficiency (P ∝ N³), carbon reduction & open-hardware sizing',
    roiHaLbl: 'Cultivated Area (Hectares)',
    roiPumpLbl: 'Irrigation Pump Motor (HP)',
    roiKwhLbl: 'Annual Pumping Window (h/yr)',
    roiKpiWater: 'Freshwater Conserved',
    roiKpiWaterSub: 'Closed-loop 4–20 mA + NASA GWETROOT',
    roiKpiEnergy: 'Pump Electricity Saved',
    roiKpiEnergySub: 'VFD Affinity Laws (P ∝ N³) vs throttling',
    roiKpiCo2: 'Emissions Avoided',
    roiKpiCo2Sub: 'Reduced pumping + soil cover retention',
    roiKpiRev: 'Resilience Gain vs Maize',
    roiKpiRevSub: 'Suitability boost under target CMIP6',
    roiKpiKit: 'Open-Hardware Mesh Sizing',
    roiKpiPayback: 'Root-Zone Moisture Reserve',
    roiPoolsEq: 'Olympic pools/yr',
    roiBomGateway: '1× Open ESP32 Gateway +',
    roiBomNodes: 'Solar ESP-NOW Nodes',
    pidTitle: 'Interactive Mechatronic P&ID & 4–20 mA Kirchhoff Architecture Blueprint',
    pidSub: 'Live hardware state synchronized with the 4–20 mA NAMUR NE43 simulator above — test wire cuts & shorts!',
    pidBadge: 'OPEN MECHATRONICS • IEC / NAMUR NE43',
    pidOrbital: '1. NASA ORBITAL LAYER',
    pidLoop: '2. 24V DC 4–20 mA LOOP',
    pidMesh: '3. ESP-NOW AES-128 MESH',
    pidPlc: '4. GATEWAY & MODBUS',
    pidAct: '5. VFD PUMP & SAFETY RELAY',
    soundOn: '🔔 Audio & Voice: ON',
    soundOff: '🔕 Audio & Voice: MUTE',
    demoMsgs: [
      'Part 1/6 — Inanna: Querying 20 years of live NASA POWER, MODIS & SMAP satellite data over Santa Rosa de Calamuchita...',
      'Part 2/6 — Inanna: Ranking 10 crops to 2050 & mapping the 12-month calendar — resilient vineyards, olive, chickpea & sorghum thrive.',
      'Part 3/6 — Inanna: Simulating farm-scale impact — 38% freshwater conserved, 34% VFD pump energy saved & lower carbon footprint.',
      'Part 4/6 — Inanna: Stepping into an offline rural plot — NODE-01 reads dry roots (6.80 mA = 17.5%) confirmed by NASA → Drip OPEN!',
      'Part 5/6 — Inanna: CRITICAL TEST! Severed field cable (1.20 mA < 3.6 mA NAMUR NE43) → Safety Relay LOCKS pump & switches to NASA backup!',
      'Part 6/6 — Inanna: Loop repaired (12.00 mA = 50.0%) + SCADA Alarm ACK → Open-hardware Modbus system ARMED. Team INANNA!'
    ]
  },
  es: {
    navPhenology: '3. Calendario 12M',
    navRoi: '4. Impacto Hídrico y Clima',
    navScadaNew: '5. SCADA Rural IIoT',
    btnAutoDemoStart: '🎙️ Demo Guiada (Voz Inanna)',
    btnAutoDemoStop: '⏹ Detener Demo Inanna',
    demoStepPrefix: '🎙️ VOZ DE INANNA EN VIVO',
    btnPrevStep: '⏮ Anterior',
    btnPauseStep: '⏸ Pausar',
    btnResumeStep: '▶ Continuar',
    btnNextStep: '⏭ Siguiente',
    btnSilenceNow: '🤫 Callar Voz Ya',
    phenTitle: 'Calendario Fenológico de 12 Meses, Riesgo de Helada/Calor y Riego',
    phenSub: 'Calculado con climatología mensual real NASA POWER escalada al horizonte CMIP6 y hemisferio del lote',
    phenCropLbl: 'Inspeccionar Cultivo:',
    phenChartTemp: 'Temp. Mensual Proyectada (°C)',
    phenChartRain: 'Lluvia Mensual (mm)',
    phenChartEtc: 'Demanda Cultivo ETc (mm)',
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    stages: {
      sow: 'Siembra / Implantación',
      veg: 'Desarrollo Vegetativo',
      flo: 'Floración / Crítico',
      fill: 'Llenado / Envero RDI',
      harv: 'Ventana de Cosecha',
      dorm: 'Barbecho / Cobertura'
    },
    riskFrost: '❄️ Alerta Helada',
    riskHeat: '🔥 Pico Térmico',
    riskDrip: '💧 Goteo Activo',
    riskOpt: '✓ Óptimo',
    roiTitle: 'Simulador de Impacto Ambiental: Ahorro de Agua, Energía VFD y Huella de Carbono',
    roiSub: 'Cuantifica agua dulce preservada, eficiencia eléctrica por leyes de afinidad (P ∝ N³) y dimensionamiento abierto de nodos',
    roiHaLbl: 'Superficie Agrícola (ha)',
    roiPumpLbl: 'Potencia Bomba de Riego (HP)',
    roiKwhLbl: 'Uso Anual de Bombeo (h/año)',
    roiKpiWater: 'Agua Dulce Preservada',
    roiKpiWaterSub: 'Lazo cerrado 4–20 mA + NASA GWETROOT',
    roiKpiEnergy: 'Energía Eléctrica Ahorrada',
    roiKpiEnergySub: 'Leyes de Afinidad VFD (P ∝ N³)',
    roiKpiCo2: 'Emisiones CO₂ Evitadas',
    roiKpiCo2Sub: 'Menor bombeo + retención de humedad',
    roiKpiRev: 'Ganancia de Resiliencia',
    roiKpiRevSub: 'Mejora de aptitud vs. maíz en secano',
    roiKpiKit: 'Topología Abierta de Campo',
    roiKpiPayback: 'Reserva Hídrica Radicular',
    roiPoolsEq: 'piletas olímpicas/año',
    roiBomGateway: '1× Gateway Abierto ESP32 +',
    roiBomNodes: 'Nodos Solares ESP-NOW',
    pidTitle: 'Plano Mecatrónico P&ID Interactivo y Arquitectura Ley de Kirchhoff 4–20 mA',
    pidSub: 'Sincronizado en tiempo real con el simulador 4–20 mA NAMUR NE43 — ¡probá simular cable cortado o cortocircuito!',
    pidBadge: 'MECATRÓNICA ABIERTA • IEC / NAMUR NE43',
    pidOrbital: '1. CAPA ORBITAL NASA',
    pidLoop: '2. LAZO 24V DC 4–20 mA',
    pidMesh: '3. MALLA ESP-NOW AES-128',
    pidPlc: '4. GATEWAY Y MODBUS',
    pidAct: '5. BOMBA VFD Y RELÉ SEGURO',
    soundOn: '🔔 Voz Inanna: ACTIVA',
    soundOff: '🔕 Voz Inanna: SILENCIO',
    demoMsgs: [
      'Parte 1/6 — Inanna: Consultando en vivo 20 años de satélites NASA POWER, MODIS y SMAP sobre Santa Rosa de Calamuchita...',
      'Parte 2/6 — Inanna: Proyectando 10 cultivos a 2050 y calendario de 12 meses — destacan vid serrana, olivo, garbanzo y sorgo.',
      'Parte 3/6 — Inanna: Simulando impacto ambiental — 38% de ahorro de agua dulce, 34% menos energía en bombas VFD y menos CO₂.',
      'Parte 4/6 — Inanna: Bajando al campo sin internet — NODE-01 detecta raíz seca (6.80 mA = 17.5%) validada con NASA → ¡Riego ACTIVO!',
      'Parte 5/6 — Inanna: ¡PRUEBA CRÍTICA! Cable cortado en el lote (1.20 mA < 3.6 mA NAMUR NE43) → ¡Relé BLOQUEA bomba y usa respaldo NASA!',
      'Parte 6/6 — Inanna: Lazo reparado (12.00 mA = 50.0%) + SCADA Alarm ACK → Sistema abierto Modbus ARMADO. ¡Equipo INANNA!'
    ]
  },
  pt: {
    navPhenology: '3. Calendário 12M',
    navRoi: '4. Impacto Hídrico e Clima',
    navScadaNew: '5. SCADA Rural IIoT',
    btnAutoDemoStart: '🎙️ Demo Guiada (Voz Inanna)',
    btnAutoDemoStop: '⏹ Parar Demo Inanna',
    demoStepPrefix: '🎙️ VOZ DA INANNA AO VIVO',
    btnPrevStep: '⏮ Anterior',
    btnPauseStep: '⏸ Pausar',
    btnResumeStep: '▶ Continuar',
    btnNextStep: '⏭ Próximo',
    btnSilenceNow: '🤫 Silenciar Voz',
    phenTitle: 'Calendário Fenológico de 12 Meses, Risco de Geada/Calor e Irrigação',
    phenSub: 'Calculado com climatologia mensal real NASA POWER ajustada ao horizonte CMIP6 e hemisfério da fazenda',
    phenCropLbl: 'Inspecionar Cultura:',
    phenChartTemp: 'Temp. Mensal Projetada (°C)',
    phenChartRain: 'Chuva Mensal (mm)',
    phenChartEtc: 'Demanda da Cultura ETc (mm)',
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    stages: {
      sow: 'Plantio / Semeadura',
      veg: 'Crescimento Vegetativo',
      flo: 'Floração / Crítico',
      fill: 'Enchimento / Maturação',
      harv: 'Janela de Colheita',
      dorm: 'Pousio / Cobertura'
    },
    riskFrost: '❄️ Alerta Geada',
    riskHeat: '🔥 Pico Térmico',
    riskDrip: '💧 Gotejo Ativo',
    riskOpt: '✓ Ideal',
    roiTitle: 'Simulador de Impacto Ambiental: Economia de Água, Energia VFD e Carbono',
    roiSub: 'Quantifica água doce preservada, eficiência energética por leis de afinidade (P ∝ N³) e arquitetura aberta de nós',
    roiHaLbl: 'Área Agrícola (ha)',
    roiPumpLbl: 'Potência da Bomba (HP)',
    roiKwhLbl: 'Horas Anuais de Bombeamento (h/ano)',
    roiKpiWater: 'Água Doce Preservada',
    roiKpiWaterSub: 'Malha fechada 4–20 mA + NASA GWETROOT',
    roiKpiEnergy: 'Energia Elétrica Poupada',
    roiKpiEnergySub: 'Leis de Afinidade VFD (P ∝ N³)',
    roiKpiCo2: 'Carbono Evitado',
    roiKpiCo2Sub: 'Menor bombeamento + umidade no solo',
    roiKpiRev: 'Ganho de Resiliência',
    roiKpiRevSub: 'Aumento de aptidão vs. milho sequeiro',
    roiKpiKit: 'Topologia Aberta de Campo',
    roiKpiPayback: 'Reserva Hídrica Radicular',
    roiPoolsEq: 'piscinas olímpicas/ano',
    roiBomGateway: '1× Gateway Aberto ESP32 +',
    roiBomNodes: 'Nós Solares ESP-NOW',
    pidTitle: 'Diagrama Mecatrônico P&ID Interativo e Arquitetura Lei de Kirchhoff 4–20 mA',
    pidSub: 'Sincronizado em tempo real com o simulador 4–20 mA NAMUR NE43 — teste cabo rompido e curto-circuito!',
    pidBadge: 'MECATRÔNICA ABERTA • IEC / NAMUR NE43',
    pidOrbital: '1. CAMADA ORBITAL NASA',
    pidLoop: '2. LAÇO 24V DC 4–20 mA',
    pidMesh: '3. REDE ESP-NOW AES-128',
    pidPlc: '4. GATEWAY E MODBUS',
    pidAct: '5. BOMBA VFD E RELÉ SEGURO',
    soundOn: '🔔 Voz Inanna: ATIVA',
    soundOff: '🔕 Voz Inanna: MUDO',
    demoMsgs: [
      'Parte 1/6 — Inanna: Consultando ao vivo 20 anos de satélites NASA POWER, MODIS e SMAP sobre Santa Rosa de Calamuchita...',
      'Parte 2/6 — Inanna: Avaliando 10 culturas até 2050 e calendário de 12 meses — videira serrana, oliveira, grão-de-bico e sorgo prosperam.',
      'Parte 3/6 — Inanna: Simulando impacto ambiental — 38% de economia de água doce, 34% menos energia VFD e menos emissões de CO₂.',
      'Parte 4/6 — Inanna: No campo sem internet — NODE-01 detecta raiz seca (6.80 mA = 17.5%) confirmada pela NASA → Irrigação ATIVA!',
      'Parte 5/6 — Inanna: TESTE CRÍTICO! Cabo rompido na lavoura (1.20 mA < 3.6 mA NAMUR NE43) → Relé TRAVA bomba e ativa backup NASA!',
      'Parte 6/6 — Inanna: Laço reparado (12.00 mA = 50.0%) + SCADA Alarm ACK → Sistema aberto Modbus ARMADO. Equipe INANNA!'
    ]
  }
};

// Fallback TTS texts if MP3 cannot play for any reason
const FALLBACK_TTS_SCRIPTS = {
  es: [
    'Hola jurado de NASA Space Apps. Soy Inanna. Aquí en vivo consultamos veinte años de satélites NASA POWER, MODIS y SMAP sobre Santa Rosa de Calamuchita, detectando calentamiento y caída de humedad en la raíz.',
    'Con proyecciones climáticas a dos mil cincuenta, evaluamos diez cultivos y su calendario de doce meses. Donde el maíz tradicional sufre golpes de calor, prosperan la vid serrana, el olivo, el garbanzo y el sorgo.',
    'En nuestro simulador ambiental por hectárea, el riego en lazo cerrado y bombas con variador de frecuencia ahorran treinta y ocho por ciento de agua dulce, treinta y cuatro por ciento de energía y reducen la huella de carbono.',
    'Ahora bajemos al campo sin internet. Nuestros nodos solares ESP-NOW leen sondas industriales de cuatro a veinte miliamperios. Al detectar raíz seca en seis coma ocho miliamperios confirmada por la NASA, activamos el riego.',
    'Atención jurado: simulamos un cable cortado en el lote. Un sensor común leería cero por ciento seco e inundaría el cultivo. Con norma industrial NAMUR NE43 enclavamos la bomba al instante y pasamos a respaldo satelital NASA.',
    'Al reparar el lazo a doce miliamperios y confirmar la alarma, el sistema vuelve a operar en código abierto compatible con Modbus. Somos el equipo INANNA desde Calamuchita: ciencia de la NASA en órbita, precisión mecatrónica en la raíz.'
  ],
  en: [
    'Hello NASA Space Apps Jury, I am Inanna. Right here, we query twenty years of live NASA POWER, MODIS, and SMAP satellite telemetry over Santa Rosa de Calamuchita, tracking rising heat and declining root-zone moisture.',
    'Using twenty-fifty climate projections, we rank ten crops and map their twelve-month phenology calendar. Where traditional rainfed maize suffers heat shock, high-altitude vineyards, olive, chickpea, and sorghum thrive.',
    'In our farm environmental impact simulator, closed-loop drip irrigation and variable-frequency pump drives conserve thirty-eight percent of freshwater, save thirty-four percent of energy, and cut carbon emissions.',
    'Now let us step into an offline rural farm. Our solar ESP-NOW nodes read industrial four-to-twenty milliamp probes. Detecting dry roots at six point eight milliamps confirmed by NASA, we open precision drip irrigation.',
    'Watch closely, judges: we simulate a severed field cable. Cheap sensors read zero percent dry and flood the farm. Using NAMUR NE43 live-zero diagnostics, we lock the safety relay instantly and switch to NASA orbital backup.',
    'Once repaired to twelve milliamps and acknowledged, our open-hardware system rearms, ready for any Modbus controller. From Santa Rosa de Calamuchita, we are Team INANNA: NASA science in orbit, mechatronic precision at the root.'
  ],
  pt: [
    'Olá júri do NASA Space Apps, eu sou a Inanna. Aqui consultamos ao vivo vinte anos de satélites NASA POWER, MODIS e SMAP sobre Santa Rosa de Calamuchita, detectando aquecimento e queda na umidade da raiz.',
    'Com projeções climáticas para dois mil e cinquenta, avaliamos dez culturas e seu calendário de doze meses. Onde o milho tradicional sofre choque térmico, prosperam a videira serrana, a oliveira, o grão-de-bico e o sorgo.',
    'Em nosso simulador de impacto ambiental, o gotejamento em malha fechada e inversores de frequência economizam trinta e oito por cento de água doce, trinta e quatro por cento de energia e reduzem emissões de carbono.',
    'Agora vamos ao campo sem internet. Nossos nós solares ESP-NOW leem sondas industriais de quatro a vinte miliamperes. Ao detectar raiz seca em seis vírgula oito miliamperes confirmada pela NASA, ativamos a irrigação.',
    'Atenção jurados: simulamos um cabo rompido na lavoura. Sensores comuns leriam zero por cento seco e inundariam o cultivo. Com o padrão NAMUR NE43, travamos a bomba na hora e ativamos o backup satelital da NASA.',
    'Após reparar o cabo para doze miliamperes e confirmar o alarme, nosso sistema aberto rearma pronto para Modbus. De Santa Rosa de Calamuchita, somos a Equipe INANNA: ciência da NASA em órbita, precisão mecatrônica na raiz.'
  ]
};

const CROP_STAGE_SH = {
  maize:     ['flo',  'fill', 'harv', 'harv', 'dorm', 'dorm', 'dorm', 'dorm', 'dorm', 'sow',  'veg',  'veg'],
  soybean:   ['flo',  'fill', 'fill', 'harv', 'dorm', 'dorm', 'dorm', 'dorm', 'dorm', 'dorm', 'sow',  'veg'],
  sorghum:   ['veg',  'flo',  'fill', 'harv', 'dorm', 'dorm', 'dorm', 'dorm', 'dorm', 'dorm', 'sow',  'veg'],
  chickpea:  ['dorm', 'dorm', 'dorm', 'dorm', 'sow',  'veg',  'veg',  'flo',  'fill', 'harv', 'harv', 'dorm'],
  peanut:    ['flo',  'fill', 'fill', 'harv', 'dorm', 'dorm', 'dorm', 'dorm', 'dorm', 'sow',  'veg',  'veg'],
  wheat:     ['dorm', 'dorm', 'dorm', 'dorm', 'sow',  'sow',  'veg',  'veg',  'flo',  'fill', 'harv', 'harv'],
  malbec:    ['fill', 'fill', 'harv', 'dorm', 'dorm', 'dorm', 'dorm', 'dorm', 'veg',  'veg',  'flo',  'fill'],
  olive:     ['fill', 'fill', 'fill', 'harv', 'harv', 'dorm', 'dorm', 'dorm', 'veg',  'flo',  'flo',  'fill'],
  pistachio: ['fill', 'harv', 'harv', 'dorm', 'dorm', 'dorm', 'dorm', 'dorm', 'veg',  'flo',  'fill', 'fill'],
  lavender:  ['harv', 'harv', 'veg',  'dorm', 'dorm', 'dorm', 'dorm', 'veg',  'sow',  'veg',  'flo',  'flo']
};

const STAGE_KC = { dorm: 0.25, sow: 0.45, veg: 0.78, flo: 1.15, fill: 0.95, harv: 0.50 };

class InannaProSuite {
  constructor() {
    this.phenChart = null;
    this.selectedCropId = null;
    this.farmHa = 50;
    this.pumpHp = 15;
    this.pumpHoursYr = 820;
    this.audioEnabled = true;
    this.audioCtx = null;

    // Inanna Neural Voice Tour State
    this.demoActive = false;
    this.demoPaused = false;
    this.demoStep = 0;
    this.currentAudio = null;
    this.advanceTimeout = null;
  }

  getLang() {
    return (window.APP_STATE && window.APP_STATE.lang) || 'en';
  }

  stopAllSpeechImmediately() {
    if (this.advanceTimeout) {
      clearTimeout(this.advanceTimeout);
      this.advanceTimeout = null;
    }
    if (this.currentAudio) {
      try {
        this.currentAudio.onended = null;
        this.currentAudio.onerror = null;
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (_) {}
      this.currentAudio = null;
    }
    if ('speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (_) {}
    }
    const eq = document.getElementById('inannaVoiceEq');
    if (eq) eq.classList.remove('speaking');
  }

  /**
   * Speaks with Inanna's real neural MP3 voice (es-AR-ElenaNeural / en-US-JennyNeural / pt-BR-FranciscaNeural),
   * falling back to browser SpeechSynthesis (Elena / Laura / Helena / Jenny / Francisca) if offline & uncached.
   */
  speakInannaStep(stepIdx, onComplete) {
    this.stopAllSpeechImmediately();
    if (!this.audioEnabled) {
      if (onComplete) {
        this.advanceTimeout = setTimeout(onComplete, 5200);
      }
      return;
    }

    const lang = this.getLang();
    const mp3Url = `assets/audio/demo_${lang}_${stepIdx}.mp3`;
    const eq = document.getElementById('inannaVoiceEq');

    const audio = new Audio(mp3Url);
    this.currentAudio = audio;

    audio.onplay = () => {
      if (eq) eq.classList.add('speaking');
    };

    audio.onended = () => {
      if (eq) eq.classList.remove('speaking');
      if (this.demoActive && !this.demoPaused && onComplete) {
        this.advanceTimeout = setTimeout(onComplete, 1350);
      }
    };

    audio.onerror = () => {
      this.speakWebSpeechFallback(lang, stepIdx, onComplete);
    };

    audio.play().catch(() => {
      this.speakWebSpeechFallback(lang, stepIdx, onComplete);
    });
  }

  speakWebSpeechFallback(lang, stepIdx, onComplete) {
    const eq = document.getElementById('inannaVoiceEq');
    if (!('speechSynthesis' in window)) {
      if (onComplete) this.advanceTimeout = setTimeout(onComplete, 5500);
      return;
    }
    const scripts = FALLBACK_TTS_SCRIPTS[lang] || FALLBACK_TTS_SCRIPTS.en;
    const utter = new SpeechSynthesisUtterance(scripts[stepIdx] || '');
    const voices = window.speechSynthesis.getVoices();

    if (lang === 'es') {
      utter.lang = 'es-AR';
      utter.voice = voices.find(v => v.name.includes('Elena'))
        || voices.find(v => v.name.includes('Laura') || v.name.includes('Helena') || v.name.includes('Sabina'))
        || voices.find(v => v.lang.startsWith('es'));
    } else if (lang === 'pt') {
      utter.lang = 'pt-BR';
      utter.voice = voices.find(v => v.name.includes('Francisca') || v.name.includes('Maria'))
        || voices.find(v => v.lang.startsWith('pt'));
    } else {
      utter.lang = 'en-US';
      utter.voice = voices.find(v => v.name.includes('Jenny') || v.name.includes('Aria') || v.name.includes('Zira'))
        || voices.find(v => v.lang.startsWith('en'));
    }

    utter.onstart = () => { if (eq) eq.classList.add('speaking'); };
    utter.onend = () => {
      if (eq) eq.classList.remove('speaking');
      if (this.demoActive && !this.demoPaused && onComplete) {
        this.advanceTimeout = setTimeout(onComplete, 1350);
      }
    };
    window.speechSynthesis.speak(utter);
  }

  playTone(type = 'beep') {
    if (!this.audioEnabled) return;
    try {
      const AudioContextCls = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCls) return;
      if (!this.audioCtx) this.audioCtx = new AudioContextCls();
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      const now = this.audioCtx.currentTime;
      if (type === 'alarm') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.setValueAtTime(620, now + 0.14);
        gain.gain.setValueAtTime(0.065, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
        osc.start(now);
        osc.stop(now + 0.33);
      } else if (type === 'ok') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.setValueAtTime(880, now + 0.1);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
        osc.start(now);
        osc.stop(now + 0.25);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(740, now);
        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.13);
      }
    } catch (_) {}
  }

  initControls() {
    const cropSel = document.getElementById('selPhenCrop');
    if (cropSel) {
      cropSel.addEventListener('change', (e) => {
        this.selectedCropId = e.target.value;
        this.renderAllPro();
      });
    }

    const haSlider = document.getElementById('roiHaSlider');
    const haNum = document.getElementById('roiHaInput');
    if (haSlider && haNum) {
      const syncHa = (val) => {
        const clamped = Math.max(1, Math.min(5000, Number(val) || 1));
        this.farmHa = clamped;
        haSlider.value = Math.min(1000, clamped);
        haNum.value = clamped;
        this.renderRoiCalculator();
      };
      haSlider.addEventListener('input', (e) => syncHa(e.target.value));
      haNum.addEventListener('input', (e) => syncHa(e.target.value));
    }

    const pumpSel = document.getElementById('roiPumpHp');
    if (pumpSel) {
      pumpSel.addEventListener('change', (e) => {
        this.pumpHp = Number(e.target.value) || 15;
        this.renderRoiCalculator();
      });
    }

    const kwhInput = document.getElementById('roiKwhCost');
    if (kwhInput) {
      kwhInput.addEventListener('input', (e) => {
        this.pumpHoursYr = Math.max(100, Math.min(4500, Number(e.target.value) || 820));
        this.renderRoiCalculator();
      });
    }

    const btnDemo = document.getElementById('btnAutoDemo');
    if (btnDemo) {
      btnDemo.addEventListener('click', () => this.toggleAutoDemo());
    }

    const btnAudio = document.getElementById('btnScadaAudio');
    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        this.audioEnabled = !this.audioEnabled;
        if (!this.audioEnabled) this.stopAllSpeechImmediately();
        this.applyProTranslations();
        if (this.audioEnabled) this.playTone('ok');
      });
    }
  }

  applyProTranslations() {
    const lang = this.getLang();
    const p = PRO_I18N[lang] || PRO_I18N.en;

    const map = {
      navPhenology: p.navPhenology,
      navRoi: p.navRoi,
      navScada: p.navScadaNew,
      phenTitle: p.phenTitle,
      phenSub: p.phenSub,
      phenCropLbl: p.phenCropLbl,
      roiTitle: p.roiTitle,
      roiSub: p.roiSub,
      roiHaLbl: p.roiHaLbl,
      roiPumpLbl: p.roiPumpLbl,
      roiKwhLbl: p.roiKwhLbl,
      roiKpiWaterLbl: p.roiKpiWater,
      roiKpiWaterSub: p.roiKpiWaterSub,
      roiKpiEnergyLbl: p.roiKpiEnergy,
      roiKpiEnergySub: p.roiKpiEnergySub,
      roiKpiCo2Lbl: p.roiKpiCo2,
      roiKpiCo2Sub: p.roiKpiCo2Sub,
      roiKpiRevLbl: p.roiKpiRev,
      roiKpiRevSub: p.roiKpiRevSub,
      roiKpiKitLbl: p.roiKpiKit,
      roiKpiPaybackLbl: p.roiKpiPayback,
      pidTitle: p.pidTitle,
      pidSub: p.pidSub,
      pidBadge: p.pidBadge,
      demoBtnPrev: p.btnPrevStep,
      demoBtnNext: p.btnNextStep,
      demoBtnSilence: p.btnSilenceNow
    };

    for (const [id, text] of Object.entries(map)) {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    }

    const pauseBtn = document.getElementById('demoBtnPause');
    if (pauseBtn) {
      pauseBtn.textContent = this.demoPaused ? p.btnResumeStep : p.btnPauseStep;
    }

    const btnDemo = document.getElementById('btnAutoDemo');
    if (btnDemo) {
      btnDemo.textContent = this.demoActive ? p.btnAutoDemoStop : p.btnAutoDemoStart;
    }

    const btnAudio = document.getElementById('btnScadaAudio');
    if (btnAudio) {
      btnAudio.textContent = this.audioEnabled ? p.soundOn : p.soundOff;
    }
  }

  renderAllPro() {
    if (!window.APP_STATE || !window.APP_STATE.nasaData) return;
    this.applyProTranslations();
    this.renderPhenologyCalendar();
    this.renderRoiCalculator();
    this.renderPidBlueprint();

    // If user switches language mid-demo, re-narrate current step in the newly chosen language!
    if (this.demoActive && !this.demoPaused) {
      this.executeDemoStep(this.demoStep);
    }
  }

  renderPhenologyCalendar() {
    const state = window.APP_STATE;
    const data = state.nasaData;
    const lang = this.getLang();
    const p = PRO_I18N[lang] || PRO_I18N.en;

    const crops = window.cropSuitabilityEngine.evaluateAll(data, state.horizon, state.scenario, state.management);
    const cropSel = document.getElementById('selPhenCrop');
    if (!cropSel) return;

    const activeId = (this.selectedCropId && crops.some(c => c.id === this.selectedCropId))
      ? this.selectedCropId
      : crops[0].id;

    cropSel.innerHTML = crops.map((c, idx) => {
      const cname = lang === 'es' ? c.nameEs : (lang === 'pt' ? c.namePt : c.nameEn);
      return `<option value="${c.id}" ${c.id === activeId ? 'selected' : ''}>#${idx + 1} ${cname} (${c.scoreTarget}%)</option>`;
    }).join('');

    const crop = crops.find(c => c.id === activeId) || crops[0];
    const curr = data.baselines.current2026;
    const proj = window.nasaOrbitalService.projectClimate(data, state.horizon, state.scenario);
    const deltaT = proj.t2m - curr.t2m;
    const precFactor = curr.precMm > 0 ? (proj.precMm / curr.precMm) : 1.0;

    const isNorthern = state.lat >= 0;
    const rawStages = CROP_STAGE_SH[crop.id] || CROP_STAGE_SH.sorghum;
    const stages12 = rawStages.map((_, m) => isNorthern ? rawStages[(m + 6) % 12] : rawStages[m]);

    const mTemps = (data.monthlyTemp && data.monthlyTemp.length === 12)
      ? data.monthlyTemp.map(v => Number((v + deltaT).toFixed(1)))
      : [24, 23, 20, 17, 13, 10, 9.5, 12, 15, 18.5, 21, 23.5];

    const mRain = (data.monthlyPrec && data.monthlyPrec.length === 12)
      ? data.monthlyPrec.map(v => Math.max(2, Math.round(v * precFactor)))
      : [105, 95, 85, 50, 20, 10, 9, 12, 30, 68, 90, 108];

    const rawWeights = stages12.map((st, m) => STAGE_KC[st] * Math.max(0.35, (mTemps[m] + 5) / 22));
    const sumW = rawWeights.reduce((a, b) => a + b, 0) || 1;
    const mEtc = rawWeights.map(w => Math.round((w / sumW) * crop.waterReqMm));

    const stripEl = document.getElementById('phenologyStrip');
    if (stripEl) {
      stripEl.innerHTML = p.months.map((mLbl, i) => {
        const stKey = stages12[i];
        const tMean = mTemps[i];
        const estPeak = tMean + 12.8;
        const estNightMin = tMean - 9.2;
        const deficit = mEtc[i] - mRain[i] * 0.8;

        let statusTag = `<span class="phen-risk ok">${p.riskOpt}</span>`;
        let borderCls = 'phen-cell';
        if (estNightMin <= 1.2) {
          statusTag = `<span class="phen-risk frost">${p.riskFrost}</span>`;
          borderCls = 'phen-cell frost';
        } else if (estPeak >= crop.heatCritC - 1.5 && (stKey === 'flo' || stKey === 'fill')) {
          statusTag = `<span class="phen-risk heat">${p.riskHeat}</span>`;
          borderCls = 'phen-cell heat';
        } else if (deficit > 18 && stKey !== 'dorm') {
          statusTag = `<span class="phen-risk drip">${p.riskDrip}</span>`;
          borderCls = 'phen-cell drip';
        }

        return `
          <div class="${borderCls}">
            <div class="phen-month">${mLbl}</div>
            <div class="phen-stage stage-${stKey}">${p.stages[stKey]}</div>
            <div class="phen-metrics">
              <span>🌡️ ${tMean}°C</span>
              <span>🌧️ ${mRain[i]}mm</span>
            </div>
            <div class="phen-etc">ETc: ${mEtc[i]} mm</div>
            ${statusTag}
          </div>
        `;
      }).join('');
    }

    const canvas = document.getElementById('phenologyChart');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (this.phenChart) this.phenChart.destroy();
      this.phenChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: p.months,
          datasets: [
            {
              type: 'line',
              label: p.phenChartTemp,
              data: mTemps,
              borderColor: '#f59e0b',
              backgroundColor: 'rgba(245, 158, 11, 0.16)',
              borderWidth: 2.3,
              tension: 0.35,
              yAxisID: 'yT'
            },
            {
              type: 'bar',
              label: p.phenChartRain,
              data: mRain,
              backgroundColor: 'rgba(24, 144, 255, 0.48)',
              borderColor: '#1890ff',
              borderWidth: 1,
              yAxisID: 'yW'
            },
            {
              type: 'bar',
              label: p.phenChartEtc,
              data: mEtc,
              backgroundColor: 'rgba(16, 185, 129, 0.48)',
              borderColor: '#10b981',
              borderWidth: 1,
              yAxisID: 'yW'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { color: '#cbd5e1', font: { size: 11 } } } },
          scales: {
            x: { ticks: { color: '#cbd5e1', font: { size: 10 } }, grid: { display: false } },
            yT: { position: 'left', ticks: { color: '#fbbf24', font: { size: 10 } }, grid: { color: 'rgba(148,163,184,0.09)' } },
            yW: { position: 'right', ticks: { color: '#6ee7b7', font: { size: 10 } }, grid: { drawOnChartArea: false } }
          }
        }
      });
    }
  }

  /**
   * 100% Pure Scientific & Environmental Impact Calculator (Zero commercial pricing)
   */
  renderRoiCalculator() {
    const state = window.APP_STATE;
    if (!state || !state.nasaData) return;
    const lang = this.getLang();
    const p = PRO_I18N[lang] || PRO_I18N.en;

    const crops = window.cropSuitabilityEngine.evaluateAll(state.nasaData, state.horizon, state.scenario, 'drip_iiot');
    const rainfedCrops = window.cropSuitabilityEngine.evaluateAll(state.nasaData, state.horizon, state.scenario, 'rainfed');
    const topCrop = crops[0];
    const maizeBase = rainfedCrops.find(c => c.id === 'maize') || rainfedCrops[rainfedCrops.length - 1];

    const ha = this.farmHa;
    // Closed-loop 4-20mA + NASA GWETROOT conserves ~38% freshwater vs open-loop flood/timer irrigation
    const baseOpenLoopM3Ha = Math.max(1450, Math.round(topCrop.irrigationM3Ha / 0.62));
    const savedM3PerHa = Math.max(520, baseOpenLoopM3Ha - topCrop.irrigationM3Ha);
    const totalWaterSavedM3 = Math.round(savedM3PerHa * ha);
    const olympicPools = (totalWaterSavedM3 / 2500).toFixed(1);

    // Pump Affinity Laws (P2/P1 = (N2/N1)^3): VFD speed modulation saves ~34% electrical kWh
    const pumpKw = this.pumpHp * 0.7457;
    const kwhSaved = Math.round(pumpKw * this.pumpHoursYr * 0.34);

    // Carbon avoided: 0.42 kg CO2/kWh pumping + 0.18 tCO2e/ha soil cover moisture retention
    const co2Tons = ((kwhSaved * 0.00042) + (ha * 0.18)).toFixed(1);

    // Agronomic suitability resilience gain vs rainfed Maize monoculture
    const suitDelta = Math.max(8, topCrop.scoreTarget - maizeBase.scoreTarget);

    // Open-hardware mesh topology sizing (1 solar ESP-NOW node per 15 ha, min 2)
    const nodeCount = Math.max(2, Math.min(64, Math.ceil(ha / 15)));
    const reserveMm = Math.round(savedM3PerHa / 10);

    const setEl = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setEl('roiValWater', `${totalWaterSavedM3.toLocaleString()} m³`);
    setEl('roiSubWaterDyn', `≈ ${olympicPools} ${p.roiPoolsEq} (-38%)`);
    setEl('roiValEnergy', `${kwhSaved.toLocaleString()} kWh`);
    setEl('roiSubEnergyDyn', `-34% VFD (${pumpKw.toFixed(1)} kW)`);
    setEl('roiValCo2', `${co2Tons} tCO₂e`);
    setEl('roiValRev', `+${suitDelta}%`);
    setEl('roiValKit', `${nodeCount}× ESP-NOW`);
    setEl('roiSubKitDyn', `${p.roiBomGateway} ${nodeCount} ${p.roiBomNodes}`);
    setEl('roiValPayback', `+${reserveMm} mm/yr`);
  }

  renderPidBlueprint() {
    const svgBox = document.getElementById('inannaPidSvgContainer');
    if (!svgBox || !window.inannaScada) return;

    const snap = window.inannaScada.getTelemetrySnapshot();
    const lang = this.getLang();
    const p = PRO_I18N[lang] || PRO_I18N.en;
    const sl = snap.soilLoop;

    const isFault = sl.namurCode !== 'NE43_HEALTHY';
    const isCut = sl.namurCode === 'NE43_UNDERSCALE_FAULT';
    const wireColor = isFault ? '#ef4444' : '#00b8e6';
    const wireDash = isCut ? '6,6' : '8,4';
    const actColor = snap.safetyRelayLocked ? '#ef4444' : (snap.pumpActive ? '#10b981' : '#38bdf8');
    const actStateText = snap.safetyRelayLocked
      ? 'SAFETY RELAY: LOCKED (STOP)'
      : (snap.pumpActive ? 'VFD PUMP: RUNNING (DRIP ON)' : 'VFD PUMP: ARMED STANDBY');

    svgBox.innerHTML = `
      <svg viewBox="0 0 1160 250" width="100%" height="auto" role="img" aria-label="Mechatronic P&ID Architecture">
        <defs>
          <linearGradient id="pidCardBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#131c2b"/>
            <stop offset="100%" stop-color="#0a0f18"/>
          </linearGradient>
        </defs>

        <!-- 1. Orbital Satellite Block -->
        <rect x="14" y="24" width="200" height="202" rx="10" fill="url(#pidCardBg)" stroke="#1890ff" stroke-width="1.5"/>
        <text x="28" y="48" fill="#38bdf8" font-size="11" font-weight="700" font-family="JetBrains Mono, monospace">${p.pidOrbital}</text>
        <text x="28" y="76" fill="#f1f5f9" font-size="12" font-weight="700">🛰️ POWER + GIBS + SMAP</text>
        <text x="28" y="100" fill="#94a3b8" font-size="11" font-family="JetBrains Mono, monospace">GWETROOT: ${snap.nasaPct.toFixed(1)} %</text>
        <text x="28" y="122" fill="#94a3b8" font-size="11" font-family="JetBrains Mono, monospace">MODIS NDVI + LST</text>
        <text x="28" y="144" fill="#c084fc" font-size="11" font-family="JetBrains Mono, monospace">CMIP6: ${window.APP_STATE.horizon} (${window.APP_STATE.scenario.toUpperCase()})</text>
        <rect x="28" y="168" width="172" height="40" rx="6" fill="#080c12" stroke="rgba(56,189,248,0.35)"/>
        <text x="38" y="186" fill="#6ee7b7" font-size="10" font-family="JetBrains Mono, monospace">ORBITAL BACKUP READY</text>
        <text x="38" y="201" fill="#94a3b8" font-size="9.5" font-family="JetBrains Mono, monospace">${isFault ? 'ACTIVE FALLBACK SOURCE!' : 'Cross-validating 4–20mA'}</text>

        <!-- 2. 24V DC 4-20mA Kirchhoff Shunt Block -->
        <rect x="248" y="24" width="232" height="202" rx="10" fill="url(#pidCardBg)" stroke="${wireColor}" stroke-width="1.8"/>
        <text x="262" y="48" fill="${wireColor}" font-size="11" font-weight="700" font-family="JetBrains Mono, monospace">${p.pidLoop}</text>
        <text x="262" y="74" fill="#f1f5f9" font-size="12" font-weight="700">⚡ Kirchhoff 165.0 Ω (0.1%)</text>
        <text x="262" y="98" fill="#00b8e6" font-size="11.5" font-weight="700" font-family="JetBrains Mono, monospace">I_loop = ${sl.ma.toFixed(2)} mA ${isCut ? '✂️ OPEN!' : ''}</text>
        <text x="262" y="120" fill="#cbd5e1" font-size="11" font-family="JetBrains Mono, monospace">V_shunt = ${sl.vSense.toFixed(3)} V DC</text>
        <text x="262" y="142" fill="#cbd5e1" font-size="11" font-family="JetBrains Mono, monospace">ADS1115 = ${sl.adcCounts} cts (16b)</text>
        <rect x="262" y="164" width="204" height="44" rx="6" fill="${isFault ? 'rgba(239,68,68,0.18)' : 'rgba(16,185,129,0.14)'}" stroke="${wireColor}"/>
        <text x="272" y="183" fill="#ffffff" font-size="10.5" font-weight="700" font-family="JetBrains Mono, monospace">${sl.namurCode}</text>
        <text x="272" y="199" fill="#cbd5e1" font-size="10" font-family="JetBrains Mono, monospace">Soil: ${sl.pct !== null ? sl.pct.toFixed(1) + ' %' : 'WIRE/SHORT FAULT'}</text>

        <!-- Animated Wire 2 -> 3 -->
        <line x1="480" y1="125" x2="514" y2="125" stroke="${wireColor}" stroke-width="3" stroke-dasharray="${wireDash}">
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="0.9s" repeatCount="indefinite"/>
        </line>

        <!-- 3. ESP-NOW AES-128 Rural Mesh -->
        <rect x="514" y="24" width="192" height="202" rx="10" fill="url(#pidCardBg)" stroke="#00b8e6" stroke-width="1.5"/>
        <text x="528" y="48" fill="#00b8e6" font-size="11" font-weight="700" font-family="JetBrains Mono, monospace">${p.pidMesh}</text>
        <text x="528" y="76" fill="#f1f5f9" font-size="12" font-weight="700">📡 P2P MAC Star/Mesh</text>
        <text x="528" y="100" fill="#94a3b8" font-size="11" font-family="JetBrains Mono, monospace">0 Routers / 0 Sim Cards</text>
        <text x="528" y="122" fill="#6ee7b7" font-size="11" font-family="JetBrains Mono, monospace">Latency: 2.8 ms | AES-128</text>
        <text x="528" y="144" fill="#94a3b8" font-size="11" font-family="JetBrains Mono, monospace">4 Active Solar Nodes</text>
        <rect x="528" y="168" width="164" height="40" rx="6" fill="#080c12" stroke="rgba(0,184,230,0.35)"/>
        <text x="538" y="186" fill="#00b8e6" font-size="10" font-family="JetBrains Mono, monospace">NODE-01..04 SYNC OK</text>
        <text x="538" y="201" fill="#94a3b8" font-size="9.5" font-family="JetBrains Mono, monospace">RSSI -64 dBm • 13.4V Solar</text>

        <!-- Animated Wire 3 -> 4 -->
        <line x1="706" y1="125" x2="740" y2="125" stroke="#00b8e6" stroke-width="3" stroke-dasharray="8,4">
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="0.7s" repeatCount="indefinite"/>
        </line>

        <!-- 4. DIN-Rail ESP32 Gateway + Modbus -->
        <rect x="740" y="24" width="196" height="202" rx="10" fill="url(#pidCardBg)" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="754" y="48" fill="#38bdf8" font-size="11" font-weight="700" font-family="JetBrains Mono, monospace">${p.pidPlc}</text>
        <text x="754" y="76" fill="#f1f5f9" font-size="12" font-weight="700">🖧 ESP32 Open Gateway</text>
        <text x="754" y="100" fill="#cbd5e1" font-size="11" font-family="JetBrains Mono, monospace">Modbus TCP :502 (×100)</text>
        <text x="754" y="122" fill="#cbd5e1" font-size="11" font-family="JetBrains Mono, monospace">RS485 MAX485 Isolated</text>
        <text x="754" y="144" fill="#00b8e6" font-size="11" font-family="JetBrains Mono, monospace">NVS: ${snap.pumpHours.toFixed(1)}h | ${snap.irrigCycles} cyc</text>
        <rect x="754" y="168" width="168" height="40" rx="6" fill="#080c12" stroke="rgba(56,189,248,0.35)"/>
        <text x="764" y="186" fill="#f8fafc" font-size="10" font-family="JetBrains Mono, monospace">Reg 30001 = ${Math.round(sl.ma * 100)}</text>
        <text x="764" y="201" fill="#94a3b8" font-size="9.5" font-family="JetBrains Mono, monospace">Local Wi-Fi AP + WebSerial</text>

        <!-- Orbital Fusion Link 1 -> 4 -->
        <path d="M 114 24 L 114 8 L 838 8 L 838 24" fill="none" stroke="#38bdf8" stroke-width="1.6" stroke-dasharray="5,4"/>

        <!-- Animated Wire 4 -> 5 -->
        <line x1="936" y1="125" x2="968" y2="125" stroke="${actColor}" stroke-width="3.2" stroke-dasharray="7,4">
          <animate attributeName="stroke-dashoffset" from="22" to="0" dur="0.8s" repeatCount="indefinite"/>
        </line>

        <!-- 5. VFD Pump, Drip Manifold & NC Safety Interlock -->
        <rect x="968" y="24" width="178" height="202" rx="10" fill="url(#pidCardBg)" stroke="${actColor}" stroke-width="2"/>
        <text x="980" y="48" fill="${actColor}" font-size="10.5" font-weight="700" font-family="JetBrains Mono, monospace">${p.pidAct}</text>
        <text x="980" y="76" fill="#f1f5f9" font-size="12" font-weight="700">⚙️ VFD + Drip Valves</text>
        <text x="980" y="100" fill="#cbd5e1" font-size="11" font-family="JetBrains Mono, monospace">Header: ${snap.lineBar.toFixed(2)} bar</text>
        <text x="980" y="122" fill="#cbd5e1" font-size="11" font-family="JetBrains Mono, monospace">Coil 00001: ${snap.pumpActive ? '1 (ON)' : '0 (OFF)'}</text>
        <text x="980" y="144" fill="${snap.safetyRelayLocked ? '#fca5a5' : '#6ee7b7'}" font-size="11" font-family="JetBrains Mono, monospace">Coil 00002: ${snap.safetyRelayLocked ? '1 (LOCK)' : '0 (ARM)'}</text>
        <rect x="980" y="164" width="154" height="44" rx="6" fill="${snap.safetyRelayLocked ? 'rgba(239,68,68,0.22)' : (snap.pumpActive ? 'rgba(16,185,129,0.2)' : 'rgba(56,189,248,0.12)')}" stroke="${actColor}"/>
        <text x="988" y="190" fill="#ffffff" font-size="9.5" font-weight="700" font-family="JetBrains Mono, monospace">${actStateText}</text>
      </svg>
    `;
  }

  clearSectionHighlights() {
    document.querySelectorAll('.demo-spotlight').forEach(el => el.classList.remove('demo-spotlight'));
  }

  highlightSection(id) {
    this.clearSectionHighlights();
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('demo-spotlight');
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  toggleAutoDemo() {
    const banner = document.getElementById('autoDemoBanner');
    if (this.demoActive) {
      this.demoActive = false;
      this.demoPaused = false;
      this.stopAllSpeechImmediately();
      this.clearSectionHighlights();
      if (banner) banner.style.display = 'none';
      this.applyProTranslations();
      return;
    }

    this.demoActive = true;
    this.demoPaused = false;
    this.demoStep = 0;
    this.audioEnabled = true;
    if (banner) banner.style.display = 'flex';
    this.applyProTranslations();
    this.executeDemoStep(0);
  }

  pauseOrResumeDemo() {
    if (!this.demoActive) return;
    this.demoPaused = !this.demoPaused;
    this.applyProTranslations();
    if (this.demoPaused) {
      this.stopAllSpeechImmediately();
    } else {
      this.executeDemoStep(this.demoStep);
    }
  }

  stepDemoDelta(delta) {
    if (!this.demoActive) return;
    this.demoPaused = false;
    this.applyProTranslations();
    const next = (this.demoStep + delta + 6) % 6;
    this.executeDemoStep(next);
  }

  silenceVoiceNow() {
    this.stopAllSpeechImmediately();
  }

  executeDemoStep(idx) {
    if (!this.demoActive) return;
    this.demoStep = idx % 6;

    const lang = this.getLang();
    const p = PRO_I18N[lang] || PRO_I18N.en;
    const msgEl = document.getElementById('autoDemoMsg');
    const slider = document.getElementById('loopCurrentSlider');

    if (msgEl) {
      msgEl.innerHTML = `<span class="badge badge-cyan">${p.demoStepPrefix}</span> <strong>${p.demoMsgs[this.demoStep]}</strong>`;
    }

    if (this.demoStep === 0) {
      this.highlightSection('sectionOrbital');
    } else if (this.demoStep === 1) {
      this.highlightSection('sectionPhenology');
    } else if (this.demoStep === 2) {
      this.farmHa = 120;
      const haSlider = document.getElementById('roiHaSlider');
      const haInput = document.getElementById('roiHaInput');
      if (haSlider) haSlider.value = 120;
      if (haInput) haInput.value = 120;
      this.renderRoiCalculator();
      this.highlightSection('sectionRoi');
    } else if (this.demoStep === 3) {
      this.highlightSection('sectionScada');
      if (slider) slider.value = 6.80;
      window.inannaScada.safetyRelayLocked = false;
      window.inannaScada.setLoopCurrent(6.80);
      if (typeof window.renderScadaPanel === 'function') window.renderScadaPanel();
      this.renderPidBlueprint();
    } else if (this.demoStep === 4) {
      this.playTone('alarm');
      this.highlightSection('sectionScada');
      if (slider) slider.value = 1.20;
      window.inannaScada.setLoopCurrent(1.20);
      if (typeof window.renderScadaPanel === 'function') window.renderScadaPanel();
      this.renderPidBlueprint();
    } else if (this.demoStep === 5) {
      this.playTone('ok');
      this.highlightSection('sectionScada');
      if (slider) slider.value = 12.00;
      window.inannaScada.setLoopCurrent(12.00);
      window.inannaScada.acknowledgeAlarm();
      if (typeof window.renderScadaPanel === 'function') window.renderScadaPanel();
      this.renderPidBlueprint();
    }

    this.speakInannaStep(this.demoStep, () => {
      if (!this.demoActive || this.demoPaused) return;
      if (this.demoStep < 5) {
        this.executeDemoStep(this.demoStep + 1);
      } else {
        // Tour finished cleanly after Act 6! Leave banner visible for 3s then close gently
        this.advanceTimeout = setTimeout(() => {
          if (this.demoActive && !this.demoPaused) this.toggleAutoDemo();
        }, 3200);
      }
    });
  }
}

window.inannaProSuite = new InannaProSuite();
