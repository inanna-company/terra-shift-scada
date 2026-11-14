/**
 * TERRA-SHIFT SCADA — INANNA Pro Engineering, Phenology, ROI & Live Demo Suite
 * Engineered by Fabio Maximiliano Medina Rojas (Técnico Superior en Mecatrónica) & Team INANNA COMPANY
 * Divisions: AUTOMATION INANNA • AI INANNA • INDUSTRIES INANNA • LABS INANNA
 * Trilingual Support: English (EN) | Español (ES) | Português (PT)
 */

const PRO_I18N = {
  en: {
    navPhenology: '3. 12-Mo Calendar',
    navRoi: '4. Farm ROI & Water',
    navScadaNew: '5. Ground IIoT SCADA',
    navHub: '🚀 INANNA Hub & Pitch',
    btnAutoDemoStart: '▶ Auto-Demo Jury Tour',
    btnAutoDemoStop: '⏹ Stop Demo Tour',
    demoStepPrefix: 'LIVE JURY TOUR',
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
    roiTitle: 'Farm-Scale Water, VFD Energy, Carbon & Payback Calculator',
    roiSub: 'Quantifies agronomic crop-shift revenue + INANNA 4–20 mA closed-loop drip & VFD affinity-law savings',
    roiHaLbl: 'Farm Area (Hectares)',
    roiPumpLbl: 'Irrigation Pump Power (HP)',
    roiKwhLbl: 'Electricity Cost (USD/kWh)',
    roiKpiWater: 'Annual Water Saved',
    roiKpiWaterSub: 'vs. open-loop / timer irrigation',
    roiKpiEnergy: 'VFD Pump Energy Saved',
    roiKpiEnergySub: 'Affinity Laws (P ∝ N³) + Modbus',
    roiKpiCo2: 'Carbon Avoided',
    roiKpiCo2Sub: 'Pumping + soil moisture conservation',
    roiKpiRev: 'Annual Net Margin Gain',
    roiKpiRevSub: 'Top resilient crop + water/kWh savings',
    roiKpiKit: 'Recommended INANNA Kit',
    roiKpiPayback: 'Estimated Hardware Payback',
    roiMonthsUnit: 'months',
    roiPoolsEq: 'Olympic pools/yr',
    roiBomGateway: '1× DIN-Rail ESP32 Gateway (Modbus/AP)',
    roiBomNodes: 'Solar ESP-NOW 4–20 mA Nodes',
    pidTitle: 'Interactive Mechatronic P&ID & 4–20 mA Kirchhoff Architecture Blueprint',
    pidSub: 'Live hardware state synchronized with the 4–20 mA NAMUR NE43 simulator above — test wire cuts & shorts!',
    pidBadge: 'MECHATRONICS BLUEPRINT • IEC / NAMUR NE43',
    pidOrbital: '1. NASA ORBITAL LAYER',
    pidLoop: '2. 24V DC 4–20 mA LOOP',
    pidMesh: '3. ESP-NOW AES-128 MESH',
    pidPlc: '4. GATEWAY & MODBUS',
    pidAct: '5. VFD PUMP & SAFETY RELAY',
    soundOn: '🔔 SCADA Audio: ON',
    soundOff: '🔕 SCADA Audio: MUTE',
    demoMsgs: [
      'Step 1/5 — Querying NASA POWER 20-year record & projecting 2050 CMIP6 climate shift for Santa Rosa de Calamuchita...',
      'Step 2/5 — Evaluating 10 crops & 12-month phenology: High-Altitude Malbec, Olive & Sorghum outperform stressed rainfed Maize.',
      'Step 3/5 — Ground Probe NODE-01 detects dry root zone (6.80 mA = 17.5%) + NASA GWETROOT confirms deficit → VFD Drip Valve OPEN!',
      'Step 4/5 — CRITICAL TEST: Simulating rodent-cut sensor wire (1.20 mA < 3.6 mA NAMUR NE43)! Safety Relay LOCKS pump & switches to NASA SMAP backup!',
      'Step 5/5 — Technician repairs wire (12.00 mA = 50.0% Healthy) & sends SCADA Alarm ACK → System ARMED & saving 38% water!'
    ]
  },
  es: {
    navPhenology: '3. Calendario 12M',
    navRoi: '4. ROI, Agua y Energía',
    navScadaNew: '5. SCADA Rural IIoT',
    navHub: '🚀 Ecosistema INANNA y Pitch',
    btnAutoDemoStart: '▶ Demo Guiada Jurado',
    btnAutoDemoStop: '⏹ Detener Demo',
    demoStepPrefix: 'TOUR EN VIVO PARA JURADO',
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
    roiTitle: 'Calculadora de Impacto por Hectárea: Agua, Energía VFD, Huella CO₂ y Retorno (ROI)',
    roiSub: 'Cuantifica ganancia por reconversión agrícola + ahorro hídrico por lazo 4–20 mA y leyes de afinidad en bombas VFD',
    roiHaLbl: 'Superficie del Campo (ha)',
    roiPumpLbl: 'Potencia Bomba de Riego (HP)',
    roiKwhLbl: 'Costo Eléctrico Rural (USD/kWh)',
    roiKpiWater: 'Agua Anual Ahorrada',
    roiKpiWaterSub: 'vs. riego por tiempo / lazo abierto',
    roiKpiEnergy: 'Energía Bomba VFD Ahorrada',
    roiKpiEnergySub: 'Leyes de Afinidad (P ∝ N³) + Modbus',
    roiKpiCo2: 'Emisiones CO₂ Evitadas',
    roiKpiCo2Sub: 'Bombeo eficiente + retención edáfica',
    roiKpiRev: 'Mejora de Margen Anual',
    roiKpiRevSub: 'Cultivo resiliente líder + ahorro agua/kWh',
    roiKpiKit: 'Kit Industrial INANNA Sugerido',
    roiKpiPayback: ' Amortización Estimada Hardware',
    roiMonthsUnit: 'meses',
    roiPoolsEq: 'piletas olímpicas/año',
    roiBomGateway: '1× Gateway Riel DIN ESP32 (Modbus/AP)',
    roiBomNodes: 'Nodos Solares ESP-NOW 4–20 mA',
    pidTitle: 'Plano Mecatrónico P&ID Interactivo y Arquitectura Ley de Kirchhoff 4–20 mA',
    pidSub: 'Sincronizado en tiempo real con el simulador 4–20 mA NAMUR NE43 — ¡probá simular cable cortado o cortocircuito!',
    pidBadge: 'INGENIERÍA MECATRÓNICA • IEC / NAMUR NE43',
    pidOrbital: '1. CAPA ORBITAL NASA',
    pidLoop: '2. LAZO 24V DC 4–20 mA',
    pidMesh: '3. MALLA ESP-NOW AES-128',
    pidPlc: '4. GATEWAY Y MODBUS',
    pidAct: '5. BOMBA VFD Y RELÉ SEGURO',
    soundOn: '🔔 Audio SCADA: ACTIVO',
    soundOff: '🔕 Audio SCADA: SILENCIO',
    demoMsgs: [
      'Paso 1/5 — Consultando 20 años reales de NASA POWER y proyectando cambio climático CMIP6 2050 en Santa Rosa de Calamuchita...',
      'Paso 2/5 — Evaluando 10 cultivos y fenología 12 meses: Vid Serrana, Olivo y Sorgo superan ampliamente al Maíz tradicional en estrés.',
      'Paso 3/5 — Sonda NODE-01 detecta raíz seca (6.80 mA = 17.5%) + NASA GWETROOT confirma déficit → ¡Bomba VFD y Riego por Goteo ACTIVOS!',
      'Paso 4/5 — PRUEBA CRÍTICA: ¡Roedor corta el cable en el campo (1.20 mA < 3.6 mA NAMUR NE43)! Relé Seguro BLOQUEA la bomba y pasa a respaldo NASA SMAP!',
      'Paso 5/5 — Técnico repara el par trenzado (12.00 mA = 50.0% Sano) y ejecuta SCADA Alarm ACK → ¡Sistema ARMADO ahorrando 38% de agua!'
    ]
  },
  pt: {
    navPhenology: '3. Calendário 12M',
    navRoi: '4. ROI, Água e Energia',
    navScadaNew: '5. SCADA Rural IIoT',
    navHub: '🚀 Ecossistema INANNA e Pitch',
    btnAutoDemoStart: '▶ Demo Guiada Júri',
    btnAutoDemoStop: '⏹ Parar Demo',
    demoStepPrefix: 'TOUR AO VIVO PARA O JÚRI',
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
    roiTitle: 'Calculadora de Impacto da Fazenda: Água, Energia VFD, CO₂ e Payback (ROI)',
    roiSub: 'Quantifica ganho de transição agrícola + economia hídrica em malha fechada 4–20 mA e leis de afinidade VFD',
    roiHaLbl: 'Área da Fazenda (ha)',
    roiPumpLbl: 'Potência da Bomba (HP)',
    roiKwhLbl: 'Tarifa Elétrica (USD/kWh)',
    roiKpiWater: 'Água Economizada / Ano',
    roiKpiWaterSub: 'vs. irrigação aberta / temporizador',
    roiKpiEnergy: 'Energia VFD Economizada',
    roiKpiEnergySub: 'Leis de Afinidade (P ∝ N³) + Modbus',
    roiKpiCo2: 'Carbono Evitado',
    roiKpiCo2Sub: 'Bombeamento eficiente + solo úmido',
    roiKpiRev: 'Ganho Líquido Anual',
    roiKpiRevSub: 'Cultura resiliente líder + economia água/kWh',
    roiKpiKit: 'Kit Industrial INANNA Sugerido',
    roiKpiPayback: 'Payback Estimado do Hardware',
    roiMonthsUnit: 'meses',
    roiPoolsEq: 'piscinas olímpicas/ano',
    roiBomGateway: '1× Gateway Trilho DIN ESP32 (Modbus/AP)',
    roiBomNodes: 'Nós Solares ESP-NOW 4–20 mA',
    pidTitle: 'Diagrama Mecatrônico P&ID Interativo e Arquitetura Lei de Kirchhoff 4–20 mA',
    pidSub: 'Sincronizado em tempo real com o simulador 4–20 mA NAMUR NE43 — teste cabo rompido e curto-circuito!',
    pidBadge: 'ENGENHARIA MECATRÔNICA • IEC / NAMUR NE43',
    pidOrbital: '1. CAMADA ORBITAL NASA',
    pidLoop: '2. LAÇO 24V DC 4–20 mA',
    pidMesh: '3. REDE ESP-NOW AES-128',
    pidPlc: '4. GATEWAY E MODBUS',
    pidAct: '5. BOMBA VFD E RELÉ SEGURO',
    soundOn: '🔔 Áudio SCADA: ATIVO',
    soundOff: '🔕 Áudio SCADA: MUDO',
    demoMsgs: [
      'Passo 1/5 — Consultando série histórica de 20 anos da NASA POWER e projetando cenário CMIP6 2050 para Santa Rosa de Calamuchita...',
      'Passo 2/5 — Avaliando 10 culturas e fenologia de 12 meses: Videira Serrana, Oliveira e Sorgo superam o Milho em sequeiro.',
      'Passo 3/5 — Sonda NODE-01 detecta raiz seca (6.80 mA = 17.5%) + NASA GWETROOT confirma déficit → Bomba VFD e Gotejamento ATIVOS!',
      'Passo 4/5 — TESTE CRÍTICO: Cabo cortado no campo (1.20 mA < 3.6 mA NAMUR NE43)! Relé Seguro TRAVA a bomba e ativa backup orbital NASA SMAP!',
      'Passo 5/5 — Técnico repara o cabo (12.00 mA = 50.0% Íntegro) e confirma SCADA Alarm ACK → Sistema ARMADO economizando 38% de água!'
    ]
  }
};

// Southern Hemisphere (Argentina) baseline phenology stage per month (0=Jan..11=Dec); automatically shifted +6 months when lat >= 0
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

// Monthly Kc evapotranspiration profile per stage
const STAGE_KC = {
  dorm: 0.25,
  sow:  0.45,
  veg:  0.78,
  flo:  1.15,
  fill: 0.95,
  harv: 0.50
};

class InannaProSuite {
  constructor() {
    this.phenChart = null;
    this.selectedCropId = null; // null = follow Top #1 crop until user overrides
    this.farmHa = 45;
    this.pumpHp = 15;
    this.kwhCost = 0.14;
    this.audioEnabled = true;
    this.audioCtx = null;
    this.demoTimer = null;
    this.demoStep = 0;
  }

  getLang() {
    return (window.APP_STATE && window.APP_STATE.lang) || 'en';
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
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'ok') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.setValueAtTime(880, now + 0.1);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
        osc.start(now);
        osc.stop(now + 0.27);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(740, now);
        gain.gain.setValueAtTime(0.045, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.start(now);
        osc.stop(now + 0.15);
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
        this.kwhCost = Math.max(0.02, Math.min(1.5, Number(e.target.value) || 0.14));
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
      navHub: p.navHub,
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
      pidBadge: p.pidBadge
    };

    for (const [id, text] of Object.entries(map)) {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    }

    const hubLink = document.getElementById('navHub');
    if (hubLink) hubLink.href = `inanna.html?lang=${lang}`;

    const btnDemo = document.getElementById('btnAutoDemo');
    if (btnDemo) {
      btnDemo.textContent = this.demoTimer ? p.btnAutoDemoStop : p.btnAutoDemoStart;
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

    // Hargreaves-inspired monthly crop water demand scaled to crop.waterReqMm
    const rawWeights = stages12.map((st, m) => STAGE_KC[st] * Math.max(0.35, (mTemps[m] + 5) / 22));
    const sumW = rawWeights.reduce((a, b) => a + b, 0) || 1;
    const mEtc = rawWeights.map(w => Math.round((w / sumW) * crop.waterReqMm));

    // Render 12-Month Visual Phenology Strip
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

    // Render Chart.js 12-Month Hydro-Thermal Balance
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
    // Closed-loop 4-20mA + NASA GWETROOT saves ~38% vs conventional flood/timer irrigation
    const baseOpenLoopM3Ha = Math.max(1450, Math.round(topCrop.irrigationM3Ha / 0.62));
    const savedM3PerHa = Math.max(520, baseOpenLoopM3Ha - topCrop.irrigationM3Ha);
    const totalWaterSavedM3 = Math.round(savedM3PerHa * ha);
    const olympicPools = (totalWaterSavedM3 / 2500).toFixed(1);

    // Pump Affinity Laws (P2/P1 = (N2/N1)^3): VFD speed modulation saves ~34% electrical kWh
    const pumpKw = this.pumpHp * 0.7457;
    const annualPumpHours = Math.min(2600, Math.max(380, Math.round(290 + ha * 7.5)));
    const kwhSaved = Math.round(pumpKw * annualPumpHours * 0.34);
    const energyUsdSaved = Math.round(kwhSaved * this.kwhCost);

    // Carbon avoided: 0.42 kg CO2/kWh pumping + 0.18 tCO2e/ha regenerative soil moisture retention
    const co2Tons = ((kwhSaved * 0.00042) + (ha * 0.18)).toFixed(1);

    // Agronomic net margin delta (conservative 35% of gross revenue uplift + utility savings)
    const revDeltaHa = Math.max(240, (topCrop.projectedRevUsdHa - maizeBase.projectedRevUsdHa) * 0.35);
    const annualNetGainUsd = Math.round(revDeltaHa * ha + energyUsdSaved + totalWaterSavedM3 * 0.035);

    // Hardware BOM sizing: 1 DIN-Rail Gateway + 1 Solar 4-20 mA ESP-NOW Node per 15 ha (min 2 nodes)
    const nodeCount = Math.max(2, Math.min(64, Math.ceil(ha / 15)));
    const kitCapexUsd = 390 + nodeCount * 165; // Turnkey accessible Argentine engineering pricing
    const paybackMonths = Math.max(1.5, Math.min(28, (kitCapexUsd / Math.max(1, annualNetGainUsd / 12)))).toFixed(1);

    const setEl = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setEl('roiValWater', `${totalWaterSavedM3.toLocaleString()} m³`);
    setEl('roiSubWaterDyn', `≈ ${olympicPools} ${p.roiPoolsEq}`);
    setEl('roiValEnergy', `${kwhSaved.toLocaleString()} kWh`);
    setEl('roiSubEnergyDyn', `+$${energyUsdSaved.toLocaleString()} USD/yr VFD`);
    setEl('roiValCo2', `${co2Tons} tCO₂e`);
    setEl('roiValRev', `+$${annualNetGainUsd.toLocaleString()} USD`);
    setEl('roiValKit', `${nodeCount}× ESP-NOW + 1× GW`);
    setEl('roiSubKitDyn', `${p.roiBomGateway} + ${nodeCount} ${p.roiBomNodes} (~$${kitCapexUsd.toLocaleString()} USD)`);
    setEl('roiValPayback', `${paybackMonths} ${p.roiMonthsUnit}`);
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
      <svg viewBox="0 0 1160 250" width="100%" height="auto" role="img" aria-label="INANNA Mechatronic P&ID Architecture">
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
        <text x="754" y="76" fill="#f1f5f9" font-size="12" font-weight="700">🖧 ESP32 DIN Gateway</text>
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

  toggleAutoDemo() {
    const banner = document.getElementById('autoDemoBanner');
    if (this.demoTimer) {
      clearInterval(this.demoTimer);
      this.demoTimer = null;
      if (banner) banner.style.display = 'none';
      this.applyProTranslations();
      return;
    }

    this.demoStep = 0;
    if (banner) banner.style.display = 'flex';
    this.applyProTranslations();
    this.runDemoStep();
    this.demoTimer = setInterval(() => this.runDemoStep(), 4800);
  }

  runDemoStep() {
    const lang = this.getLang();
    const p = PRO_I18N[lang] || PRO_I18N.en;
    const msgEl = document.getElementById('autoDemoMsg');
    const slider = document.getElementById('loopCurrentSlider');

    const stepIdx = this.demoStep % 5;
    if (msgEl) {
      msgEl.innerHTML = `<span class="badge badge-cyan">${p.demoStepPrefix}</span> <strong>${p.demoMsgs[stepIdx]}</strong>`;
    }

    if (stepIdx === 0) {
      this.playTone('beep');
      document.getElementById('sectionOrbital')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (stepIdx === 1) {
      this.playTone('beep');
      document.getElementById('sectionPhenology')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (stepIdx === 2) {
      this.playTone('ok');
      document.getElementById('sectionScada')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (slider) slider.value = 6.80;
      window.inannaScada.safetyRelayLocked = false;
      window.inannaScada.setLoopCurrent(6.80);
      if (typeof window.renderScadaPanel === 'function') window.renderScadaPanel();
      this.renderPidBlueprint();
    } else if (stepIdx === 3) {
      this.playTone('alarm');
      if (slider) slider.value = 1.20;
      window.inannaScada.setLoopCurrent(1.20);
      if (typeof window.renderScadaPanel === 'function') window.renderScadaPanel();
      this.renderPidBlueprint();
    } else if (stepIdx === 4) {
      this.playTone('ok');
      if (slider) slider.value = 12.00;
      window.inannaScada.setLoopCurrent(12.00);
      window.inannaScada.acknowledgeAlarm();
      if (typeof window.renderScadaPanel === 'function') window.renderScadaPanel();
      this.renderPidBlueprint();
    }

    this.demoStep++;
  }
}

window.inannaProSuite = new InannaProSuite();
