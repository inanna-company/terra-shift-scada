# 📘 MANUAL 01 — Ingeniería Científica, Agroclimática y Mecatrónica (TERRA-SHIFT SCADA)

- **Código Documento:** `INANNA-ENG-TS2026-01` (Rev 2.0)
- **Dirección Técnica Mecatrónica:** **Fabio Maximiliano Medina Rojas — Técnico Superior en Mecatrónica**
- **Equipo de Ingeniería (INANNA COMPANY):** Fabio Maximiliano Medina Rojas • Agustín Alejandro Debia • Iván David Coria
- **Divisiones:** `LABS INANNA` • `AI INANNA` • `AUTOMATION INANNA`
- **Versión Interactiva Trilingüe (EN | ES | PT) con Fórmulas KaTeX:** [Abrir Portal Oficial de Manuales](https://inanna-company.github.io/terra-shift-scada/manuals/index.html?doc=m1)

---

## 1. Fundamento Ciberfísico y Alcance

**TERRA-SHIFT SCADA** unifica dos escalas complementarias:
1. **Macroescala Orbital (Teledetección Satelital NASA):** Cobertura global continua (`9 km` en SMAP a `250 m` en MODIS) y reanálisis histórico multidecadal (`NASA POWER` + `NEX-GDDP-CMIP6`).
2. **Microescala Industrial Mecatrónica (Campo Rural):** Instrumentación analógica inmune al ruido en lazo de corriente `4–20 mA` bajo norma **NAMUR NE43**, malla P2P cifrada `ESP-NOW` (`< 4 ms`) y buses industriales `Modbus RTU (RS485)` / `Modbus TCP (Puerto 502)`.

---

## 2. Formulación Matemática Agroclimática y Proyección CMIP6

### 2.1 Integración Hidrológica y Regresión Lineal Multidecadal (OLS)
Para toda coordenada $(\phi, \lambda)$, se procesan 21 años (`2004–2024`) de la API `power.larc.nasa.gov` (`T2M`, `T2M_MAX`, `T2M_MIN`, `PRECTOTCORR`, `GWETROOT`, `ALLSKY_SFC_SW_DWN`):

$$P_{\text{anual},i} = 365.25 \cdot \overline{\text{PRECTOTCORR}}_{i} \quad [\text{mm}\cdot\text{año}^{-1}]$$

$$\beta_1 = \frac{n\sum_{i=1}^{n} t_i y_i - \left(\sum_{i=1}^{n} t_i\right)\left(\sum_{i=1}^{n} y_i\right)}{n\sum_{i=1}^{n} t_i^2 - \left(\sum_{i=1}^{n} t_i\right)^2}, \qquad \Delta_{10} = 10 \cdot \beta_1$$

### 2.2 Escalamiento Regional NASA NEX-GDDP-CMIP6 (2035 y 2050)
Con $\Delta t = t_h - 2026$, bajo `SSP2-4.5` ($\alpha_T = 0.034\;^\circ\text{C/año}$, $k_{\text{ext}} = 1.28$) y `SSP5-8.5` ($\alpha_T = 0.058\;^\circ\text{C/año}$, $k_{\text{ext}} = 1.48$):

$$\Delta T = \alpha_T \cdot \Delta t, \qquad T_{2\text{m}}(t_h) = T_{2\text{m},0} + \Delta T, \qquad T_{\max}(t_h) = T_{\max,0} + k_{\text{ext}}\Delta T$$

$$\theta_{\text{root}}(t_h) = \operatorname{clamp}_{[0.12, 0.85]}\!\Big(\theta_{\text{root},0}\frac{P(t_h)}{P_0} - 0.026\,\Delta T\Big)$$

### 2.3 Índice Compuesto de Aptitud de Cultivos ($S_c$) y Demanda Volumétrica

$$S_c = \operatorname{clamp}_{[8,98]}\Big(0.38\,f_T(T_{2\text{m}}) + 0.62\,f_W(W_{\text{ef}}, \theta_{\text{ef}}) - \Pi_{\text{calor}}(T_{\max}^{\text{ef}}) - \Pi_{\text{helada}}(T_{\min})\Big)$$

$$V_{\text{riego},c} = 10 \cdot \eta_{\text{iiot}} \cdot \max\!\big(0,\; W_{\text{req},c} - 0.78\,P(t_h)\big) \quad [\text{m}^3\cdot\text{ha}^{-1}\cdot\text{año}^{-1}], \quad \eta_{\text{iiot}} = 0.82$$

---

## 3. Física de Instrumentación Industrial — Lazo 4–20 mA y Norma NAMUR NE43

### 3.1 Ley de Kirchhoff y Presupuesto Óhmico en 24 V DC

$$R_{\text{cable}} + R_{\text{shunt}} \le \frac{V_{\text{fuente}} - V_{\min,\text{tx}}}{I_{\max}} = \frac{24.0\text{ V} - 9.0\text{ V}}{0.020\text{ A}} = 750\;\Omega$$

Con $R_{\text{shunt}} = 165.0\;\Omega \pm 0.1\%$ ($15\text{ ppm}/^\circ\text{C}$), quedan $585\;\Omega$ libres para cableado rural (**más de 6 km de par trenzado 20 AWG sin error de caída de tensión**).

### 3.2 Conversión Diferencial 16-Bit (`ADS1115`) y Escala Lineal

$$V_{\text{sense}} = I_{\text{lazo}} \cdot 165.0\;\Omega, \qquad N_{\text{ADC}} = \operatorname{round}\!\left(\frac{V_{\text{sense}}}{0.000125\text{ V}}\right), \qquad \text{PV}(\%) = \frac{I_{\text{lazo}}[\text{mA}] - 4.00}{16.00}\times 100\%$$

| Zona NAMUR NE43 | Corriente ($I_{\text{lazo}}$) | Tensión Shunt ($165\,\Omega$) | Cuentas ADS1115 | Diagnóstico y Seguridad |
| :--- | :--- | :--- | :--- | :--- |
| **Falla Cero Vivo / Cable Cortado** | $< 3.60\text{ mA}$ | $< 0.594\text{ V}$ | $< 4.752$ | `NE43_UNDERSCALE_FAULT` → Enclava Relé Seguro + Respaldo NASA `GWETROOT` |
| **Cero Vivo Sano (0.0%)** | $4.00\text{ mA}$ | $0.660\text{ V}$ | $5.280$ | `NE43_HEALTHY` → Suelo Seco Real ($0\%$) — Activa Riego VFD |
| **Media Escala (50.0%)** | $12.00\text{ mA}$ | $1.980\text{ V}$ | $15.840$ | `NE43_HEALTHY` → Humedad Óptima ($50\%$) — Bomba en Espera |
| **Fondo de Escala (100.0%)** | $20.00\text{ mA}$ | $3.300\text{ V}$ | $26.400$ | `NE43_HEALTHY` → Saturación ($100\%$) — Inhibe Bombeo |
| **Sobreescala / Cortocircuito** | $> 20.50\text{ mA}$ | $> 3.383\text{ V}$ | $> 27.060$ | `NE43_OVERSCALE_FAULT` → Parada Segura hasta `Alarm ACK` |
