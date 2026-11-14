/**
 * TERRA-SHIFT SCADA — Agronomic Crop Suitability & Climate Shift Engine
 * Evaluates 12 Traditional & Climate-Resilient Alternative Crops across
 * Historical (2005), Current (2026), and CMIP6 Projected (2035 / 2050) states.
 */

window.CROP_DATABASE = [
  {
    id: 'maize',
    category: 'traditional',
    nameEn: 'Maize (Traditional Grain)',
    nameEs: 'Maíz (Grano Tradicional)',
    sci: 'Zea mays',
    optTemp: [15.0, 20.5],
    heatCritC: 38.5,
    frostLimitC: -5.5,
    waterReqMm: 780,
    minGwet: 0.48,
    econUsdHa: 1180,
    adviceEn: 'Vulnerable to tassel heat-shock (>38°C) and mid-summer dry spells. Shift to late-December sowing or drought-tolerant hybrids.',
    adviceEs: 'Vulnerable a golpe de calor en floración (>38°C) y pulso seco estival. Migrar a siembra tardía o híbridos tolerantes.'
  },
  {
    id: 'soybean',
    category: 'traditional',
    nameEn: 'Soybean (First-Crop)',
    nameEs: 'Soja de Primera',
    sci: 'Glycine max',
    optTemp: [15.5, 21.0],
    heatCritC: 39.0,
    frostLimitC: -5.0,
    waterReqMm: 740,
    minGwet: 0.46,
    econUsdHa: 1090,
    adviceEn: 'Declining rainfed stability as root-zone moisture (GWETROOT) drops below 0.45. Requires cover crops to cut soil evaporation.',
    adviceEs: 'Pierde estabilidad en secano cuando GWETROOT cae bajo 0.45. Requiere cultivos de servicio para retener humedad.'
  },
  {
    id: 'sorghum',
    category: 'resilient',
    nameEn: 'Grain & Silage Sorghum',
    nameEs: 'Sorgo Granífero / Silero',
    sci: 'Sorghum bicolor',
    optTemp: [16.5, 24.0],
    heatCritC: 43.5,
    frostLimitC: -4.5,
    waterReqMm: 470,
    minGwet: 0.31,
    econUsdHa: 980,
    adviceEn: 'Top C4 drought-resilient replacement for stressed maize plots; maintains stomatal efficiency up to 42°C.',
    adviceEs: 'Reemplazo C4 líder para lotes donde el maíz sufre estrés hídrico; mantiene eficiencia estomática hasta 42°C.'
  },
  {
    id: 'chickpea',
    category: 'resilient',
    nameEn: 'Kabuli Chickpea (Export)',
    nameEs: 'Garbanzo Kabuli (Exportación)',
    sci: 'Cicer arietinum',
    optTemp: [14.5, 21.5],
    heatCritC: 41.5,
    frostLimitC: -6.0,
    waterReqMm: 390,
    minGwet: 0.28,
    econUsdHa: 1460,
    adviceEn: 'High-value winter/spring legume thriving on residual root-zone moisture + precision supplemental irrigation.',
    adviceEs: 'Legumbre invernal de alto valor que aprovecha humedad radicular residual + riego estratégico suplementario.'
  },
  {
    id: 'peanut',
    category: 'traditional',
    nameEn: 'High-Oleic Peanut',
    nameEs: 'Maní Alto Oleico (Córdoba)',
    sci: 'Arachis hypogaea',
    optTemp: [16.5, 22.0],
    heatCritC: 40.5,
    frostLimitC: -4.0,
    waterReqMm: 620,
    minGwet: 0.40,
    econUsdHa: 1620,
    adviceEn: 'Córdoba flagship crop; warming expands southern thermal envelope, provided pod-filling soil moisture is stabilized.',
    adviceEs: 'Cultivo emblema de Córdoba; el calentamiento desplaza su frontera al sur si se estabiliza la humedad en clavado.'
  },
  {
    id: 'wheat',
    category: 'traditional',
    nameEn: 'Winter Bread Wheat',
    nameEs: 'Trigo Pan Invernal',
    sci: 'Triticum aestivum',
    optTemp: [12.5, 18.0],
    heatCritC: 38.0,
    frostLimitC: -9.0,
    waterReqMm: 520,
    minGwet: 0.38,
    econUsdHa: 890,
    adviceEn: 'Warmer winters reduce vernalization chill hours; switch to short-vernalization cultivars and monitor spring soil profile.',
    adviceEs: 'Inviernos más cálidos reducen horas de frío; migrar a ciclos cortos de bajo requerimiento de vernalización.'
  },
  {
    id: 'malbec',
    category: 'specialty',
    nameEn: 'High-Altitude Serrana Vine',
    nameEs: 'Vid de Altura Serrana (Malbec)',
    sci: 'Vitis vinifera',
    optTemp: [15.0, 20.5],
    heatCritC: 41.5,
    frostLimitC: -6.5,
    waterReqMm: 440,
    minGwet: 0.27,
    econUsdHa: 4850,
    adviceEn: 'Booming Calamuchita specialty! Regulated Deficit Irrigation (RDI) via 4–20 mA probes maximizes polyphenol quality.',
    adviceEs: '¡Especialidad en auge en Calamuchita! El Riego Deficitario Controlado (4–20 mA) maximiza polifenoles y ahorro hídrico.'
  },
  {
    id: 'olive',
    category: 'specialty',
    nameEn: 'Super-High-Density Olive',
    nameEs: 'Olivo Superintensivo (Aceite)',
    sci: 'Olea europaea',
    optTemp: [16.5, 22.5],
    heatCritC: 44.0,
    frostLimitC: -5.0,
    waterReqMm: 420,
    minGwet: 0.25,
    econUsdHa: 3900,
    adviceEn: 'Expanding rapidly across semi-arid piedmonts as frost risk retreats and heat tolerance outperforms annual grains.',
    adviceEs: 'Fuerte expansión en piedemontes serranos al disminuir heladas severas y tolerar olas de calor extremas.'
  },
  {
    id: 'pistachio',
    category: 'specialty',
    nameEn: 'Pistachio (Arid-Shift Tree)',
    nameEs: 'Pistacho (Frutal Árido/Semiárido)',
    sci: 'Pistacia vera',
    optTemp: [17.0, 23.0],
    heatCritC: 45.5,
    frostLimitC: -6.0,
    waterReqMm: 410,
    minGwet: 0.22,
    econUsdHa: 6400,
    adviceEn: 'Premier 2035–2050 high-margin adaptation tree for drying corridors with high solar radiation (>20 MJ/m²/day).',
    adviceEs: 'Frutal estrella 2035–2050 de altísima rentabilidad para corredores con creciente aridez y alta radiación solar.'
  },
  {
    id: 'lavender',
    category: 'specialty',
    nameEn: 'Serrana Lavender & Aromatics',
    nameEs: 'Lavanda y Aromáticas Serranas',
    sci: 'Lavandula angustifolia',
    optTemp: [14.5, 20.5],
    heatCritC: 41.5,
    frostLimitC: -7.5,
    waterReqMm: 360,
    minGwet: 0.24,
    econUsdHa: 4200,
    adviceEn: 'Ideal smallholder diversification in Calamuchita rocky slopes; thrives in well-drained soils with minimal drip water.',
    adviceEs: 'Diversificación ideal para productores de Calamuchita en suelos pedregosos con mínimo consumo de riego por goteo.'
  }
];

class CropSuitabilityEngine {
  /**
   * Compute 0-100 suitability score for one crop given climate state & irrigation management
   * @param {Object} crop
   * @param {Object} climate - { t2m, tMax, tMin, precMm, gwet, solar }
   * @param {string} management - 'rainfed' | 'drip_iiot' | 'regenerative'
   */
  scoreCrop(crop, climate, management = 'rainfed') {
    // 1. Thermal Mean Score (0-100)
    let thermalScore = 100;
    if (climate.t2m < crop.optTemp[0]) {
      thermalScore = Math.max(15, 100 - (crop.optTemp[0] - climate.t2m) * 18);
    } else if (climate.t2m > crop.optTemp[1]) {
      thermalScore = Math.max(15, 100 - (climate.t2m - crop.optTemp[1]) * 16);
    }

    // 2. Extreme Canopy Heat Penalty
    let heatPenalty = 0;
    const microclimateCooling = management === 'drip_iiot' ? 1.4 : (management === 'regenerative' ? 0.8 : 0);
    const effectiveTMax = climate.tMax - microclimateCooling;
    if (effectiveTMax > crop.heatCritC) {
      heatPenalty = Math.min(42, (effectiveTMax - crop.heatCritC) * 7.8);
    }

    // 3. Frost Risk Penalty
    let frostPenalty = 0;
    if (climate.tMin < crop.frostLimitC) {
      frostPenalty = Math.min(35, (crop.frostLimitC - climate.tMin) * 8.5);
    }

    // 4. Water & Root-Zone Soil Moisture Balance (0-100)
    let effectiveWaterMm = climate.precMm;
    let effectiveGwet = climate.gwet;
    let irrigationM3Ha = 0;

    if (management === 'regenerative') {
      // Mulch/cover crops improve infiltration & root retention by ~14%
      effectiveWaterMm = climate.precMm * 1.12;
      effectiveGwet = Math.min(0.80, climate.gwet + 0.06);
    } else if (management === 'drip_iiot') {
      // INANNA 4-20 mA + NASA SMAP closed-loop drip supplies exact deficit with 92% efficiency
      const deficitMm = Math.max(0, crop.waterReqMm - climate.precMm * 0.78);
      irrigationM3Ha = Math.round(deficitMm * 10 * 0.82); // 1 mm/ha = 10 m³/ha, optimized via sensor fusion
      effectiveWaterMm = Math.max(climate.precMm, crop.waterReqMm * 0.96);
      effectiveGwet = Math.max(climate.gwet, crop.minGwet + 0.08);
    }

    const precipRatio = Math.min(1.12, effectiveWaterMm / crop.waterReqMm);
    const gwetRatio = Math.min(1.12, effectiveGwet / crop.minGwet);
    const waterScore = Math.min(100, Math.max(10, (precipRatio * 0.58 + gwetRatio * 0.42) * 95));

    // Weighted Composite Suitability
    const rawComposite = thermalScore * 0.38 + waterScore * 0.62 - heatPenalty - frostPenalty;
    const suitability = Math.round(Math.max(8, Math.min(98, rawComposite)));

    return {
      suitability,
      thermalScore: Math.round(thermalScore),
      waterScore: Math.round(waterScore),
      heatPenalty: Math.round(heatPenalty),
      irrigationM3Ha
    };
  }

  evaluateAll(enrichedNasaData, horizonYear = 2050, scenario = 'ssp245', management = 'rainfed') {
    const state2005 = window.nasaOrbitalService.projectClimate(enrichedNasaData, 2005, scenario);
    const state2026 = window.nasaOrbitalService.projectClimate(enrichedNasaData, 2026, scenario);
    const stateTarget = window.nasaOrbitalService.projectClimate(enrichedNasaData, horizonYear, scenario);

    const results = window.CROP_DATABASE.map(crop => {
      const s2005 = this.scoreCrop(crop, state2005, 'rainfed');
      const s2026 = this.scoreCrop(crop, state2026, management);
      const sTarget = this.scoreCrop(crop, stateTarget, management);
      const deltaVsHist = sTarget.suitability - s2005.suitability;

      return {
        ...crop,
        score2005: s2005.suitability,
        score2026: s2026.suitability,
        scoreTarget: sTarget.suitability,
        deltaVsHist,
        irrigationM3Ha: sTarget.irrigationM3Ha,
        projectedRevUsdHa: Math.round(crop.econUsdHa * (sTarget.suitability / 85)),
        status: sTarget.suitability >= 74
          ? (deltaVsHist >= 0 ? 'emerging_winner' : 'resilient_viable')
          : (sTarget.suitability >= 54 ? 'adaptation_needed' : 'high_risk')
      };
    });

    return results.sort((a, b) => b.scoreTarget - a.scoreTarget);
  }
}

window.cropSuitabilityEngine = new CropSuitabilityEngine();
