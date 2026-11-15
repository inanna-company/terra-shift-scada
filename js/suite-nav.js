/**
 * TERRA-SHIFT SCADA — Universal Suite Navigation & Back-Button Controller (EN | ES | PT)
 * Ensures every page, emulator, video player, slide deck, and manual has full 1-click
 * access to ALL pages in the suite + Back navigation + 100% synchronized language!
 */
(function () {
  const SUITE_NAV_I18N = {
    en: {
      back: '⬅ Back',
      scada: '🛰️ Main SCADA',
      esp32: '🔌 ESP32 Emulator',
      loraSim: '📡 30km LoRa + Cab OLED',
      video: '🎬 29s Video',
      deck: '📊 7-Slide Deck',
      manuals: '📚 Manuals (4)',
      pitch: '🎤 3-Min Pitch Coach',
      jumpTitle: 'SUITE NAVIGATION:'
    },
    es: {
      back: '⬅ Volver Atrás',
      scada: '🛰️ Consola SCADA',
      esp32: '🔌 Emulador ESP32',
      loraSim: '📡 LoRa 30km + Chata OLED',
      video: '🎬 Video 29s',
      deck: '📊 7 Diapositivas',
      manuals: '📚 Manuales (4)',
      pitch: '🎤 Pitch 3:00 + Q&A',
      jumpTitle: 'NAVEGACIÓN RÁPIDA:'
    },
    pt: {
      back: '⬅ Voltar',
      scada: '🛰️ Console SCADA',
      esp32: '🔌 Emulador ESP32',
      loraSim: '📡 LoRa 30km + OLED 12V',
      video: '🎬 Vídeo 29s',
      deck: '📊 7 Slides',
      manuals: '📚 Manuais (4)',
      pitch: '🎤 Pitch 3:00 + Q&A',
      jumpTitle: 'NAVEGAÇÃO RÁPIDA:'
    }
  };

  function getPrefix() {
    const p = window.location.pathname.replace(/\\/g, '/');
    if (p.includes('/esp32/') || p.includes('/video/') || p.includes('/presentation/') || p.includes('/manuals/') || p.includes('/lora/') || p.includes('/pitch/')) {
      return '../';
    }
    return './';
  }

  function getActivePage() {
    const p = window.location.pathname.replace(/\\/g, '/');
    if (p.includes('/esp32/')) return 'esp32';
    if (p.includes('/lora/')) return 'loraSim';
    if (p.includes('/pitch/')) return 'pitch';
    if (p.includes('/video/')) return 'video';
    if (p.includes('/presentation/')) return 'deck';
    if (p.includes('/manuals/')) return 'manuals';
    return 'scada';
  }

  function getCurrentLang() {
    const q = (new URLSearchParams(window.location.search).get('lang') || '').toLowerCase();
    if (['en', 'es', 'pt'].includes(q)) return q;
    const saved = (localStorage.getItem('inanna_lang') || '').toLowerCase();
    if (['en', 'es', 'pt'].includes(saved)) return saved;
    const htmlLang = (document.documentElement.lang || '').toLowerCase().slice(0, 2);
    if (['en', 'es', 'pt'].includes(htmlLang)) return htmlLang;
    return 'en';
  }

  function injectStyles() {
    if (document.getElementById('inannaSuiteNavStyle')) return;
    const st = document.createElement('style');
    st.id = 'inannaSuiteNavStyle';
    st.textContent = `
      .inanna-suite-bar {
        position: sticky;
        top: 0;
        z-index: 9999;
        background: rgba(6, 11, 18, 0.96);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(0, 184, 230, 0.35);
        padding: 7px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        box-shadow: 0 6px 22px rgba(0, 0, 0, 0.55);
      }
      .inanna-suite-links {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
      }
      .inanna-suite-btn {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 5px 11px;
        border-radius: 7px;
        font-size: 0.76rem;
        font-weight: 700;
        text-decoration: none !important;
        color: #cbd5e1;
        background: #111a26;
        border: 1px solid rgba(148, 163, 184, 0.25);
        cursor: pointer;
        transition: all 0.16s ease;
        line-height: 1.25;
      }
      .inanna-suite-btn:hover {
        color: #ffffff;
        border-color: #00b8e6;
        background: #172536;
      }
      .inanna-suite-btn.active-page {
        background: linear-gradient(135deg, rgba(24, 144, 255, 0.28), rgba(0, 184, 230, 0.25));
        color: #ffffff;
        border-color: #00b8e6;
        box-shadow: 0 0 12px rgba(0, 184, 230, 0.28);
      }
      .inanna-suite-btn.back-btn {
        background: #192332;
        color: #fde68a;
        border-color: rgba(245, 158, 11, 0.48);
      }
      .inanna-suite-btn.back-btn:hover {
        background: #273549;
        color: #fff;
        border-color: #fbbf24;
      }
      .inanna-suite-label {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.69rem;
        font-weight: 700;
        color: #00b8e6;
        letter-spacing: 0.04em;
        margin-right: 4px;
      }
      .inanna-suite-footer-dock {
        max-width: 1420px;
        margin: 22px auto 12px;
        padding: 12px 16px;
        border-radius: 12px;
        background: rgba(13, 20, 30, 0.94);
        border: 1px solid rgba(0, 184, 230, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 8px;
      }
      @media print {
        .inanna-suite-bar, .inanna-suite-footer-dock { display: none !important; }
      }
    `;
    document.head.appendChild(st);
  }

  function buildLinksHtml(lang) {
    const t = SUITE_NAV_I18N[lang] || SUITE_NAV_I18N.en;
    const pre = getPrefix();
    const active = getActivePage();
    const items = [
      { id: 'scada',   lbl: t.scada,   href: `${pre}index.html?lang=${lang}` },
      { id: 'esp32',   lbl: t.esp32,   href: `${pre}esp32/index.html?lang=${lang}` },
      { id: 'loraSim', lbl: t.loraSim, href: `${pre}lora/index.html?lang=${lang}` },
      { id: 'video',   lbl: t.video,   href: `${pre}video/index.html?lang=${lang}` },
      { id: 'deck',    lbl: t.deck,    href: `${pre}presentation/deck_7_slides.html?lang=${lang}` },
      { id: 'manuals', lbl: t.manuals, href: `${pre}manuals/index.html?lang=${lang}` },
      { id: 'pitch',   lbl: t.pitch,   href: `${pre}pitch/index.html?lang=${lang}` }
    ];

    const backBtn = `<button type="button" class="inanna-suite-btn back-btn" data-suite-back="1">${t.back}</button>`;
    const navLinks = items.map(it =>
      `<a href="${it.href}" class="inanna-suite-btn ${active === it.id ? 'active-page' : ''}">${it.lbl}</a>`
    ).join('');

    return `<span class="inanna-suite-label">${t.jumpTitle}</span>${backBtn}${navLinks}`;
  }

  function handleSmartBack() {
    const lang = getCurrentLang();
    const pre = getPrefix();
    if (window.history.length > 1 && document.referrer && document.referrer.includes(window.location.host)) {
      window.history.back();
    } else {
      window.location.href = `${pre}index.html?lang=${lang}`;
    }
  }

  function renderSuiteBars(langOverride) {
    injectStyles();
    const lang = ['en', 'es', 'pt'].includes(langOverride) ? langOverride : getCurrentLang();

    let topBar = document.getElementById('inannaSuiteTopBar');
    if (!topBar) {
      topBar = document.createElement('nav');
      topBar.id = 'inannaSuiteTopBar';
      topBar.className = 'inanna-suite-bar';
      topBar.setAttribute('aria-label', 'TERRA-SHIFT Global Navigation');
      document.body.insertBefore(topBar, document.body.firstChild);
    }
    topBar.innerHTML = `<div class="inanna-suite-links">${buildLinksHtml(lang)}</div>`;

    let botBar = document.getElementById('inannaSuiteBotBar');
    if (!botBar) {
      botBar = document.createElement('nav');
      botBar.id = 'inannaSuiteBotBar';
      botBar.className = 'inanna-suite-footer-dock';
      botBar.setAttribute('aria-label', 'TERRA-SHIFT Bottom Navigation');
      document.body.appendChild(botBar);
    }
    botBar.innerHTML = buildLinksHtml(lang);

    document.querySelectorAll('[data-suite-back="1"]').forEach(btn => {
      btn.onclick = handleSmartBack;
    });

    // Also remove target="_blank" on internal suite links so users never get stuck in a tab without history
    document.querySelectorAll('a[target="_blank"]').forEach(a => {
      const h = a.getAttribute('href') || '';
      if (!h.startsWith('http')) a.removeAttribute('target');
    });
  }

  window.inannaSuiteNav = { refresh: renderSuiteBars };

  document.addEventListener('DOMContentLoaded', () => {
    renderSuiteBars();
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-lang]');
      if (btn && btn.dataset.lang) {
        setTimeout(() => renderSuiteBars(btn.dataset.lang), 25);
      }
    });
  });
})();
