/**
 * TERRA-SHIFT SCADA — Main Interactive Controller
 * Team INANNA COMPANY — Santa Rosa de Calamuchita, Córdoba, Argentina
 * 2026 NASA Space Apps Challenge ("Field Shift: Adapting Farms with NASA Data")
 */

const I18N = {
  en: {
    subtitle: 'Orbital-to-Root Agricultural Adaptation & Rural IIoT SCADA • <strong>INANNA COMPANY</strong>',
    navOrbital: '1. Orbital Telemetry',
    navShift: '2. Crop Shift Matrix',
    navScada: '3. Ground IIoT SCADA',
    navSlides: '7-Slide Demo Deck',
    btnPrint: 'Export PDF Plan',
    heroBadge: '2026 NASA SPACE APPS CHALLENGE • FIELD SHIFT',
    heroTitle: 'Bridging Planetary NASA Earth Observations with Routerless Rural Automation',
    heroDesc: 'Click any farm coordinate on Earth or select a preset agro-zone. TERRA-SHIFT queries live 20-year NASA POWER & GIBS satellite telemetry, projects 2035–2050 CMIP6 crop suitability shifts, and cross-validates orbital soil moisture against industrial 4–20 mA (NAMUR NE43) ESP-NOW field probes.',
    lblPreset: 'Agro-Ecological Preset',
    lblHorizon: 'Projection Horizon',
    lblScenario: 'CMIP6 Climate Pathway',
    lblMgmt: 'On-Farm Water Strategy',
    kpiTemp: 'Mean Temp (Projected)',
    kpiHeat: 'Extreme Canopy Peak',
    kpiPrec: 'Annual Precipitation',
    kpiGwet: 'NASA Root-Zone Wetness',
    kpiTopCrop: 'Top Resilient Crop',
    kpiWaterSave: 'IIoT Drip Demand',
    mapTitle: 'Live NASA GIBS Orbital Imagery & GPS Inspector (Click Any Farm)',
    chartClimateTitle: '20-Year NASA POWER Historical Record & CMIP6 Trajectory',
    chartShiftTitle: 'Crop Suitability Shift: 2005 Historical vs. Target Horizon (%)',
    matrixTitle: 'Agronomic Crop Suitability & Transition Roadmap',
    matrixSub: 'Ranked dynamically from NASA thermal, frost, radiation, and root-zone moisture envelopes',
    scadaTitle: 'INANNA Industrial Ground-Truth & Irrigation SCADA (Offline-First Rural Architecture)',
    scadaSub: '4–20 mA Current Loop (NAMUR NE43) + AES-128 ESP-NOW Rural Mesh + Modbus RTU/TCP Gateway'
  },
  es: {
    subtitle: 'Adaptación Climática Agrícola Orbital-a-Raíz y SCADA Rural IIoT • <strong>INANNA COMPANY</strong>',
    navOrbital: '1. Telemetría Orbital',
    navShift: '2. Matriz de Cultivos',
    navScada: '3. SCADA Rural IIoT',
    navSlides: 'Presentación 7 Slides',
    btnPrint: 'Exportar Plan PDF',
    heroBadge: 'NASA SPACE APPS CHALLENGE 2026 • SEDE SANTA ROSA DE CALAMUCHITA',
    heroTitle: 'Uniendo Observación Terrestre de la NASA con Automatización Industrial Rural sin Internet',
    heroDesc: 'Tocá cualquier coordenada agrícola en el mapa o elegí una zona precargada. TERRA-SHIFT consulta 20 años reales de NASA POWER y capas satelitales GIBS, proyecta el cambio de aptitud de cultivos al 2035–2050 (CMIP6) y fusiona la humedad orbital con sondas industriales 4–20 mA (NAMUR NE43) por red ESP-NOW.',
    lblPreset: 'Zona Agroecológica',
    lblHorizon: 'Horizonte Temporal',
    lblScenario: 'Escenario Climático CMIP6',
    lblMgmt: 'Manejo Hídrico en Lote',
    kpiTemp: 'Temp. Media (Proyectada)',
    kpiHeat: 'Pico Térmico Extremo',
    kpiPrec: 'Precipitación Anual',
    kpiGwet: 'Humedad Radicular NASA',
    kpiTopCrop: 'Cultivo Líder Recomendado',
    kpiWaterSave: 'Demanda Riego IIoT',
    mapTitle: 'Capas Satelitales NASA GIBS en Vivo e Inspector GPS (Clic en cualquier lote)',
    chartClimateTitle: 'Serie Histórica Real NASA POWER (20 años) y Proyección CMIP6',
    chartShiftTitle: 'Cambio de Aptitud Agrícola: Base 2005 vs. Horizonte Objetivo (%)',
    matrixTitle: 'Matriz de Transición de Cultivos y Prescripción Agronómica',
    matrixSub: 'Ranking dinámico calculado con envolventes térmicas, heladas, radiación y humedad radicular NASA',
    scadaTitle: 'Consola Industrial SCADA de Campo — AUTOMATION & INDUSTRIES INANNA',
    scadaSub: 'Lazo de Corriente 4–20 mA (NAMUR NE43) + Red Rural ESP-NOW sin Router + Gateway Modbus RTU/TCP'
  }
};

const APP_STATE = {
  lang: 'en',
  preset: 'calamuchita',
  lat: -32.069,
  lon: -64.536,
  horizon: 2050,
  scenario: 'ssp245',
  management: 'drip_iiot',
  nasaData: null,
  activeGibsLayer: 'ndvi'
};

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

function initMap() {
  mapInstance = L.map('orbitalMap', {
    center: [APP_STATE.lat, APP_STATE.lon],
    zoom: 7,
    minZoom: 2,
    maxZoom: 15
  });

  // Clean dark base layer + crisp borders/labels
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
  const statusBadge = document.getElementById('apiStatusBadge');
  statusBadge.textContent = APP_STATE.lang === 'en' ? 'QUERYING NASA POWER...' : 'CONSULTANDO NASA POWER...';
  statusBadge.className = 'badge badge-warn';

  const presetArg = APP_STATE.preset !== 'custom' ? APP_STATE.preset : null;
  const data = await window.nasaOrbitalService.fetchLocationData(APP_STATE.lat, APP_STATE.lon, presetArg);
  APP_STATE.nasaData = data;

  const isLive = data.source === 'LIVE_NASA_POWER_API';
  statusBadge.textContent = isLive
    ? 'LIVE NASA POWER API (200 OK)'
    : 'CALIBRATED NASA OFFLINE CACHE';
  statusBadge.className = isLive ? 'badge badge-green' : 'badge badge-cyan';

  // Sync projected root-zone soil wetness into INANNA SCADA engine
  const proj = window.nasaOrbitalService.projectClimate(data, APP_STATE.horizon, APP_STATE.scenario);
  window.inannaScada.nasaGwet = proj.gwet;

  renderAll();
}

function renderAll() {
  if (!APP_STATE.nasaData) return;
  applyTranslations();

  const data = APP_STATE.nasaData;
  const hist = data.baselines.historical2005;
  const proj = window.nasaOrbitalService.projectClimate(data, APP_STATE.horizon, APP_STATE.scenario);
  const crops = window.cropSuitabilityEngine.evaluateAll(data, APP_STATE.horizon, APP_STATE.scenario, APP_STATE.management);

  // Map overlay coordinates
  document.getElementById('mapCoordsOverlay').textContent =
    `LAT ${APP_STATE.lat.toFixed(3)}° | LON ${APP_STATE.lon.toFixed(3)}° | ELEV ~${data.elevM}m | SOLAR ${proj.solar} MJ/m²/d`;

  // KPIs
  const dTemp = (proj.t2m - hist.t2m).toFixed(2);
  document.getElementById('kpiTempVal').textContent = `${proj.t2m.toFixed(1)} °C`;
  document.getElementById('kpiTempDelta').textContent = `${dTemp >= 0 ? '+' : ''}${dTemp} °C vs 2005 (${data.trends.tempSlopeDecade >= 0 ? '+' : ''}${data.trends.tempSlopeDecade}°C/dec)`;

  document.getElementById('kpiHeatVal').textContent = `${proj.tMax.toFixed(1)} °C`;
  document.getElementById('kpiHeatDelta').textContent = `Min Frost: ${proj.tMin.toFixed(1)} °C`;

  const dPrec = proj.precMm - hist.precMm;
  document.getElementById('kpiPrecVal').textContent = `${proj.precMm} mm/yr`;
  document.getElementById('kpiPrecDelta').textContent = `${dPrec >= 0 ? '+' : ''}${dPrec} mm vs 2005`;

  document.getElementById('kpiGwetVal').textContent = `${(proj.gwet * 100).toFixed(1)} %`;
  document.getElementById('kpiGwetDelta').textContent = `SMAP / GLDAS GWETROOT`;

  const topCrop = crops[0];
  document.getElementById('kpiTopCropVal').textContent =
    (APP_STATE.lang === 'en' ? topCrop.nameEn : topCrop.nameEs).split('(')[0].trim();
  document.getElementById('kpiTopCropDelta').textContent =
    `Suitability: ${topCrop.scoreTarget}% (${topCrop.deltaVsHist >= 0 ? '+' : ''}${topCrop.deltaVsHist}% shift)`;

  document.getElementById('kpiWaterVal').textContent =
    APP_STATE.management === 'drip_iiot' ? `${topCrop.irrigationM3Ha} m³/ha` : (APP_STATE.lang === 'en' ? '0 (Rainfed)' : '0 (Secano)');
  document.getElementById('kpiWaterDelta').textContent =
    APP_STATE.management === 'drip_iiot' ? 'Closed-loop 4–20 mA + SMAP' : 'Switch to Precision Drip to boost yield';

  renderCharts(data, proj, crops);
  renderCropCards(crops);
  renderScadaPanel();
}

function renderCharts(data, proj, crops) {
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
          label: APP_STATE.lang === 'en' ? 'Mean Temp T2M (°C)' : 'Temp. Media T2M (°C)',
          data: tempSeries,
          borderColor: '#00b8e6',
          backgroundColor: 'rgba(0, 184, 230, 0.18)',
          borderWidth: 2.4,
          tension: 0.3,
          yAxisID: 'yTemp'
        },
        {
          type: 'bar',
          label: APP_STATE.lang === 'en' ? 'Precipitation (mm/yr)' : 'Precipitación (mm/año)',
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
      plugins: {
        legend: { labels: { color: '#cbd5e1', font: { size: 11 } } }
      },
      scales: {
        x: { ticks: { color: '#94a3b8', maxRotation: 45, font: { size: 10 } }, grid: { color: 'rgba(148,163,184,0.08)' } },
        yTemp: {
          position: 'left',
          ticks: { color: '#00b8e6', font: { size: 10 } },
          grid: { color: 'rgba(148,163,184,0.1)' }
        },
        yPrec: {
          position: 'right',
          ticks: { color: '#93c5fd', font: { size: 10 } },
          grid: { drawOnChartArea: false }
        }
      }
    }
  });

  // Chart 2: Crop Suitability Shift (2005 vs Target Horizon)
  const ctx2 = document.getElementById('cropShiftChart').getContext('2d');
  const top8 = crops.slice(0, 8);
  if (shiftChart) shiftChart.destroy();
  shiftChart = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: top8.map(c => (APP_STATE.lang === 'en' ? c.nameEn : c.nameEs).split('(')[0].trim()),
      datasets: [
        {
          label: APP_STATE.lang === 'en' ? '2005 Historical Rainfed' : 'Base Histórica 2005',
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
      plugins: {
        legend: { labels: { color: '#cbd5e1', font: { size: 11 } } }
      },
      scales: {
        x: { ticks: { color: '#cbd5e1', font: { size: 10 } }, grid: { display: false } },
        y: { min: 0, max: 100, ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { color: 'rgba(148,163,184,0.1)' } }
      }
    }
  });
}

function renderCropCards(crops) {
  const grid = document.getElementById('cropMatrixGrid');
  const isEn = APP_STATE.lang === 'en';

  grid.innerHTML = crops.map((c, idx) => {
    const badgeClass = c.scoreTarget >= 74 ? 'badge-green' : (c.scoreTarget >= 54 ? 'badge-warn' : 'badge-crit');
    const badgeText = c.scoreTarget >= 74
      ? (isEn ? 'VIABLE / RECOMMENDED' : 'ALTA VIABILIDAD')
      : (c.scoreTarget >= 54 ? (isEn ? 'ADAPTATION REQUIRED' : 'REQUIERE MANEJO') : (isEn ? 'HIGH CLIMATE RISK' : 'ALTO RIESGO CLIMÁTICO'));
    const cardClass = idx < 3 && c.scoreTarget >= 74 ? 'crop-card recommended' : (c.deltaVsHist < -8 ? 'crop-card declining' : 'crop-card');
    const barColor = c.scoreTarget >= 74 ? '#10b981' : (c.scoreTarget >= 54 ? '#f59e0b' : '#ef4444');
    const deltaSign = c.deltaVsHist >= 0 ? `+${c.deltaVsHist}%` : `${c.deltaVsHist}%`;

    return `
      <article class="${cardClass}">
        <div class="crop-top">
          <div>
            <div class="crop-name">#${idx + 1} ${isEn ? c.nameEn : c.nameEs}</div>
            <div class="crop-sci">${c.sci} • Water req: ${c.waterReqMm} mm</div>
          </div>
          <span class="badge ${badgeClass}">${badgeText}</span>
        </div>
        <div class="score-bars">
          <div class="score-row">
            <span>2005 Base</span>
            <div class="bar-track"><div class="bar-fill" style="width:${c.score2005}%;background:#64748b;"></div></div>
            <span>${c.score2005}%</span>
          </div>
          <div class="score-row">
            <span><strong>${APP_STATE.horizon} Proj</strong></span>
            <div class="bar-track"><div class="bar-fill" style="width:${c.scoreTarget}%;background:${barColor};"></div></div>
            <span><strong>${c.scoreTarget}%</strong></span>
          </div>
        </div>
        <div class="crop-meta">
          <span>Shift: <strong>${deltaSign}</strong></span>
          <span>Irrig: <strong>${c.irrigationM3Ha} m³/ha</strong></span>
          <span>Est. Gross: <strong>$${c.projectedRevUsdHa}/ha</strong></span>
        </div>
        <div class="crop-advice">${isEn ? c.adviceEn : c.adviceEs}</div>
      </article>
    `;
  }).join('');
}

function renderScadaPanel() {
  const snap = window.inannaScada.getTelemetrySnapshot();
  const isEn = APP_STATE.lang === 'en';
  const sl = snap.soilLoop;

  // Readouts
  document.getElementById('valLoopMa').textContent = `${sl.ma.toFixed(2)} mA`;
  document.getElementById('valKirchhoffV').textContent = `${sl.vSense.toFixed(3)} V`;
  document.getElementById('valAdsCounts').textContent = `${sl.adcCounts} cts`;
  document.getElementById('valLoopPct').textContent = sl.pct !== null ? `${sl.pct.toFixed(1)} %` : 'FAULT!';

  const diagEl = document.getElementById('namurStatusBadge');
  diagEl.textContent = isEn ? sl.labelEn : sl.labelEs;
  diagEl.className = `badge badge-${sl.statusBadge === 'ok' ? 'green' : sl.statusBadge}`;

  document.getElementById('fusionDecisionBox').textContent = isEn ? snap.fusionDecisionEn : snap.fusionDecisionEs;
  document.getElementById('fusionDecisionBox').style.borderLeftColor =
    sl.statusBadge === 'crit' ? '#ef4444' : (sl.statusBadge === 'warn' ? '#f59e0b' : '#00b8e6');

  // NVS & Relay indicators
  document.getElementById('nvsHorometer').textContent = `${snap.pumpHours.toFixed(1)} h`;
  document.getElementById('nvsCycles').textContent = `${snap.irrigCycles}`;
  const relayEl = document.getElementById('relayStatusBadge');
  relayEl.textContent = snap.safetyRelayLocked
    ? (isEn ? 'INTERLOCK TRIPPED (SAFE STOP)' : 'RELÉ ENCLAVADO (PARADA SEGURA)')
    : (snap.pumpActive ? (isEn ? 'VFD PUMP RUNNING' : 'BOMBA VFD EN MARCHA') : (isEn ? 'ARMED / STANDBY' : 'ARMADO / EN ESPERA'));
  relayEl.className = `badge ${snap.safetyRelayLocked ? 'badge-crit' : (snap.pumpActive ? 'badge-green' : 'badge-cyan')}`;

  // ESP-NOW Field Nodes
  document.getElementById('espNowNodesGrid').innerHTML = snap.nodes.map(n => {
    const evalNode = window.inannaScada.evaluateCurrentLoop(n.ma);
    const bCls = evalNode.statusBadge === 'ok' ? 'badge-green' : `badge-${evalNode.statusBadge}`;
    return `
      <div class="node-card">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <strong style="color:#fff;">${n.id} • ${isEn ? n.zoneEn : n.zoneEs}</strong>
          <span class="badge ${bCls}">${evalNode.pct !== null ? evalNode.pct + '%' : 'FAULT'}</span>
        </div>
        <div style="color:#94a3b8;">MAC ${n.mac} | AES-128 | ${n.latMs} ms | ${n.rssi} dBm</div>
        <div style="color:#00b8e6;">Loop: ${n.ma.toFixed(2)} mA | Solar Bus: ${n.battV} V DC</div>
      </div>
    `;
  }).join('');

  // Modbus Table
  document.getElementById('modbusTableBody').innerHTML = snap.registers.map(r => `
    <tr>
      <td><strong>${r.reg}</strong></td>
      <td>${r.type}</td>
      <td>${r.name}</td>
      <td style="color:#00b8e6;">${r.raw}</td>
      <td>${r.eng}</td>
    </tr>
  `).join('');

  // Alarm Historian
  document.getElementById('alarmHistorian').innerHTML = snap.alarms.map(a => {
    const col = a.level === 'ALARM' ? '#fca5a5' : (a.level === 'WARN' ? '#fcd34d' : (a.level === 'ACK' ? '#6ee7b7' : '#94a3b8'));
    return `<div style="color:${col};">[${a.ts}] <strong>${a.level}</strong> — ${a.msg}</div>`;
  }).join('');
}

function applyTranslations() {
  const t = I18N[APP_STATE.lang];
  document.getElementById('brandSubtitle').innerHTML = t.subtitle;
  document.getElementById('navOrbital').textContent = t.navOrbital;
  document.getElementById('navShift').textContent = t.navShift;
  document.getElementById('navScada').textContent = t.navScada;
  document.getElementById('navSlides').textContent = t.navSlides;
  document.getElementById('btnPrint').textContent = t.btnPrint;
  document.getElementById('heroBadge').textContent = t.heroBadge;
  document.getElementById('heroTitle').textContent = t.heroTitle;
  document.getElementById('heroDesc').textContent = t.heroDesc;
  document.getElementById('lblPreset').textContent = t.lblPreset;
  document.getElementById('lblHorizon').textContent = t.lblHorizon;
  document.getElementById('lblScenario').textContent = t.lblScenario;
  document.getElementById('lblMgmt').textContent = t.lblMgmt;
  document.getElementById('kpiTempLbl').textContent = t.kpiTemp;
  document.getElementById('kpiHeatLbl').textContent = t.kpiHeat;
  document.getElementById('kpiPrecLbl').textContent = t.kpiPrec;
  document.getElementById('kpiGwetLbl').textContent = t.kpiGwet;
  document.getElementById('kpiTopCropLbl').textContent = t.kpiTopCrop;
  document.getElementById('kpiWaterLbl').textContent = t.kpiWaterSave;
  document.getElementById('mapPanelTitle').textContent = t.mapTitle;
  document.getElementById('chartClimateTitle').textContent = t.chartClimateTitle;
  document.getElementById('chartShiftTitle').textContent = t.chartShiftTitle;
  document.getElementById('matrixTitle').textContent = t.matrixTitle;
  document.getElementById('matrixSub').textContent = t.matrixSub;
  document.getElementById('scadaTitle').textContent = t.scadaTitle;
  document.getElementById('scadaSub').textContent = t.scadaSub;
  document.getElementById('btnLangToggle').textContent = APP_STATE.lang === 'en' ? '🌐 ES / Español' : '🌐 EN / English';
}

document.addEventListener('DOMContentLoaded', async () => {
  initMap();

  // Controls
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

  document.getElementById('btnLangToggle').addEventListener('click', () => {
    APP_STATE.lang = APP_STATE.lang === 'en' ? 'es' : 'en';
    renderAll();
  });

  document.getElementById('btnPrint').addEventListener('click', () => window.print());

  // SCADA 4-20 mA controls
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
      renderScadaPanel();
    });
  });

  document.getElementById('btnAlarmAck').addEventListener('click', () => {
    window.inannaScada.acknowledgeAlarm();
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

  // Live micro-tick for pump horometer when active
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
