const CACHE_NAME = 'inanna-terrashift-v2';
const ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/nasa-api.js',
  './js/crop-engine.js',
  './js/scada-iiot.js',
  './js/app.js',
  './manuals/index.html',
  './presentation/deck_7_slides.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
