/**
 * TERRA-SHIFT SCADA — Official Trilingual Manuals Suite (EN | ES | PT)
 * Authored by: Fabio Maximiliano Medina Rojas — Técnico Superior en Mecatrónica
 * Team INANNA COMPANY (Medina Rojas • Debia • Coria) — 2026 NASA Space Apps Challenge
 */

window.MANUALS_UI = {
  en: {
    portalBadge: 'TEAM INANNA (RÍO CUARTO, CÓRDOBA) • OPEN-SOURCE DOCUMENTATION',
    portalTitle: 'TERRA-SHIFT SCADA — Complete Manuals Suite',
    portalSub: 'Authored by Fabio Maximiliano Medina Rojas (Higher Technician in Mechatronics) • Team INANNA (Río Cuarto, Córdoba — Event: Santa Rosa de Calamuchita)',
    backBtn: '← Back to Live SCADA',
    printOneBtn: '⬇ Print Active Manual (PDF)',
    tab1: '📘 Manual 01: Scientific & Mechatronic Engineering',
    tab2: '📗 Manual 02: Plug & Play User Guide (Zero Tech Needed)',
    tab3: '📙 Manual 03: Industrial Maintenance (RCM / TPM / NAMUR)',
    docCodeLbl: 'DOCUMENT ID',
    revLbl: 'REVISION',
    authorLbl: 'MECHATRONICS LEAD',
    divLbl: 'DOMAIN'
  },
  es: {
    portalBadge: 'EQUIPO INANNA (RÍO CUARTO, CÓRDOBA) • DOCUMENTACIÓN ABIERTA',
    portalTitle: 'TERRA-SHIFT SCADA — Suite Oficial de Manuales',
    portalSub: 'Dirección Técnica: Fabio Maximiliano Medina Rojas (Técnico Superior en Mecatrónica) • Equipo INANNA (Río Cuarto, Córdoba — Sede: Santa Rosa de Calamuchita)',
    backBtn: '← Volver al SCADA en Vivo',
    printOneBtn: '⬇ Imprimir Manual Actual (PDF)',
    tab1: '📘 Manual 01: Ingeniería Científica y Mecatrónica',
    tab2: '📗 Manual 02: Guía Rápida Plug & Play (Sin Conocimientos)',
    tab3: '📙 Manual 03: Mantenimiento Industrial (Preventivo/Predictivo/Correctivo)',
    docCodeLbl: 'CÓDIGO DOC.',
    revLbl: 'REVISIÓN',
    authorLbl: 'DIRECCIÓN MECATRÓNICA',
    divLbl: 'ÁREA'
  },
  pt: {
    portalBadge: 'EQUIPE INANNA (RÍO CUARTO, CÓRDOBA) • DOCUMENTAÇÃO ABERTA',
    portalTitle: 'TERRA-SHIFT SCADA — Suíte Oficial de Manuais',
    portalSub: 'Direção Técnica: Fabio Maximiliano Medina Rojas (Técnico Superior em Mecatrônica) • Equipe INANNA (Río Cuarto, Córdoba — Sede: Santa Rosa de Calamuchita)',
    backBtn: '← Voltar ao SCADA ao Vivo',
    printOneBtn: '⬇ Imprimir Manual Atual (PDF)',
    tab1: '📘 Manual 01: Engenharia Científica e Mecatrônica',
    tab2: '📗 Manual 02: Guia Rápido Plug & Play (Para Leigos / Produtores)',
    tab3: '📙 Manual 03: Manutenção Industrial (Preventiva/Preditiva/Corretiva)',
    docCodeLbl: 'CÓDIGO DOC.',
    revLbl: 'REVISÃO',
    authorLbl: 'LIDERANÇA MECATRÔNICA',
    divLbl: 'DOMÍNIO'
  }
};

window.MANUALS_CONTENT = {
  // =========================================================================
  // MANUAL 01: SCIENTIFIC, AGRONOMIC & MECHATRONIC ENGINEERING MANUAL
  // =========================================================================
  m1: {
    docId: 'INANNA-ENG-TS2026-01',
    rev: 'Rev 2.0 — NASA Space Apps 2026',
    division: 'OPEN EARTH SCIENCE • AGRONOMY • RURAL MECHATRONICS',
    en: `
      <h2>1. Purpose & Systems Engineering Scope</h2>
      <p>This manual establishes the complete mathematical, physical, agro-climatic, and mechatronic foundations of <strong>TERRA-SHIFT SCADA</strong>. It is intended for agricultural engineers, Earth-observation scientists, control-systems engineers, and technical judges evaluating scientific validity and hardware robustness.</p>

      <div class="callout-info">
        <strong>Mechatronic Design Philosophy:</strong> Planetary remote sensing excels at synoptic spatial coverage ($9\\text{ km}$ SMAP to $250\\text{ m}$ MODIS), whereas industrial automation excels at sub-second fault-tolerant actuation ($<5\\text{ ms}$). TERRA-SHIFT unifies both scales into a closed-loop cyber-physical architecture.
      </div>

      <h2>2. NASA Orbital Data Ingestion & Statistical Trend Formulation</h2>
      <h3>2.1 Multi-Decade Agroclimatology Harmonization (NASA POWER)</h3>
      <p>For any queried coordinate $(\\phi, \\lambda)$, TERRA-SHIFT retrieves 21-year monthly and annual series ($2004\\text{–}2024$) from <code>power.larc.nasa.gov/api/temporal/monthly/point</code> (Community <code>AG</code>, MERRA-2 &amp; GEWEX SRB assimilation). Bias-corrected daily-rate precipitation $\\overline{P}_{\\text{day},i}$ ($\\text{mm}\\cdot\\text{d}^{-1}$) is integrated to annual depth $P_{\\text{yr},i}$ accounting for Julian leap-year periodicity:</p>
      <div class="math-block">$$P_{\\text{yr},i} = 365.25 \\cdot \\overline{\\text{PRECTOTCORR}}_{i} \\quad [\\text{mm}\\cdot\\text{yr}^{-1}]$$</div>

      <p>Decadal climate drift is quantified via exact <strong>Ordinary Least Squares (OLS)</strong> linear regression over $n$ annual observations $(t_i, y_i)$, yielding the decadal rate of change $\\Delta_{10}$:</p>
      <div class="math-block">$$\\beta_1 = \\frac{n\\sum_{i=1}^{n} t_i y_i - \\left(\\sum_{i=1}^{n} t_i\\right)\\left(\\sum_{i=1}^{n} y_i\\right)}{n\\sum_{i=1}^{n} t_i^2 - \\left(\\sum_{i=1}^{n} t_i\\right)^2}, \\qquad \\Delta_{10} = 10 \\cdot \\beta_1$$</div>

      <h3>2.2 Regional CMIP6 Downscaled Climate State Projection (2035 &amp; 2050)</h3>
      <p>Given the observed recent baseline $(T_{2\\text{m},0}, T_{\\max,0}, T_{\\min,0}, P_0, \\theta_{\\text{root},0})$ at reference year $t_0 = 2026$ and target horizon $t_h \\in \\{2035, 2050\\}$ ($\\Delta t = t_h - 2026$), future states are projected under IPCC <strong>NASA NEX-GDDP-CMIP6</strong> pathways (<code>SSP2-4.5</code> $\\alpha_T = 0.034\\;^\\circ\\text{C/yr}$, $k_{\\text{ext}} = 1.28$; <code>SSP5-8.5</code> $\\alpha_T = 0.058\\;^\\circ\\text{C/yr}$, $k_{\\text{ext}} = 1.48$):</p>
      <div class="math-block">$$\\begin{aligned}
      \\Delta T &= \\alpha_T \\cdot \\Delta t \\\\
      T_{2\\text{m}}(t_h) &= T_{2\\text{m},0} + \\Delta T, \\qquad T_{\\max}(t_h) = T_{\\max,0} + k_{\\text{ext}}\\Delta T, \\qquad T_{\\min}(t_h) = T_{\\min,0} + 0.85\\Delta T \\\\
      P(t_h) &= P_0 \\cdot \\max\\!\\big(0.68,\\; 1 + \\gamma_{\\text{lat}}\\Delta t\\big), \\qquad \\theta_{\\text{root}}(t_h) = \\operatorname{clamp}_{[0.12, 0.85]}\\!\\Big(\\theta_{\\text{root},0}\\frac{P(t_h)}{P_0} - 0.026\\,\\Delta T\\Big)
      \\end{aligned}$$</div>
      <p>where $0.026\\;^\\circ\\text{C}^{-1}$ models accelerated atmospheric evaporative demand (Clausius-Clapeyron vapor pressure deficit scaling) depleting NASA <code>GWETROOT</code> root-zone soil wetness.</p>

      <h2>3. Multi-Factor Agronomic Crop Suitability Model</h2>
      <p>Each crop $c$ is parameterized by its optimal mean temperature window $[T_{\\text{low},c}, T_{\\text{high},c}]$, anthesis/canopy heat-shock threshold $T_{\\text{crit},c}$, lethal frost threshold $T_{\\text{frost},c}$, seasonal water requirement $W_{\\text{req},c}\\;[\\text{mm}]$, and minimum root-zone wetness $\\theta_{\\min,c}$. Composite suitability $S_c \\in [8, 98]\\%$ is formulated as:</p>
      <div class="math-block">$$S_c = \\operatorname{clamp}_{[8,98]}\\Big(0.38\\,f_T(T_{2\\text{m}}) + 0.62\\,f_W(W_{\\text{eff}}, \\theta_{\\text{eff}}) - \\Pi_{\\text{heat}}(T_{\\max}^{\\text{eff}}) - \\Pi_{\\text{frost}}(T_{\\min})\\Big)$$</div>
      <ul>
        <li><strong>Thermal Envelope Score $f_T$:</strong> $100$ inside $[T_{\\text{low},c}, T_{\\text{high},c}]$, decaying at $18\\text{ pts}/^\\circ\\text{C}$ below $T_{\\text{low},c}$ and $16\\text{ pts}/^\\circ\\text{C}$ above $T_{\\text{high},c}$.</li>
        <li><strong>Canopy Heat-Shock Penalty $\\Pi_{\\text{heat}}$:</strong> $\\min\\big(42,\\; 7.8\\cdot \\max(0, T_{\\max}^{\\text{eff}} - T_{\\text{crit},c})\\big)$, incorporating transpirational microclimate cooling ($1.4\\;^\\circ\\text{C}$ under closed-loop drip).</li>
        <li><strong>Cryogenic Frost Penalty $\\Pi_{\\text{frost}}$:</strong> $\\min\\big(35,\\; 8.5\\cdot \\max(0, T_{\\text{frost},c} - T_{\\min})\\big)$.</li>
        <li><strong>Closed-Loop Precision Drip Volumetric Demand ($\\text{m}^3\\cdot\\text{ha}^{-1}\\cdot\\text{yr}^{-1}$):</strong> Since $1\\text{ mm}$ over $1\\text{ ha} \\equiv 10\\text{ m}^3$, supplemental irrigation volume with sensor-fusion efficiency $\\eta_{\\text{iiot}} = 0.82$ is:
          $$V_{\\text{irrig},c} = 10 \\cdot \\eta_{\\text{iiot}} \\cdot \\max\\!\\big(0,\\; W_{\\text{req},c} - 0.78\\,P(t_h)\\big) \\quad [\\text{m}^3\\cdot\\text{ha}^{-1}]$$
        </li>
      </ul>

      <h2>4. Mechatronic Field Instrumentation — 4–20 mA Loop &amp; NAMUR NE43</h2>
      <h3>4.1 Proof of Line-Drop Immunity (Kirchhoff's Current Law)</h3>
      <p>Low-cost agricultural sensors use $0\\text{–}3.3\\text{ V}$ or $0\\text{–}5\\text{ V}$ voltage outputs, suffering severe attenuation $V_{\\text{err}} = I_{\\text{in}} \\cdot (2\\rho L / A)$ and capacitive EMI pickup across long farm runs. In INANNA's <strong>24V DC 4–20 mA current loop</strong>, the transmitter regulates loop current $I_{\\text{loop}}$ independently of cable resistance $R_{\\text{cable}}$, provided total loop resistance satisfies:</p>
      <div class="math-block">$$R_{\\text{cable}} + R_{\\text{shunt}} \\le \\frac{V_{\\text{supply}} - V_{\\min,\\text{tx}}}{I_{\\max}} = \\frac{24.0\\text{ V} - 9.0\\text{ V}}{0.020\\text{ A}} = 750\\;\\Omega$$</div>
      <p>With $R_{\\text{shunt}} = 165.0\\;\\Omega$ ($0.1\\%$, $15\\text{ ppm}/^\\circ\\text{C}$), $585\\;\\Omega$ remains available for field wiring—allowing <strong>over $6\\text{ km}$ of $20\\text{ AWG}$ twisted pair</strong> with zero calibration loss!</p>

      <h3>4.2 Precision Shunt Scaling &amp; 16-Bit Differential ADC Quantization</h3>
      <p>Across the $165.0\\;\\Omega$ shunt fed into a differential 16-bit <code>ADS1115</code> ($\\text{PGA} = \\pm 4.096\\text{ V}$, $\\text{LSB} = 0.125\\text{ mV}$):</p>
      <div class="math-block">$$V_{\\text{sense}} = I_{\\text{loop}} \\cdot 165.0\\;\\Omega, \\qquad N_{\\text{ADC}} = \\operatorname{round}\\!\\left(\\frac{V_{\\text{sense}}}{0.000125\\text{ V}}\\right), \\qquad \\text{PV}(\\%) = \\frac{I_{\\text{loop}}[\\text{mA}] - 4.00}{16.00}\\times 100\\%$$</div>

      <table class="doc-table">
        <thead>
          <tr><th>NAMUR NE43 Zone</th><th>Loop Current ($I_{\\text{loop}}$)</th><th>Shunt Voltage ($165\\,\\Omega$)</th><th>ADS1115 Counts</th><th>SCADA State &amp; Safety Action</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Underscale / Cut Wire</strong></td><td>$0.00 \\le I < 3.60\\text{ mA}$</td><td>$< 0.594\\text{ V}$</td><td>$< 4,752$</td><td><code>NE43_UNDERSCALE_FAULT</code> → Trip Interlock Relay, Fallback to NASA <code>GWETROOT</code></td></tr>
          <tr><td><strong>Live Zero (0.0%)</strong></td><td>$4.00\\text{ mA}$</td><td>$0.660\\text{ V}$</td><td>$5,280$</td><td><code>NE43_HEALTHY</code> → True Bone-Dry Soil ($0.0\\%$) — Trigger VFD Irrigation</td></tr>
          <tr><td><strong>Mid-Scale (50.0%)</strong></td><td>$12.00\\text{ mA}$</td><td>$1.980\\text{ V}$</td><td>$15,840$</td><td><code>NE43_HEALTHY</code> → Optimal Root Moisture ($50.0\\%$) — Pump Standby</td></tr>
          <tr><td><strong>Full Scale (100.0%)</strong></td><td>$20.00\\text{ mA}$</td><td>$3.300\\text{ V}$</td><td>$26,400$</td><td><code>NE43_HEALTHY</code> → Saturated Soil ($100.0\\%$) — Inhibit Irrigation</td></tr>
          <tr><td><strong>Overscale / Short</strong></td><td>$I > 20.50\\text{ mA}$</td><td>$> 3.383\\text{ V}$</td><td>$> 27,060$</td><td><code>NE43_OVERSCALE_FAULT</code> → Trip Interlock Relay, Require Operator ACK</td></tr>
        </tbody>
      </table>

      <h2>5. Routerless ESP-NOW &amp; Dual-Layer Modbus Architecture</h2>
      <ul>
        <li><strong>Physical/MAC Wireless Layer:</strong> IEEE 802.11 connectionless vendor action frames (<code>ESP-NOW</code>, 2.4 GHz Ch. 1, CCMP <strong>AES-128</strong> hardware encryption, $<4\\text{ ms}$ air latency, zero DHCP/router overhead).</li>
        <li><strong>Fieldbus &amp; SCADA Layer:</strong> Galvanically isolated <strong>Modbus RTU over RS485</strong> (<code>MAX485</code>, $9600\\text{ bps }8\\text{N}1$, $120\\;\\Omega$ bus termination) + <strong>Modbus TCP/IP (Port 502)</strong> encoding engineering floats as deterministic fixed-point unsigned/signed 16-bit integers ($\\text{Reg} = \\operatorname{round}(x \\cdot 100)$) for direct ingestion by Siemens S7, Allen-Bradley, Schneider, Ignition, or WinCC.</li>
      </ul>
    `,

    es: `
      <h2>1. Alcance y Fundamento de Ingeniería Mecatrónica</h2>
      <p>El presente manual documenta la formulación matemática, física, agrometeorológica y electrónica de grado industrial de <strong>TERRA-SHIFT SCADA</strong>, diseñado para ingenieros mecatrónicos, electrónicos, agrónomos, hidrólogos y jurados evaluadores.</p>

      <div class="callout-info">
        <strong>Filosofía Mecatrónica INANNA:</strong> La teledetección satelital domina la macroescala espacial ($9\\text{ km}$ en SMAP a $250\\text{ m}$ en MODIS), mientras que la instrumentación industrial domina la actuación determinista a prueba de fallas ($<5\\text{ ms}$). TERRA-SHIFT integra ambas escalas en un único sistema ciberfísico de lazo cerrado.
      </div>

      <h2>2. Ingesta Satelital NASA y Regresión Estadística Multidecadal</h2>
      <h3>2.1 Armonización Agroclimática (NASA POWER API)</h3>
      <p>Para cualquier coordenada $(\\phi, \\lambda)$, el motor consulta 21 años de series mensuales y anuales ($2004\\text{–}2024$) en <code>power.larc.nasa.gov/api/temporal/monthly/point</code> (Comunidad <code>AG</code>, reanálisis MERRA-2 y GEWEX SRB). La tasa diaria corregida $\\overline{\\text{PRECTOTCORR}}_i$ ($\\text{mm}\\cdot\\text{d}^{-1}$) se integra a lámina anual exacta contemplando el ciclo juliano bisiesto:</p>
      <div class="math-block">$$P_{\\text{anual},i} = 365.25 \\cdot \\overline{\\text{PRECTOTCORR}}_{i} \\quad [\\text{mm}\\cdot\\text{año}^{-1}]$$</div>

      <p>La pendiente secular de cambio climático se obtiene por <strong>Mínimos Cuadrados Ordinarios (OLS)</strong> sobre los $n$ años observados $(t_i, y_i)$, expresada por década ($\\Delta_{10}$):</p>
      <div class="math-block">$$\\beta_1 = \\frac{n\\sum_{i=1}^{n} t_i y_i - \\left(\\sum_{i=1}^{n} t_i\\right)\\left(\\sum_{i=1}^{n} y_i\\right)}{n\\sum_{i=1}^{n} t_i^2 - \\left(\\sum_{i=1}^{n} t_i\\right)^2}, \\qquad \\Delta_{10} = 10 \\cdot \\beta_1$$</div>

      <h3>2.2 Proyección Climática Regionalizada NASA NEX-GDDP-CMIP6 (2035 y 2050)</h3>
      <p>Partiendo de la línea base reciente observada en $t_0 = 2026$ y proyectando a $\\Delta t = t_h - 2026$ bajo los escenarios <strong>SSP2-4.5</strong> ($\\alpha_T = 0.034\\;^\\circ\\text{C/año}$, $k_{\\text{ext}} = 1.28$) y <strong>SSP5-8.5</strong> ($\\alpha_T = 0.058\\;^\\circ\\text{C/año}$, $k_{\\text{ext}} = 1.48$):</p>
      <div class="math-block">$$\\begin{aligned}
      \\Delta T &= \\alpha_T \\cdot \\Delta t \\\\
      T_{2\\text{m}}(t_h) &= T_{2\\text{m},0} + \\Delta T, \\qquad T_{\\max}(t_h) = T_{\\max,0} + k_{\\text{ext}}\\Delta T, \\qquad T_{\\min}(t_h) = T_{\\min,0} + 0.85\\Delta T \\\\
      P(t_h) &= P_0 \\cdot \\max\\!\\big(0.68,\\; 1 + \\gamma_{\\text{lat}}\\Delta t\\big), \\qquad \\theta_{\\text{root}}(t_h) = \\operatorname{clamp}_{[0.12, 0.85]}\\!\\Big(\\theta_{\\text{root},0}\\frac{P(t_h)}{P_0} - 0.026\\,\\Delta T\\Big)
      \\end{aligned}$$</div>
      <p>donde el término $-0.026\\,\\Delta T$ captura el incremento de demanda evaporativa atmosférica (relación de Clausius-Clapeyron sobre el déficit de presión de vapor) que agota la fracción de humedad radicular <code>GWETROOT</code>.</p>

      <h2>3. Modelo Matemático de Aptitud Agronómica ($S_c$)</h2>
      <p>Cada cultivo $c$ se modela mediante su ventana térmica óptima $[T_{\\text{low},c}, T_{\\text{high},c}]$, umbral crítico de golpe térmico en floración $T_{\\text{crit},c}$, límite letal de helada $T_{\\text{frost},c}$, requerimiento hídrico $W_{\\text{req},c}\\;[\\text{mm}]$ y humedad radicular mínima $\\theta_{\\min,c}$:</p>
      <div class="math-block">$$S_c = \\operatorname{clamp}_{[8,98]}\\Big(0.38\\,f_T(T_{2\\text{m}}) + 0.62\\,f_W(W_{\\text{ef}}, \\theta_{\\text{ef}}) - \\Pi_{\\text{calor}}(T_{\\max}^{\\text{ef}}) - \\Pi_{\\text{helada}}(T_{\\min})\\Big)$$</div>
      <ul>
        <li><strong>Función Térmica $f_T$:</strong> $100$ dentro de $[T_{\\text{low},c}, T_{\\text{high},c}]$, penalizando $18\\text{ pts}/^\\circ\\text{C}$ por déficit térmico y $16\\text{ pts}/^\\circ\\text{C}$ por exceso térmico.</li>
        <li><strong>Penalización por Choque Térmico en Dosel $\\Pi_{\\text{calor}}$:</strong> $\\min\\big(42,\\; 7.8\\cdot \\max(0, T_{\\max}^{\\text{ef}} - T_{\\text{crit},c})\\big)$, descontando enfriamiento transpirativo ($1.4\\;^\\circ\\text{C}$ bajo goteo controlado).</li>
        <li><strong>Volumen Neto de Riego de Precisión ($\\text{m}^3\\cdot\\text{ha}^{-1}\\cdot\\text{año}^{-1}$):</strong> Dado que $1\\text{ mm/ha} = 10\\text{ m}^3\\text{/ha}$, con factor de eficiencia por fusión de sensores $\\eta_{\\text{iiot}} = 0.82$:
          $$V_{\\text{riego},c} = 10 \\cdot \\eta_{\\text{iiot}} \\cdot \\max\\!\\big(0,\\; W_{\\text{req},c} - 0.78\\,P(t_h)\\big) \\quad [\\text{m}^3\\cdot\\text{ha}^{-1}]$$
        </li>
      </ul>

      <h2>4. Instrumentación Mecatrónica — Lazo 4–20 mA, Kirchhoff y NAMUR NE43</h2>
      <h3>4.1 Demostración Física de Inmunidad a Caída de Tensión</h3>
      <p>Los sensores agrícolas amateurs de salida en tensión ($0\\text{–}5\\text{ V}$) sufren caída óhmica $V_{\\text{error}} = I \\cdot (2\\rho L / A)$ y acople inductivo de motores/variadores. En el <strong>lazo industrial de corriente de 4 a 20 mA alimentado en 24 V DC</strong> de INANNA, por Primera Ley de Kirchhoff la corriente es idéntica en todo punto serie del lazo mientras se cumpla el presupuesto de carga:</p>
      <div class="math-block">$$R_{\\text{cable}} + R_{\\text{shunt}} \\le \\frac{V_{\\text{fuente}} - V_{\\min,\\text{tx}}}{I_{\\max}} = \\frac{24.0\\text{ V} - 9.0\\text{ V}}{0.020\\text{ A}} = 750\\;\\Omega$$</div>
      <p>Adoptando una resistencia <em>shunt</em> de película metálica de precisión $R_{\\text{shunt}} = 165.0\\;\\Omega \\pm 0.1\\%$ ($15\\text{ ppm}/^\\circ\\text{C}$), restan $585\\;\\Omega$ disponibles para tendido, permitiendo <strong>más de $6\\text{ km}$ de par trenzado $20\\text{ AWG}$ sin perder precisión</strong>.</p>

      <h3>4.2 Conversión Diferencial en 16 Bits (ADS1115) y Norma NAMUR NE43</h3>
      <p>Por Ley de Ohm sobre $R_{\\text{shunt}} = 165.0\\;\\Omega$ leída en modo diferencial por el ADC <code>ADS1115</code> ($\text{PGA} = \\pm 4.096\\text{ V} \\implies 0.125\\text{ mV/cuenta}$):</p>
      <div class="math-block">$$V_{\\text{sense}} = I_{\\text{lazo}} \\cdot 165.0\\;\\Omega, \\qquad N_{\\text{ADC}} = \\operatorname{round}\\!\\left(\\frac{V_{\\text{sense}}}{0.000125\\text{ V}}\\right), \\qquad \\text{PV}(\\%) = \\frac{I_{\\text{lazo}}[\\text{mA}] - 4.00}{16.00}\\times 100\\%$$</div>

      <table class="doc-table">
        <thead>
          <tr><th>Zona NAMUR NE43</th><th>Corriente ($I_{\\text{lazo}}$)</th><th>Tensión Shunt ($165\\,\\Omega$)</th><th>Cuentas ADS1115</th><th>Diagnóstico SCADA y Acción Mecatrónica</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Falla Cero Vivo / Corte</strong></td><td>$0.00 \\le I < 3.60\\text{ mA}$</td><td>$< 0.594\\text{ V}$</td><td>$< 4.752$</td><td><code>NE43_UNDERSCALE_FAULT</code> → Enclava Relé Seguro, conmuta a respaldo <code>NASA GWETROOT</code></td></tr>
          <tr><td><strong>Cero Vivo Sano (0.0%)</strong></td><td>$4.00\\text{ mA}$</td><td>$0.660\\text{ V}$</td><td>$5.280$</td><td><code>NE43_HEALTHY</code> → Suelo Realmente Seco ($0.0\\%$) — Habilita Riego VFD</td></tr>
          <tr><td><strong>Media Escala (50.0%)</strong></td><td>$12.00\\text{ mA}$</td><td>$1.980\\text{ V}$</td><td>$15.840$</td><td><code>NE43_HEALTHY</code> → Humedad Radicular Óptima ($50.0\\%$) — Bomba en Espera</td></tr>
          <tr><td><strong>Fondo de Escala (100%)</strong></td><td>$20.00\\text{ mA}$</td><td>$3.300\\text{ V}$</td><td>$26.400$</td><td><code>NE43_HEALTHY</code> → Saturación Hídrica ($100.0\\%$) — Inhibe Bombeo</td></tr>
          <tr><td><strong>Sobreescala / Corto</strong></td><td>$I > 20.50\\text{ mA}$</td><td>$> 3.383\\text{ V}$</td><td>$> 27.060$</td><td><code>NE43_OVERSCALE_FAULT</code> → Parada Segura, exige reconocimiento <code>Alarm ACK</code></td></tr>
        </tbody>
      </table>

      <h2>5. Telemetría Rural ESP-NOW y Doble Capa Modbus (RTU + TCP)</h2>
      <ul>
        <li><strong>Transporte Inalámbrico P2P de Campo:</strong> Tramas directas MAC-a-MAC <code>ESP-NOW</code> en $2.4\\text{ GHz}$ con cifrado por hardware <strong>AES-128 (CCMP)</strong>, latencia determinista $<4\\text{ ms}$, sin necesidad de routers Wi-Fi ni cobertura celular 4G.</li>
        <li><strong>Integración Industrial PLC/SCADA:</strong> Bus diferencial <strong>RS485 aislado (MAX485, Modbus RTU)</strong> con impedancia terminadora de $120\\;\\Omega$ inmune al ruido $dV/dt$ de variadores de frecuencia (VFD) + servidor <strong>Modbus TCP/IP (Puerto 502)</strong> en punto fijo ($\\times 100$).</li>
      </ul>
    `,

    pt: `
      <h2>1. Escopo e Fundamentos de Engenharia Mecatrônica</h2>
      <p>Este manual documenta toda a formulação matemática, física, agroclimática e eletrônica industrial do <strong>TERRA-SHIFT SCADA</strong>, destinado a engenheiros mecatrônicos, agrônomos, pesquisadores e avaliadores técnicos.</p>

      <div class="callout-info">
        <strong>Filosofia Mecatrônica INANNA:</strong> O sensoriamento remoto orbital domina a escala planetária ($9\\text{ km}$ SMAP a $250\\text{ m}$ MODIS), enquanto a automação industrial garante atuação determinística à prova de falhas ($<5\\text{ ms}$). O TERRA-SHIFT une ambas as escalas em uma arquitetura ciberfísica de malha fechada.
      </div>

      <h2>2. Ingestão Satelital NASA e Regressão Linear Multidecadal</h2>
      <p>Para qualquer coordenada $(\\phi, \\lambda)$, o sistema consulta 21 anos ($2004\\text{–}2024$) na API <code>power.larc.nasa.gov</code>. A precipitação diária corrigida $\\overline{\\text{PRECTOTCORR}}_i$ é convertida em lâmina anual e analisada via <strong>Mínimos Quadrados Ordinários (OLS)</strong>:</p>
      <div class="math-block">$$P_{\\text{anual},i} = 365.25 \\cdot \\overline{\\text{PRECTOTCORR}}_{i}, \\qquad \\beta_1 = \\frac{n\\sum t_i y_i - (\\sum t_i)(\\sum y_i)}{n\\sum t_i^2 - (\\sum t_i)^2}, \\qquad \\Delta_{10} = 10\\beta_1$$</div>

      <h3>2.1 Projeção Regional CMIP6 (2035 e 2050) e Índice de Aptidão ($S_c$)</h3>
      <div class="math-block">$$S_c = \\operatorname{clamp}_{[8,98]}\\Big(0.38\\,f_T(T_{2\\text{m}}) + 0.62\\,f_W(W_{\\text{ef}}, \\theta_{\\text{ef}}) - \\Pi_{\\text{calor}}(T_{\\max}^{\\text{ef}}) - \\Pi_{\\text{geada}}(T_{\\min})\\Big)$$</div>
      <div class="math-block">$$V_{\\text{irrig},c} = 10 \\cdot 0.82 \\cdot \\max\\!\\big(0,\\; W_{\\text{req},c} - 0.78\\,P(t_h)\\big) \\quad [\\text{m}^3\\cdot\\text{ha}^{-1}]$$</div>

      <h2>3. Instrumentação Industrial — Laço 4–20 mA, Lei de Kirchhoff e NAMUR NE43</h2>
      <p>Alimentado em $24\\text{ V DC}$ sobre resistor <em>shunt</em> de precisão $R_{\\text{shunt}} = 165.0\\;\\Omega \\pm 0.1\\%$ e ADC diferencial <code>ADS1115</code> de 16 bits ($0.125\\text{ mV/contagem}$), o orçamento ôhmico permite mais de $6\\text{ km}$ de cabo sem perda de calibração:</p>
      <div class="math-block">$$R_{\\text{cabo}} + 165\\;\\Omega \\le \\frac{24\\text{ V} - 9\\text{ V}}{0.020\\text{ A}} = 750\\;\\Omega, \\qquad V_{\\text{sense}} = I_{\\text{laço}}\\cdot 165.0\\;\\Omega, \\qquad \\text{PV}(\\%) = \\frac{I_{\\text{mA}} - 4.00}{16.00}\\times 100\\%$$</div>

      <table class="doc-table">
        <thead>
          <tr><th>Zona NAMUR NE43</th><th>Corrente ($I_{\\text{laço}}$)</th><th>Tensão Shunt</th><th>Contagens ADS1115</th><th>Diagnóstico e Ação de Segurança</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Cabo Rompido</strong></td><td>$< 3.60\\text{ mA}$</td><td>$< 0.594\\text{ V}$</td><td>$< 4.752$</td><td><code>NE43_UNDERSCALE_FAULT</code> → Trava Relé Seguro, assume backup <code>NASA GWETROOT</code></td></tr>
          <tr><td><strong>Zero Vivo (0.0%)</strong></td><td>$4.00\\text{ mA}$</td><td>$0.660\\text{ V}$</td><td>$5.280$</td><td><code>NE43_HEALTHY</code> → Solo Seco Real ($0.0\\%$) — Aciona Irrigação VFD</td></tr>
          <tr><td><strong>Meia Escala (50.0%)</strong></td><td>$12.00\\text{ mA}$</td><td>$1.980\\text{ V}$</td><td>$15.840$</td><td><code>NE43_HEALTHY</code> → Umidade Ideal ($50.0\\%$) — Bomba em Espera</td></tr>
          <tr><td><strong>Fundo de Escala (100%)</strong></td><td>$20.00\\text{ mA}$</td><td>$3.300\\text{ V}$</td><td>$26.400$</td><td><code>NE43_HEALTHY</code> → Solo Saturado ($100.0\\%$) — Inibe Bombeamento</td></tr>
          <tr><td><strong>Curto no Laço</strong></td><td>$> 20.50\\text{ mA}$</td><td>$> 3.383\\text{ V}$</td><td>$> 27.060$</td><td><code>NE43_OVERSCALE_FAULT</code> → Parada Segura até confirmação <code>Alarm ACK</code></td></tr>
        </tbody>
      </table>
    `
  },

  // =========================================================================
  // MANUAL 02: PLUG & PLAY ZERO-KNOWLEDGE USER GUIDE
  // =========================================================================
  m2: {
    docId: 'INANNA-USR-TS2026-02',
    rev: 'Rev 2.0 — Plug & Play Edition',
    division: 'COMMUNITY GUIDE • FAMILY FARMERS & RURAL SCHOOLS',
    en: `
      <h2>Welcome! No Technical Experience Required</h2>
      <p>You do <strong>not</strong> need to know anything about satellites, electronics, or programming to use <strong>TERRA-SHIFT</strong>. Everything comes pre-configured from the factory so any farmer, family producer, or cooperative member can use it in <strong>under 5 minutes</strong>.</p>

      <div class="callout-ok">
        <strong>What Problem Does It Solve for You?</strong><br/>
        1) Tells you <strong>which crops will earn more money and resist heat/drought</strong> on your exact land.<br/>
        2) Turns your irrigation pump on and off automatically—and <strong>stops water waste immediately if an animal or tractor cuts a sensor wire</strong>.
      </div>

      <h2>Part A — Using the Web Screen in 3 Clicks</h2>
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-num">STEP 1</div>
          <h3>Choose Language &amp; Touch Your Farm</h3>
          <p>At the top right, click <strong>EN</strong>, <strong>ES</strong>, or <strong>PT</strong>. Then click directly on your field on the map (or choose your region in the first box).</p>
        </div>
        <div class="step-card">
          <div class="step-num">STEP 2</div>
          <h3>Read the Traffic-Light Crop Cards</h3>
          <p>Scroll to the crop cards:<br/>
          🟢 <strong>Green:</strong> Safe &amp; profitable crop for your climate.<br/>
          🟡 <strong>Yellow:</strong> Needs drip irrigation or cover crops.<br/>
          🔴 <strong>Red:</strong> High risk of losing harvest to heat/drought.</p>
        </div>
        <div class="step-card">
          <div class="step-num">STEP 3</div>
          <h3>Save Your Paper Plan</h3>
          <p>Click the blue button <strong>"Export PDF Plan"</strong> at the top right to print or save the crop and water guide on your phone to take to the field.</p>
        </div>
      </div>

      <h2>Part B — Installing the Physical Field Kit (Plug &amp; Play)</h2>
      <p>If you have the physical <strong>INANNA Field Box</strong>, there are zero wires to strip and zero Wi-Fi passwords to configure between the field and the shed:</p>
      <ol>
        <li><strong>Push the Solar Stake into the Crop Row:</strong> Push the stainless-steel sensor probe into root depth ($20\\text{–}30\\text{ cm}$) and screw in the waterproof blue plug (it only fits one way!).</li>
        <li><strong>Plug In the Central Box at the Pump Shed:</strong> Connect the power plug ($220\\text{ V}$ or $12\\text{ V}/24\\text{ V}$ battery). The green light turns on automatically—it talks directly to the solar stake up to hundreds of meters away with <strong>no internet and no cellular SIM card</strong>.</li>
        <li><strong>Check from Your Phone in the Pickup Truck:</strong> Even if your farm has zero cell signal, open your phone's Wi-Fi, connect to <code>INANNA-TERRASHIFT-AP</code>, and see soil moisture and pump status live!</li>
      </ol>

      <h2>Everyday Questions (Plain Answers)</h2>
      <table class="doc-table">
        <thead><tr><th>What Happened in the Field?</th><th>What Does TERRA-SHIFT Do Automatically?</th><th>What Should You Do?</th></tr></thead>
        <tbody>
          <tr><td><strong>A fox, cow, or tractor cuts the sensor cable</strong></td><td>Detects the cut wire in milliseconds, <strong>shuts off the pump so it doesn't flood your field</strong>, and uses NASA satellite moisture as backup.</td><td>Plug in a spare cable or splice the plug, then tap the blue button <strong>"✓ SCADA Alarm ACK"</strong>.</td></tr>
          <tr><td><strong>Rural power outage</strong></td><td>Saves all your pump hours and settings safely in internal memory—nothing is erased.</td><td>Nothing! It resumes automatically when power returns.</td></tr>
          <tr><td><strong>No internet at the farm</strong></td><td>Field nodes and pump automation keep working 100% normally without internet.</td><td>Nothing! Satellite forecasts sync next time your phone/PC has signal.</td></tr>
        </tbody>
      </table>
    `,

    es: `
      <h2>¡Bienvenido! Cero Conocimientos Técnicos Necesarios</h2>
      <p><strong>No necesitás saber nada de satélites, cables ni programación</strong> para usar <strong>TERRA-SHIFT</strong>. Todo viene listo de fábrica (*Plug &amp; Play*: enchufar y usar) pensado para el productor agropecuario, cooperativas, escuelas rurales y familias productoras.</p>

      <div class="callout-ok">
        <strong>¿Para qué te sirve en el día a día?</strong><br/>
        1) Te muestra con colores simples <strong>qué cultivos van a rendir mejor y aguantar el calor y la sequía</strong> en tu propio lote.<br/>
        2) Maneja el riego solo sin depender de internet y <strong>frena la bomba al instante si una máquina o un animal corta el cable del sensor</strong>, evitando inundar el cultivo y vaciar la perforación.
      </div>

      <h2>Parte A — Cómo usar la pantalla web en 3 clics</h2>
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-num">PASO 1</div>
          <h3>Elegí Español y Tocá tu Campo</h3>
          <p>Arriba a la derecha tocá el botón <strong>ES</strong>. Después hacé clic sobre tu campo en el mapa (o elegí tu zona, como *Santa Rosa de Calamuchita* o *Río Cuarto*).</p>
        </div>
        <div class="step-card">
          <div class="step-num">PASO 2</div>
          <h3>Mirá el Semáforo de Cultivos</h3>
          <p>Bajá a las tarjetas de cultivos:<br/>
          🟢 <strong>Verde:</strong> Cultivo ideal y rentable para tu clima.<br/>
          🟡 <strong>Amarillo:</strong> Necesita riego por goteo o cobertura.<br/>
          🔴 <strong>Rojo:</strong> Alto riesgo de pérdida por calor o falta de agua.</p>
        </div>
        <div class="step-card">
          <div class="step-num">PASO 3</div>
          <h3>Descargá tu Hoja de Ruta</h3>
          <p>Tocá el botón azul <strong>"Exportar Plan PDF"</strong> arriba a la derecha para guardarlo en el WhatsApp o llevarlo impreso en la camioneta.</p>
        </div>
      </div>

      <h2>Parte B — Instalación de la Caja Física en el Campo (Enchufar y Usar)</h2>
      <p>Si armás el nodo físico abierto del proyecto <strong>TERRA-SHIFT</strong>, no hay que pelar cables ni contratar internet rural:</p>
      <ol>
        <li><strong>Clavá la Estaca Solar en el Surco:</strong> Hundí el pinche metálico a la altura de las raíces ($20\\text{–}30\\text{ cm}$) y enroscá la ficha impermeable (tiene una sola posición, imposible equivocarse).</li>
        <li><strong>Enchufá el Tablero Central en el Galpón/Bomba:</strong> Conectalo a $220\\text{ V}$ o batería $12\\text{ V}/24\\text{ V}$. Ya viene hermanado de fábrica con la estaca solar: se comunican solos por aire <strong>sin router Wi-Fi y sin chip de celular</strong>.</li>
        <li><strong>Miralo desde el Celular en el Lote:</strong> Aunque en el campo tengas cero señal en el teléfono, conectate al Wi-Fi propio de la caja (<code>INANNA-TERRASHIFT-AP</code>) y ves toda la humedad y la bomba en vivo.</li>
      </ol>

      <h2>Preguntas Comunes en el Campo</h2>
      <table class="doc-table">
        <thead><tr><th>¿Qué pasó en el lote?</th><th>¿Qué hace el equipo solo?</th><th>¿Qué tenés que hacer vos?</th></tr></thead>
        <tbody>
          <tr><td><strong>Un zorro, perro, vaca o tractor cortó el cable del sensor</strong></td><td>Se da cuenta en milésimas de segundo, <strong>apaga la bomba para no inundar el lote</strong>, prende aviso rojo y se guía con el satélite de la NASA.</td><td>Cambiás o unís la ficha del cable y tocás el botón azul <strong>"✓ Reconocer Alarma (ACK)"</strong>.</td></tr>
          <tr><td><strong>Se cortó la luz en el campo</strong></td><td>Guarda todas las horas de uso de la bomba y la calibración en su memoria interna; no pierde nada.</td><td>¡Nada! Cuando vuelve la luz sigue trabajando solo.</td></tr>
          <tr><td><strong>No hay internet ni 4G en el establecimiento</strong></td><td>Los sensores y el riego automático siguen funcionando al 100% sin internet.</td><td>¡Nada! Los datos climáticos se actualizan solos cuando pises zona con señal.</td></tr>
        </tbody>
      </table>
    `,

    pt: `
      <h2>Bem-vindo! Nenhum Conhecimento Técnico Necessário</h2>
      <p>Você <strong>não precisa entender nada de satélites, eletrônica ou programação</strong> para usar o <strong>TERRA-SHIFT</strong>. Tudo já vem pronto de fábrica (*Plug &amp; Play*: conectar e usar) para produtores rurais, cooperativas e agricultores familiares.</p>

      <div class="callout-ok">
        <strong>O que ele resolve na prática?</strong><br/>
        1) Mostra com cores simples <strong>quais culturas dão mais retorno e resistem ao calor e à seca</strong> na sua terra.<br/>
        2) Controla a irrigação sem internet e <strong>desliga a bomba na hora se um trator ou animal cortar o cabo do sensor</strong>, evitando alagar a lavoura.
      </div>

      <h2>Parte A — Usando a Tela Web em 3 Cliques</h2>
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-num">PASSO 1</div>
          <h3>Escolha PT e Clique na Fazenda</h3>
          <p>No canto superior direito, clique em <strong>PT</strong>. Depois clique sobre sua propriedade no mapa.</p>
        </div>
        <div class="step-card">
          <div class="step-num">PASSO 2</div>
          <h3>Veja o Semáforo das Culturas</h3>
          <p>🟢 <strong>Verde:</strong> Cultura recomendada e segura.<br/>
          🟡 <strong>Amarelo:</strong> Requer gotejamento ou cobertura.<br/>
          🔴 <strong>Vermelho:</strong> Alto risco climático em sequeiro.</p>
        </div>
        <div class="step-card">
          <div class="step-num">PASSO 3</div>
          <h3>Salve seu Plano em PDF</h3>
          <p>Clique no botão azul <strong>"Exportar Plano PDF"</strong> para levar no celular ou impresso até a lavoura.</p>
        </div>
      </div>

      <h2>Parte B — Instalação Física no Campo (Plug &amp; Play)</h2>
      <ol>
        <li><strong>Finque a Estaca Solar na Lavoura:</strong> Coloque a sonda na profundidade da raiz ($20\\text{–}30\\text{ cm}$) e rosqueie o conector à prova d'água.</li>
        <li><strong>Ligue a Caixa Central no Galpão da Bomba:</strong> Conecte na tomada ($220\\text{ V}$ ou bateria $12\\text{ V}/24\\text{ V}$). Ela já conversa direto com a estaca <strong>sem Wi-Fi e sem chip de celular</strong>.</li>
        <li><strong>Acompanhe na Caminhonete:</strong> Mesmo sem sinal de celular na roça, conecte no Wi-Fi próprio da caixa (<code>INANNA-TERRASHIFT-AP</code>) para ver tudo na hora!</li>
      </ol>
    `
  },

  // =========================================================================
  // MANUAL 03: INDUSTRIAL MECHATRONIC MAINTENANCE MANUAL
  // =========================================================================
  m3: {
    docId: 'INANNA-MNT-TS2026-03',
    rev: 'Rev 2.0 — ISO 14224 / RCM / NAMUR NE43',
    division: 'ELECTROMECHANICAL SAFETY • PREVENTIVE & PREDICTIVE CBM',
    en: `
      <h2>1. Industrial Mechatronic Maintenance Strategy (RCM &amp; TPM)</h2>
      <p>Designed under <strong>Reliability-Centered Maintenance (RCM)</strong> and <strong>ISO 14224</strong> standards by <strong>Fabio Maximiliano Medina Rojas (Higher Technician in Mechatronics)</strong>, TERRA-SHIFT integrates electromechanical pump maintenance, hydraulic network diagnostics, and industrial instrumentation metrology into four structured tiers: <strong>Preventive, Predictive (CBM), Corrective, and Metrological Calibration</strong>.</p>

      <div class="callout-warn">
        <strong>MANDATORY LOTO SAFETY RULE (Lockout / Tagout):</strong> Before opening the VFD pump cabinet or disconnecting RS485/24V DC terminals, de-energize the main circuit breaker, apply physical padlock + tag, and verify $0.0\\text{ V AC/DC}$ with a CAT III/IV True-RMS multimeter.
      </div>

      <h2>2. Preventive Maintenance Schedule (Driven by NVS Register <code>40002</code>)</h2>
      <p>Non-volatile Flash memory (ESP32 NVS) retains exact VFD pump operating hours (Holding Register <code>40002</code>) and start/stop cycles (<code>40003</code>) across power blackouts:</p>
      <table class="doc-table">
        <thead>
          <tr><th>Interval / NVS Trigger</th><th>Subsystem</th><th>Mechatronic Preventive Procedure</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Every 250 h / Quarterly</strong></td><td>Solar Field Nodes &amp; Drip Filters</td><td>Clean photovoltaic glass with deionized water; flush primary mesh/disc irrigation filters; inspect IP67 M12 cable glands and desiccants.</td></tr>
          <tr><td><strong>Every 750 h / Semi-Annual</strong></td><td>Electrical Cabinet &amp; RS485 Bus</td><td>Re-torque DIN terminal blocks to $0.5\\text{ N}\\cdot\\text{m}$; verify $120\\;\\Omega$ termination resistors at both ends of RS485 A/B twisted pair; inspect VFD cooling fans.</td></tr>
          <tr><td><strong>Every 1,500 h (SCADA Service Alert)</strong></td><td>Centrifugal Pump &amp; Seals</td><td>Inspect mechanical shaft seal for weeping, measure motor bearing vibration/temperature, replace worn O-rings, then execute <strong><code>⟲ Service Reset NVS</code></strong> on SCADA console.</td></tr>
          <tr><td><strong>Every 3,000 h / Annual</strong></td><td>LiFePO4 Energy &amp; Earthing</td><td>Capacity-test node batteries ($V_{\\text{bus}} \\ge 12.8\\text{ V}$ under load); measure surge ground rod resistance ($R_{\\text{earth}} < 10\\;\\Omega$).</td></tr>
        </tbody>
      </table>

      <h2>3. Predictive / Condition-Based Maintenance (CBM Analytics)</h2>
      <p>TERRA-SHIFT anticipates electromechanical and hydraulic failures <em>before</em> crop loss or equipment breakdown by cross-analyzing three real-time signatures:</p>
      <ol>
        <li><strong>Emitter Clogging &amp; Biofouling Prediction (Orbital-Ground Divergence):</strong> When Modbus Register <code>30002</code> (Ground 4–20 mA moisture) diverges downward by $>24\\%$ from Register <code>30003</code> (NASA <code>GWETROOT</code> regional moisture) despite VFD pump activation, the SCADA flags localized drip-emitter calcification or root-zone channeling prior to visible leaf wilting (<code>NDVI</code> drop).</li>
        <li><strong>Pump Cavitation &amp; Mainline Rupture Prediction (Register <code>30004</code> Pressure):</strong>
          <ul>
            <li><em>Rising head pressure ($>5.5\\text{ bar}$) at nominal VFD RPM:</em> Predicts progressive filter clogging—schedule backwash before VFD over-current trip.</li>
            <li><em>Sudden pressure drop ($<1.8\\text{ bar}$) during active cycle:</em> Indicates burst sub-main polyethylene pipe or air suction/cavitation—triggers immediate pump protection.</li>
          </ul>
        </li>
        <li><strong>RF Link &amp; Battery Degradation Trend:</strong> Monitoring <code>ESP-NOW RSSI</code> ($\\text{dBm}$) detects seasonal canopy attenuation (maize/vine growth requiring antenna mast elevation) while $\\Delta V/\\Delta t$ night discharge slopes predict battery sulfation/aging.</li>
      </ol>

      <h2>4. Corrective Maintenance &amp; NAMUR NE43 Troubleshooting Matrix</h2>
      <table class="doc-table">
        <thead>
          <tr><th>SCADA Symptom / Code</th><th>Measured Electrical Value</th><th>Root Cause</th><th>Corrective Action &amp; Rearm Protocol</th></tr>
        </thead>
        <tbody>
          <tr><td><code>NE43_UNDERSCALE_FAULT</code><br/>(Reg <code>30005 = 2</code>)</td><td>$I_{\\text{loop}} < 3.60\\text{ mA}$<br/>($V_{\\text{shunt}} < 0.594\\text{ V}$)</td><td>Severed field cable, blown $100\\text{ mA}$ loop fuse, or dead 24V DC PSU.</td><td>1. Measure 24V DC bus.<br/>2. Splice/replace twisted pair with IP68 gel sleeve.<br/>3. Verify $I \\in [4,20]\\text{ mA}$.<br/>4. Click <strong><code>✓ SCADA Alarm ACK</code></strong> to release Coil <code>00002</code>.</td></tr>
          <tr><td><code>NE43_OVERSCALE_FAULT</code><br/>(Reg <code>30005 = 3</code>)</td><td>$I_{\\text{loop}} > 20.50\\text{ mA}$<br/>($V_{\\text{shunt}} > 3.383\\text{ V}$)</td><td>Water ingress shorting M12 pins or bypassed transmitter regulator.</td><td>1. Disconnect probe; dry M12 connector with contact cleaner.<br/>2. Inject $12.00\\text{ mA}$ test current.<br/>3. Replace probe if internally shorted; execute <strong><code>Alarm ACK</code></strong>.</td></tr>
          <tr><td>Modbus RTU CRC Errors</td><td>RS485 $|V_A - V_B| < 200\\text{ mV}$</td><td>Swapped A/B polarity, missing $120\\;\\Omega$ terminator, or VFD shield ground loop.</td><td>Ground cable shield at <strong>Gateway end ONLY</strong> (single-point earthing to block ground loops) and verify A(+)/B(-) polarity.</td></tr>
        </tbody>
      </table>

      <h2>5. Annual Metrological 2-Point Loop Calibration Procedure</h2>
      <ol>
        <li>Disconnect sensor probe at NODE terminal and connect a certified <strong>Precision 4–20 mA Loop Calibrator</strong>.</li>
        <li><strong>Zero Point ($4.000\\text{ mA}$):</strong> Confirm $V_{\\text{shunt}} = 0.660\\text{ V} \\pm 0.001\\text{ V}$ across the $165.0\\;\\Omega\\text{ }0.1\\%$ resistor and Modbus Register <code>30002 = 0</code> ($0.00\\%$).</li>
        <li><strong>Mid Point ($12.000\\text{ mA}$):</strong> Confirm $V_{\\text{shunt}} = 1.980\\text{ V} \\pm 0.002\\text{ V}$ and Register <code>30002 = 5000</code> ($50.00\\%$).</li>
        <li><strong>Span Point ($20.000\\text{ mA}$):</strong> Confirm $V_{\\text{shunt}} = 3.300\\text{ V} \\pm 0.003\\text{ V}$ and Register <code>30002 = 10000</code> ($100.00\\%$).</li>
        <li><strong>Safety Trip Verification:</strong> Step calibrator down to $3.40\\text{ mA}$ and confirm Coil <code>00002</code> (Safety Interlock Relay) trips in $<100\\text{ ms}$.</li>
      </ol>
    `,

    es: `
      <h2>1. Estrategia Integral de Mantenimiento Industrial Mecatrónico (RCM / TPM)</h2>
      <p>Desarrollado bajo lineamientos de <strong>Mantenimiento Centrado en Confiabilidad (RCM)</strong>, <strong>TPM</strong> y norma <strong>ISO 14224</strong> por <strong>Fabio Maximiliano Medina Rojas (Técnico Superior en Mecatrónica)</strong>, este manual estructura la gestión técnica del equipamiento electromecánico, hidráulico e IIoT en los 4 pilares de la industria moderna: <strong>Preventivo, Predictivo (CBM), Correctivo y Proactivo/Metrológico</strong>.</p>

      <div class="callout-warn">
        <strong>PROTOCOLO OBLIGATORIO DE SEGURIDAD LOTO (Bloqueo y Etiquetado):</strong> Antes de intervenir el tablero del variador de frecuencia (VFD), bomba centrífuga o borneras de $24\\text{ V DC}$ / RS485, seccionar alimentación general, colocar candado y tarjeta personal LOTO, y verificar ausencia de tensión ($0.0\\text{ V}$) con multímetro True-RMS CAT III/IV.
      </div>

      <h2>2. Mantenimiento Preventivo Sistemático (Guiado por Horómetro NVS <code>40002</code>)</h2>
      <p>La memoria no volátil Flash (NVS del ESP32) conserva intactas las horas reales de marcha de bomba (Holding Register <code>40002</code>) y el contador de arranques/ciclos (<code>40003</code>) ante cortes eléctricos rurales:</p>
      <table class="doc-table">
        <thead>
          <tr><th>Frecuencia / Horómetro</th><th>Subsistema</th><th>Procedimiento Mecatrónico Preventivo</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Cada 250 h / Trimestral</strong></td><td>Nodos Solares y Filtrado</td><td>Limpieza de paneles solares sin abrasivos; retrolavado de filtros de anillas/malla en cabezal de riego; inspección de prensaestopas <code>IP67</code> y conectores M12.</td></tr>
          <tr><td><strong>Cada 750 h / Semestral</strong></td><td>Tablero Eléctrico y Bus RS485</td><td>Reapriete dinamométrico de borneras DIN a $0.5\\text{ N}\\cdot\\text{m}$; verificación de resistencias terminadoras de $120\\;\\Omega$ en extremos del par trenzado RS485; limpieza de forzadores del VFD.</td></tr>
          <tr><td><strong>Cada 1.500 h (Alerta Servicio SCADA)</strong></td><td>Bomba Centrífuga y Sellos</td><td>Inspección de goteo en sello mecánico de eje, control térmico/acústico de rodamientos de motor, reemplazo de O-rings y ejecución del comando <strong><code>⟲ Reset Servicio NVS</code></strong> en consola SCADA.</td></tr>
          <tr><td><strong>Cada 3.000 h / Anual</strong></td><td>Banco LiFePO4 y Puesta a Tierra</td><td>Ensayo de descarga controlada de baterías de nodo ($V_{\\text{bus}} \\ge 12.8\\text{ V}$) y medición con telurímetro de jabalina de descargadores atmosféricos ($R_{\\text{PAT}} < 10\\;\\Omega$).</td></tr>
        </tbody>
      </table>

      <h2>3. Mantenimiento Predictivo / Basado en Condición (CBM)</h2>
      <p>TERRA-SHIFT detecta degradaciones electromecánicas e hidráulicas incipientes <em>antes</em> de que ocurra la parada de planta o el daño al cultivo mediante 3 firmas analíticas:</p>
      <ol>
        <li><strong>Predicción de Obturación Calcárea de Goteros (Divergencia Satélite vs. Tierra):</strong> Cuando el Registro <code>30002</code> (humedad 4–20 mA en surco) cae más de un $24\\%$ por debajo del Registro <code>30003</code> (humedad regional <code>NASA GWETROOT</code>) pese a activarse el riego, el sistema diagnostica taponamiento local de emisores antes de que caiga el índice fotosintético <code>MODIS NDVI</code>.</li>
        <li><strong>Predicción de Cavitación de Bomba y Rotura de Matriz (Registro <code>30004</code> Presión):</strong>
          <ul>
            <li><em>Tendencia alcista de presión ($>5.5\\text{ bar}$) a iguales RPM del VFD:</em> Predice colmatación progresiva de filtros antes de disparar falla por sobrecorriente en el variador.</li>
            <li><em>Caída abrupta de presión ($<1.8\\text{ bar}$) con bomba activa:</em> Detecta rotura de cañería madre o entrada de aire/cavitación, protegiendo el impulsor y sello mecánico.</li>
          </ul>
        </li>
        <li><strong>Tendencia de Atenuación RF y Degradación Electroquímica:</strong> La curva histórica de <code>RSSI</code> en <code>ESP-NOW</code> anticipa apantallamiento por crecimiento de follaje (maíz/vid) y la pendiente nocturna $\\Delta V/\\Delta t$ anticipa pérdida de capacidad útil en celdas solares.</li>
      </ol>

      <h2>4. Mantenimiento Correctivo y Matriz de Diagnóstico NAMUR NE43</h2>
      <table class="doc-table">
        <thead>
          <tr><th>Alarma / Código SCADA</th><th>Medición Eléctrica en Campo</th><th>Causa Raíz Probable</th><th>Acción Correctiva y Protocolo de Rearme</th></tr>
        </thead>
        <tbody>
          <tr><td><code>NE43_UNDERSCALE_FAULT</code><br/>(Reg <code>30005 = 2</code>)</td><td>$I_{\\text{lazo}} < 3.60\\text{ mA}$<br/>($V_{\\text{shunt}} < 0.594\\text{ V}$)</td><td>Cable cortado por maquinaria/roedores, fusible de $100\\text{ mA}$ abierto o fuente $24\\text{ V DC}$ sin tensión.</td><td>1. Medir fuente $24\\text{ V DC}$.<br/>2. Empalmar par con manguito estanco en gel <code>IP68</code>.<br/>3. Verificar $I \\in [4,20]\\text{ mA}$ en serie.<br/>4. Ejecutar <strong><code>✓ Reconocer Alarma (ACK)</code></strong> para liberar Coil <code>00002</code>.</td></tr>
          <tr><td><code>NE43_OVERSCALE_FAULT</code><br/>(Reg <code>30005 = 3</code>)</td><td>$I_{\\text{lazo}} > 20.50\\text{ mA}$<br/>($V_{\\text{shunt}} > 3.383\\text{ V}$)</td><td>Ingreso de agua/sulfatación en ficha M12 o cortocircuito en par de lazo.</td><td>1. Desconectar sonda y limpiar ficha M12 con limpiacontactos dieléctrico.<br/>2. Inyectar $12.00\\text{ mA}$ patrón.<br/>3. Reemplazar transmisor si está en corto y dar <strong><code>Alarm ACK</code></strong>.</td></tr>
          <tr><td>Errores CRC en Modbus RTU</td><td>$|V_A - V_B| < 200\\text{ mV}$ en RS485</td><td>Polaridad A/B invertida, falta de terminador $120\\;\\Omega$ o lazo de masa en malla blindada.</td><td>Conectar malla del cable blindado a tierra <strong>únicamente del lado Gateway</strong> (evita corrientes parásitas) y verificar par A(+)/B(-).</td></tr>
        </tbody>
      </table>

      <h2>5. Calibración Metrológica Proactiva de Lazo ( Contraste de 3 Puntos)</h2>
      <ol>
        <li>Desconectar el transmisor de campo e insertar un <strong>Calibrador Patrón de Lazo 4–20 mA</strong> certificado.</li>
        <li><strong>Punto Cero Vivo ($4.000\\text{ mA}$):</strong> Comprobar $V_{\\text{shunt}} = 0.660\\text{ V} \\pm 0.001\\text{ V}$ sobre $R_{\\text{shunt}} = 165.0\\;\\Omega\\text{ }0.1\\%$ y Registro Modbus <code>30002 = 0</code> ($0.00\\%$).</li>
        <li><strong>Punto Medio ($12.000\\text{ mA}$):</strong> Comprobar $V_{\\text{shunt}} = 1.980\\text{ V} \\pm 0.002\\text{ V}$ y Registro <code>30002 = 5000</code> ($50.00\\%$).</li>
        <li><strong>Fondo de Escala ($20.000\\text{ mA}$):</strong> Comprobar $V_{\\text{shunt}} = 3.300\\text{ V} \\pm 0.003\\text{ V}$ y Registro <code>30002 = 10000</code> ($100.00\\%$).</li>
        <li><strong>Ensayo de Disparo Seguro NAMUR NE43:</strong> Bajar el calibrador a $3.40\\text{ mA}$ y certificar la apertura inmediata ($<100\\text{ ms}$) de bomba y activación de Coil <code>00002</code>.</li>
      </ol>
    `,

    pt: `
      <h2>1. Estratégia de Manutenção Industrial Mecatrônica (RCM / TPM / ISO 14224)</h2>
      <p>Elaborado por <strong>Fabio Maximiliano Medina Rojas (Técnico Superior em Mecatrônica)</strong>, este manual estrutura a gestão eletromecânica, hidráulica e IIoT em 4 níveis industriais: <strong>Manutenção Preventiva, Preditiva (CBM), Corretiva e Calibração Metrológica</strong>.</p>

      <div class="callout-warn">
        <strong>REGRA DE SEGURANÇA LOTO (Bloqueio e Etiquetagem):</strong> Antes de intervir no painel do inversor VFD ou bornes $24\\text{ V DC}$ / RS485, desligue o disjuntor geral, aplique cadeado LOTO e confirme $0.0\\text{ V}$ com multímetro True-RMS CAT III/IV.
      </div>

      <h2>2. Manutenção Preventiva (Guiada pelo Horímetro NVS <code>40002</code>)</h2>
      <table class="doc-table">
        <thead><tr><th>Intervalo / Horímetro</th><th>Subsistema</th><th>Procedimento Preventivo</th></tr></thead>
        <tbody>
          <tr><td><strong>Cada 250 h / Trimestral</strong></td><td>Nós Solares e Filtros</td><td>Limpeza dos painéis solares; retrolavagem dos filtros de disco/tela; inspeção de prensa-cabos <code>IP67</code> e conectores M12.</td></tr>
          <tr><td><strong>Cada 750 h / Semestral</strong></td><td>Painel e Barramento RS485</td><td>Reaperto de bornes DIN ($0.5\\text{ N}\\cdot\\text{m}$); verificação dos resistores terminadores de $120\\;\\Omega$ nas extremidades do par RS485.</td></tr>
          <tr><td><strong>Cada 1.500 h (Alerta SCADA)</strong></td><td>Bomba Centrífuga e Selos</td><td>Inspeção do selo mecânico, vibração/temperatura dos rolamentos e execução do comando <strong><code>⟲ Reset Manutenção NVS</code></strong> no SCADA.</td></tr>
          <tr><td><strong>Cada 3.000 h / Anual</strong></td><td>Baterias LiFePO4 e Aterramento</td><td>Teste de carga das baterias ($V_{\\text{bus}} \\ge 12.8\\text{ V}$) e medição da haste de aterramento ($R_{\\text{terra}} < 10\\;\\Omega$).</td></tr>
        </tbody>
      </table>

      <h2>3. Manutenção Preditiva / Baseada em Condição (CBM)</h2>
      <ul>
        <li><strong>Predição de Entupimento de Gotejadores:</strong> Divergência $>24\\%$ entre o Registrador <code>30002</code> (sonda 4–20 mA) e <code>30003</code> (umidade orbital <code>NASA GWETROOT</code>) antecipa calcificação local antes de queda no <code>NDVI</code>.</li>
        <li><strong>Predição de Cavitação e Ruptura Hidráulica (Registrador <code>30004</code>):</strong> Pressão $>5.5\\text{ bar}$ indica saturação de filtros; queda súbita $<1.8\\text{ bar}$ indica ruptura de tubulação ou cavitação na bomba VFD.</li>
      </ul>

      <h2>4. Manutenção Corretiva (Matriz NAMUR NE43) e Calibração de 3 Pontos</h2>
      <table class="doc-table">
        <thead><tr><th>Código SCADA</th><th>Leitura Elétrica</th><th>Causa Raiz</th><th>Ação Corretiva e Rearme</th></tr></thead>
        <tbody>
          <tr><td><code>NE43_UNDERSCALE_FAULT</code></td><td>$I < 3.60\\text{ mA}$ ($<0.594\\text{ V}$)</td><td>Cabo rompido, fusível aberto ou falha na fonte $24\\text{ V DC}$.</td><td>Reparar cabo com emenda gel <code>IP68</code>, validar $4\\text{–}20\\text{ mA}$ e clicar em <strong><code>✓ Confirmar Alarme (ACK)</code></strong>.</td></tr>
          <tr><td><code>NE43_OVERSCALE_FAULT</code></td><td>$I > 20.50\\text{ mA}$ ($>3.383\\text{ V}$)</td><td>Umidade no conector M12 ou curto no par.</td><td>Limpar conector M12, testar com calibrador $12.00\\text{ mA}$ e executar <strong><code>Alarm ACK</code></strong>.</td></tr>
        </tbody>
      </table>
    `
  }
};

window.MANUALS_UI.en.tab4 = '📕 Report 04: PC-Only to Agro-Industry Tiers + 6 Solar LoRa + ESP32 Devices';
window.MANUALS_UI.es.tab4 = '📕 Informe 04: Escala PC Familiar a Agroindustria + 6 Nodos Solares LoRa + ESP32';
window.MANUALS_UI.pt.tab4 = '📕 Relatório 04: Escala PC Familiar à Agroindústria + 6 Nós Solares LoRa + ESP32';

window.MANUALS_CONTENT.m4 = {
  docId: 'INANNA-ECO-TS2026-04',
  rev: 'Rev 2.0 — NASA Space Apps 2026',
  division: 'INCLUSIVE ADOPTION TIERS • SOLAR LoRa 915 MHz + ESP32 ECOSYSTEM',
  en: `
    <h2>1. Three Inclusive Adoption Tiers: From a Single Family PC to Large Agribusiness</h2>
    <p><strong>TERRA-SHIFT SCADA</strong> is designed so nobody is left behind—scaling seamlessly from a family smallholder who <strong>only owns a basic PC (zero hardware required)</strong> up to 10,000-hectare industrial agribusinesses:</p>
    <div class="steps-grid">
      <div class="step-card">
        <div class="step-num">🌱 TIER 1 • ZERO HARDWARE (PC OR PHONE ONLY)</div>
        <strong style="color:#fff;">Smallholder &amp; Family Farmers (0.5 – 15 ha)</strong>
        <p style="margin-top:8px;font-size:0.86rem;">Requires <strong>zero sensors or electronics</strong>. With just a basic PC (cached offline as a PWA after one town/school internet visit), the farmer clicks their plot on the map, receives 20-year <strong>NASA POWER + SMAP + MODIS</strong> diagnostics, sees which resilient crops to plant for 2035–2050, views a 12-month frost/irrigation calendar, and prints a 1-click PDF field plan.</p>
      </div>
      <div class="step-card">
        <div class="step-num">🚜 TIER 2 • PLUG &amp; PLAY USB / LOCAL AP</div>
        <strong style="color:#fff;">Medium Farms, Rural Schools &amp; Cooperatives (15 – 200 ha)</strong>
        <p style="margin-top:8px;font-size:0.86rem;">Using that same PC and our 4-second automatic flasher (<code>FLASHEAR_ESP32_TERRASHIFT.bat</code>), farmers or rural students plug in an <strong>ESP32 Gateway via USB WebSerial</strong> (or Wi-Fi AP <code>192.168.4.1</code>) and add 1 to 5 autonomous Solar + LoRa/ESP-NOW field nodes for frost alerts, latching drip valves, or tank monitoring.</p>
      </div>
      <div class="step-card">
        <div class="step-num">🏭 TIER 3 • FULL INDUSTRIAL SCADA &amp; PLC</div>
        <strong style="color:#fff;">Large Agribusiness &amp; Estates (200 – 10,000+ ha)</strong>
        <p style="margin-top:8px;font-size:0.86rem;">Deploys dozens of <strong>Solar + LoRa 915 MHz (15–30 km)</strong> nodes, hilltop mesh repeaters, and silobag lances across vast properties, bridging directly over <strong>Modbus TCP (Port 502) &amp; isolated RS485</strong> into existing industrial PLCs (Siemens, Allen-Bradley, Schneider), 100 HP VFD pump stations, and enterprise SCADA historians.</p>
      </div>
    </div>

    <h2>2. The 6 Modular Off-Grid Field Devices (Shared Solar + LoRa 915 MHz + ESP32 Core)</h2>
    <p>Every field module plugs into the exact same open-hardware <strong>ESP32 + Solar Panel + LiFePO4 (15 µA Deep Sleep) + LoRa 915 MHz / ESP-NOW + 4–20 mA / RS485</strong> motherboard:</p>

    <h3>1. ❄️ Solar Frost &amp; Thermal-Inversion Sentinel Node (Ideal for Calamuchita, Vine, Olive &amp; Chickpea)</h3>
    <ul>
      <li><strong>What it solves:</strong> NASA satellites measure macro valley temperature, but cold air pools inside mountain hollows ($-2\\;^\\circ\\text{C}$) and destroys entire blossoms in a single dawn.</li>
      <li><strong>Hardware stack:</strong> Solar ESP32 + LoRa + <strong>two industrial PT100 (4–20 mA) probes</strong> (one at $40\\text{ cm}$ and one at $1.80\\text{ m}$ to detect thermal inversion) + magnetic <em>Reed Switch</em> cup anemometer &amp; tipping-bucket rain gauge (counts pulses waking ESP32 with zero idle battery drain!).</li>
      <li><strong>Zero-signal action:</strong> Upon detecting a rapid drop toward dew-point freezing, fires a <strong>15 km LoRa alert</strong> to the farmhouse and triggers anti-frost micro-sprinklers automatically.</li>
    </ul>

    <h3>2. 🚰 Solar Bi-Stable Latching Solenoid Valve + Burst-Pipe Detector Node</h3>
    <ul>
      <li><strong>What it solves:</strong> Standard solenoids draw continuous current and drain solar batteries. A <strong>bi-stable Latching Solenoid (9V/12V DC)</strong> opens with a single <strong>50 ms pulse</strong> and stays open for hours on an internal magnet drawing <strong>0.00 mA</strong>, closing with an inverted 50 ms H-bridge pulse (<code>DRV8871</code>).</li>
      <li><strong>Mechatronic bonus:</strong> Paired with a main-line pulse or 4–20 mA flowmeter: if the valve opened but flow is zero (clogged filter), or if flow spikes 2× (animal ruptured a drip line), it <strong>autonomously shuts that branch</strong> and sends a LoRa alarm so the tank never drains.</li>
    </ul>

    <h3>3. 🧪 Solar Soil-Health Node (NPK + Salinity EC + pH) over RS485 Modbus</h3>
    <ul>
      <li><strong>What it solves:</strong> Directly addresses the <em>Field Shift</em> challenge goal of protecting long-term soil health across crop rotations.</li>
      <li><strong>Hardware stack:</strong> Encapsulated <code>IP68</code> multi-parameter agricultural probe wired directly into our ESP32's <strong>RS485 (MAX485)</strong> port (Moisture + Temp + Electrical Conductivity EC + pH + Nitrogen/Phosphorus/Potassium).</li>
      <li><strong>NASA orbital fusion:</strong> When <strong>NASA MODIS NDVI</strong> spots canopy yellowing from orbit, this ground probe immediately confirms whether the cause is <strong>water stress, well-water salinization, or nutrient depletion</strong>.</li>
    </ul>

    <h3>4. 🌊 Solar Australian-Tank, Livestock Trough &amp; Deep-Well Level Monitor (4–20 mA)</h3>
    <ul>
      <li><strong>What it solves:</strong> In summer, aquifers drop or remote tanks 5 km away run dry—causing submersible pumps to cavitate and burn out, or leaving cattle without water in distant pastures.</li>
      <li><strong>Hardware stack:</strong> <strong>Submersible stainless-steel hydrostatic level transmitter (4–20 mA)</strong> lowered into the tank or well casing + Solar ESP32 + LoRa.</li>
      <li><strong>Industrial safety:</strong> Interlocks the pump before dry-running, and if the cable at the windmill/tank is severed, triggers <strong>NAMUR NE43 (&lt; 3.6 mA)</strong> immediately.</li>
    </ul>

    <h3>5. 🏔️ Hilltop Solar Mesh Repeater + Tractor / Pickup Cab Portable Monitor</h3>
    <ul>
      <li><strong>For rugged terrain without line-of-sight (Calamuchita / Traslasierra):</strong> A 300-gram <code>IP67</code> weatherproof box on a ridge post (ESP32 + LoRa 915 MHz + 5W Solar Panel) with zero sensors—it simply <strong>listens to hidden valley packets and relays them over the mountain up to 25–30 km</strong>.</li>
      <li><strong>Cab Display in Pickup or Tractor:</strong> An ESP32 + LoRa + sunlight-readable OLED/E-Ink screen plugged into the tractor/truck 12V socket. As the farmer drives across zero-cell-service fields, the screen live-harvests the status of every plot, water trough, and valve for kilometers around.</li>
    </ul>

    <h3>6. 🌾 Solar Silobag Grain-Preservation Sentinel Lance (CO₂ + Intergranular Moisture — 100% Río Cuarto!)</h3>
    <ul>
      <li><strong>What it solves:</strong> Across southern Córdoba, entire harvests of maize, soybean, sorghum, and chickpea are stored in field <strong>silobags</strong> with zero power or signal. If wildlife tears the plastic and water enters, grain ferments and <strong>releases CO₂</strong> weeks before spoiling.</li>
      <li><strong>Hardware stack:</strong> Spear probe with <strong>CO₂ + intergranular temperature/humidity sensor</strong> + Solar ESP32 + LoRa 915 MHz. If biological CO₂ rises or moisture spikes, it beams an instant alarm 10 km to the main barn.</li>
    </ul>
  `,

  es: `
    <h2>1. Tres Escalones Inclusivos de Uso: Desde una Sola PC Familiar hasta Grandes Empresas</h2>
    <p><strong>TERRA-SHIFT SCADA</strong> fue diseñado para democratizar la ciencia de la NASA en todo el espectro productivo: desde el pequeño granjero familiar que <strong>solo cuenta con una PC básica (sin comprar ni soldar un solo sensor)</strong> hasta establecimientos agroindustriales de miles de hectáreas:</p>
    <div class="steps-grid">
      <div class="step-card">
        <div class="step-num">🌱 NIVEL 1 • SOLO UNA PC (CERO HARDWARE)</div>
        <strong style="color:#fff;">Granjeros Familiares, Huertas y Pequeños Productores (0.5 – 15 ha)</strong>
        <p style="margin-top:8px;font-size:0.86rem;"><strong>No requiere placas ni sensores.</strong> Con solo una computadora básica (o celular) —que guarda la app offline tras conectarse una vez en el pueblo o escuela—, el productor toca su lote en el mapa, recibe 20 años de clima real <strong>NASA POWER + SMAP + MODIS</strong>, ve qué cultivos resilientes sembrar hacia 2035–2050, consulta su calendario mensual de heladas/riego y descarga en 1 clic su <strong>Plan PDF impreso</strong> para llevar al campo.</p>
      </div>
      <div class="step-card">
        <div class="step-num">🚜 NIVEL 2 • PC + USB / AP LOCAL PLUG &amp; PLAY</div>
        <strong style="color:#fff;">Productores Medianos, Escuelas Agrotécnicas y Cooperativas (15 – 200 ha)</strong>
        <p style="margin-top:8px;font-size:0.86rem;">Usando esa misma PC y nuestro flasheador automático de 4 segundos (<code>FLASHEAR_ESP32_TERRASHIFT.bat</code>), conectan un <strong>ESP32 Gateway por cable USB (WebSerial)</strong> o Wi-Fi propio (<code>192.168.4.1</code>) y suman de a uno los nodos solares abiertos que necesiten: alerta de heladas, electroválvulas biestables o nivel de tanque.</p>
      </div>
      <div class="step-card">
        <div class="step-num">🏭 NIVEL 3 • RED LORA 30 KM + SCADA INDUSTRIAL</div>
        <strong style="color:#fff;">Grandes Empresas Agroindustriales y Estancias (200 – +10.000 ha)</strong>
        <p style="margin-top:8px;font-size:0.86rem;">Despliega decenas de nodos solares <strong>LoRa 915 MHz (15–30 km)</strong>, repetidores en cumbre y lanzas de silobolsa en grandes extensiones, integrándose directo por <strong>Modbus TCP (Puerto 502) y RS485 aislado</strong> a PLCs industriales (Siemens, Schneider, Allen-Bradley), bombas VFD de alta potencia y SCADAs corporativos.</p>
      </div>
    </div>

    <h2>2. Los 6 Dispositivos del Ecosistema Rural sin Señal (Base Universal Solar + LoRa + ESP32)</h2>
    <p>Todos estos dispositivos comparten la misma arquitectura base abierta <strong>ESP32 + Panel Solar (LiFePO4, 15 µA en reposo) + LoRa 915 MHz / ESP-NOW + entradas 4–20 mA / RS485</strong>:</p>

    <h3>1. ❄️ Nodo Solar Centinela de Heladas e Inversión Térmica (Ideal Calamuchita, Vid, Olivo y Garbanzo)</h3>
    <ul>
      <li><strong>Qué resuelve:</strong> El satélite de la NASA ve la temperatura macro del valle, pero en las hondonadas serranas se embolsa el aire helado (-2 °C) y te quema toda la floración en una sola madrugada.</li>
      <li><strong>Qué lleva:</strong> ESP32 Solar + LoRa + 2 sondas industriales PT100 (4–20 mA) (una a 40 cm del suelo y otra a 1.80 m para detectar inversión térmica) + anemómetro y pluviómetro de cazoletas por contacto magnético Reed Switch (¡cuenta pulsos despertando al ESP32 sin gastar batería!).</li>
      <li><strong>Qué hace sin señal:</strong> Cuando detecta caída brusca al punto de rocío, dispara alerta por LoRa a 15 km hasta el casco y activa solo el riego anti-helada.</li>
    </ul>

    <h3>2. 🚰 Nodo Solar de Electroválvulas Latch (Biestables) + Detección de Caño Roto</h3>
    <ul>
      <li><strong>Qué resuelve:</strong> Una electroválvula común consume corriente todo el tiempo y agota cualquier batería solar. En cambio, una electroválvula Latch (biestable de pulso 9V/12V DC) abre con un pulso de 50 milisegundos y queda abierta horas con un imán interno consumiendo 0.00 mA, y cierra con otro pulso invertido de 50 ms (usando un puente H chico tipo DRV8871).</li>
      <li><strong>Plus mecatrónico:</strong> Le sumás un caudalímetro de pulsos o 4–20 mA en la manguera maestra: si la válvula abrió pero no pasa agua (filtro tapado) o si el caudal se dispara al doble (un animal rompió el caño de goteo), cierra sola esa rama y avisa por LoRa para no vaciar el tanque.</li>
    </ul>

    <h3>3. 🧪 Nodo Solar de Salud de Suelo (NPK + Salinidad EC + pH) por RS485 Modbus</h3>
    <ul>
      <li><strong>Qué resuelve:</strong> El desafío Field Shift pide específicamente proteger la salud del suelo en las rotaciones.</li>
      <li><strong>Qué lleva:</strong> Una sonda agrícola encapsulada IP68 conectada directo al puerto RS485 (MAX485) que ya tiene nuestro ESP32 (Humedad + Temperatura + Conductividad Eléctrica EC + pH + Nitrógeno/Fósforo/Potasio).</li>
      <li><strong>Fusión brutal con la NASA:</strong> Cuando el satélite NASA MODIS NDVI detecta desde el espacio que un sector del lote se está poniendo amarillo, este nodo te confirma desde abajo si es estrés hídrico, salinización por agua de pozo dura o falta de nutrientes.</li>
    </ul>

    <h3>4. 🌊 Monitor Solar de Tanque Australiano, Aguadas y Nivel Dinámico de Pozo (4–20 mA)</h3>
    <ul>
      <li><strong>Qué resuelve:</strong> En verano baja la napa o se vacía el tanque australiano a 5 km de la casa; la bomba sumergible chupa aire (cavitación) y se quema, o la hacienda se queda sin bebida en el potrero lejano.</li>
      <li><strong>Qué lleva:</strong> Transmisor hidrostático sumergible de acero inoxidable (4–20 mA) tirado al fondo del tanque australiano o dentro del caño camisa de la perforación + ESP32 Solar + LoRa.</li>
      <li><strong>Seguridad industrial:</strong> Bloquea el arranque de la bomba antes de trabajar en seco y, si se corta el cable en el molino/tanque, salta NAMUR NE43 (&lt; 3.6 mA).</li>
    </ul>

    <h3>5. 🏔️ Posta Repetidora Solar de Cumbre (Mesh Repeater) + Monitor Portátil en Tractor/Chata</h3>
    <ul>
      <li><strong>Para zonas quebradas sin línea de vista (Calamuchita / Traslasierra):</strong> Una cajita estanca IP67 de 300 gramos en lo alto de un poste o loma (ESP32 + LoRa 915 MHz + Panelcito Solar de 5W) que no tiene sensores: solo escucha los paquetes del valle oculto y los salta por arriba del cerro hasta 25–30 km.</li>
      <li><strong>Pantalla en la Chata o Tractor:</strong> Un ESP32 + LoRa + pantallita OLED/E-Ink enchufado al 12V de la camioneta o tractor. Cuando el productor recorre el campo sin nada de señal celular, la pantallita va levantando en vivo el estado de cada lote, aguada y válvula a kilómetros a la redonda.</li>
    </ul>

    <h3>6. 🌾 Lanza Solar Centinela de Silobolsa (CO₂ + Humedad Intergranular — ¡100% Río Cuarto!)</h3>
    <ul>
      <li><strong>Qué resuelve:</strong> En todo el sur de Córdoba quedan cosechas enteras de maíz, soja, sorgo y garbanzo guardados en silobolsas en lotes aislados sin luz ni señal. Si entra agua por rotura de un peludo/chancho o sube la humedad, el grano fermenta y emite CO₂ semanas antes de echarse a perder.</li>
      <li><strong>Qué lleva:</strong> Una lanza con sensor CO₂ + temperatura/humedad + ESP32 Solar + LoRa 915 MHz. Si sube el CO₂ por actividad biológica o detecta desgarro, manda alarma directa al casco de la estancia a 10 km.</li>
    </ul>
  `,

  pt: `
    <h2>1. Três Níveis Inclusivos de Adoção: De um Único PC Familiar à Grande Agroindústria</h2>
    <p><strong>TERRA-SHIFT SCADA</strong> democratiza os dados da NASA para todos os perfis rurais — desde o agricultor familiar que <strong>possui apenas um computador básico (zero hardware necessário)</strong> até grandes propriedades agroindustriais:</p>
    <div class="steps-grid">
      <div class="step-card">
        <div class="step-num">🌱 NÍVEL 1 • APENAS UM PC (ZERO HARDWARE)</div>
        <strong style="color:#fff;">Agricultores Familiares e Pequenos Produtores (0,5 – 15 ha)</strong>
        <p style="margin-top:8px;font-size:0.86rem;"><strong>Não exige placas nem sensores.</strong> Com apenas um PC básico (salvo offline como PWA), o produtor clica em sua parcela no mapa, recebe 20 anos de dados <strong>NASA POWER + SMAP + MODIS</strong>, descobre culturas resilientes para 2035–2050, consulta o calendário de 12 meses de geadas/irrigação e imprime o Plano PDF em 1 clique.</p>
      </div>
      <div class="step-card">
        <div class="step-num">🚜 NÍVEL 2 • PC + USB / AP LOCAL PLUG &amp; PLAY</div>
        <strong style="color:#fff;">Médios Produtores, Escolas Técnicas e Cooperativas (15 – 200 ha)</strong>
        <p style="margin-top:8px;font-size:0.86rem;">Usando o mesmo PC e o gravador automático de 4 segundos (<code>FLASHEAR_ESP32_TERRASHIFT.bat</code>), conectam um <strong>ESP32 Gateway via USB WebSerial</strong> ou Wi-Fi local (<code>192.168.4.1</code>) e adicionam nós solares modulares conforme a necessidade.</p>
      </div>
      <div class="step-card">
        <div class="step-num">🏭 NÍVEL 3 • REDE LORA 30 KM + SCADA INDUSTRIAL</div>
        <strong style="color:#fff;">Grandes Empresas Agroindustriais (200 – +10.000 ha)</strong>
        <p style="margin-top:8px;font-size:0.86rem;">Implanta dezenas de nós solares <strong>LoRa 915 MHz (15–30 km)</strong>, repetidores de topo de morro e lanças de silobags, integrando-se via <strong>Modbus TCP (Porta 502) e RS485 isolado</strong> a CLPs industriais, bombas VFD de alta potência e SCADAs corporativos.</p>
      </div>
    </div>

    <h2>2. Os 6 Dispositivos Modulares Rurais sem Sinal (Base Solar + LoRa 915 MHz + ESP32)</h2>
    <h3>1. ❄️ Nó Solar Sentinela de Geadas e Inversão Térmica (Ideal para Calamuchita, Videira, Oliveira e Grão-de-Bico)</h3>
    <ul>
      <li><strong>O que resolve:</strong> O satélite da NASA vê a temperatura macro do vale, mas o ar frio acumula nas baixadas serranas (-2 °C) e queima a florada em uma única madrugada.</li>
      <li><strong>O que leva:</strong> ESP32 Solar + LoRa + 2 sondas industriais PT100 (4–20 mA) (a 40 cm e 1,80 m para detectar inversão térmica) + anemômetro e pluviômetro por Reed Switch (zero consumo em repouso).</li>
      <li><strong>Ação sem sinal:</strong> Dispara alerta LoRa a 15 km até a sede e aciona automaticamente a irrigação antigeada.</li>
    </ul>

    <h3>2. 🚰 Nó Solar de Eletroválvulas Latch (Biestáveis) + Detecção de Tubo Rompido</h3>
    <ul>
      <li><strong>O que resolve:</strong> Solenoides comuns drenam baterias solares. Uma eletroválvula Latch (9V/12V DC) abre com um pulso de 50 ms e permanece aberta por horas consumindo 0,00 mA via ímã interno, fechando com pulso invertido de 50 ms (ponte H DRV8871).</li>
      <li><strong>Diferencial mecatrônico:</strong> Com hidrômetro de pulsos ou 4–20 mA na linha principal: se não houver fluxo (filtro entupido) ou o fluxo dobrar (tubo rompido por animais), fecha o ramal sozinho e envia alarme via LoRa.</li>
    </ul>

    <h3>3. 🧪 Nó Solar de Saúde do Solo (NPK + Salinidade EC + pH) via RS485 Modbus</h3>
    <ul>
      <li><strong>O que resolve:</strong> Atende diretamente à proteção da saúde do solo nas rotações do desafio Field Shift.</li>
      <li><strong>O que leva:</strong> Sonda agrícola IP68 conectada à porta RS485 (MAX485) do ESP32 (Umidade + Temp + Condutividade EC + pH + NPK).</li>
      <li><strong>Fusão com a NASA:</strong> Quando o satélite NASA MODIS NDVI detecta amarelecimento do dossel, este nó confirma no solo se é falta de água, salinização ou deficiência nutricional.</li>
    </ul>

    <h3>4. 🌊 Monitor Solar de Reservatório, Bebedouros e Nível Dinâmico de Poço (4–20 mA)</h3>
    <ul>
      <li><strong>O que resolve:</strong> Evita cavitação e queima de bombas submersas quando o lençol baixa no verão ou falta de água para o gado a 5 km da sede.</li>
      <li><strong>O que leva:</strong> Transmissor hidrostático submersível em inox (4–20 mA) + ESP32 Solar + LoRa, com proteção imediata NAMUR NE43 (&lt; 3,6 mA) contra cabo rompido.</li>
    </ul>

    <h3>5. 🏔️ Repetidor Solar de Topo de Morro (Mesh Repeater) + Monitor Portátil no Trator/Caminhonete</h3>
    <ul>
      <li><strong>Para relevo montanhoso sem visada (Calamuchita / Traslasierra):</strong> Caixa estanque IP67 de 300 g no alto do morro (ESP32 + LoRa 915 MHz + Painel 5W) que retransmite pacotes de vales ocultos por 25–30 km.</li>
      <li><strong>Tela na Caminhonete ou Trator:</strong> ESP32 + LoRa + tela OLED/E-Ink ligada no 12V da cabine, captando ao vivo o status de cada talhão, reservatório e válvula ao percorrer a fazenda sem sinal celular.</li>
    </ul>

    <h3>6. 🌾 Lança Solar Sentinela de Silobag (CO₂ + Umidade Intergranular — 100% Río Cuarto!)</h3>
    <ul>
      <li><strong>O que resolve:</strong> Protege safras inteiras de milho, soja, sorgo e grão-de-bico armazenadas em silobags no campo sem energia nem sinal. Se entrar água por rasgo de animais, o grão fermenta e emite CO₂ semanas antes de apodrecer.</li>
      <li><strong>O que leva:</strong> Lança com sensor CO₂ + temperatura/umidade + ESP32 Solar + LoRa 915 MHz enviando alarme imediato a 10 km até o galpão principal.</li>
    </ul>
  `
};
