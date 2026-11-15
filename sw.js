const CACHE_NAME = 'inanna-terrashift-v8';
const ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/suite-nav.js',
  './js/nasa-api.js',
  './js/crop-engine.js',
  './js/scada-iiot.js',
  './js/inanna-pro-suite.js',
  './js/app.js',
  './assets/inanna-isotipo.jpg',
  './assets/inanna-logo-horizontal.jpg',
  './assets/inanna-logo-full.jpg',
  './esp32/index.html',
  './video/index.html',
  './manuals/index.html',
  './manuals/manuals-data.js',
  './presentation/deck_7_slides.html'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
