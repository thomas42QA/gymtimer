const CACHE_NAME = 'gym-timer-v1';
const ASSETS = [
  './',
  './index.html'
];

// Installeer de Service Worker en sla de app offline op
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Zorg dat de app direct werkt, zelfs zonder internetbereik in de gym
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
