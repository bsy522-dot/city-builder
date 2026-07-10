const CACHE_NAME = 'city-builder-v17';
const ASSETS = ['index.html', 'v6_patch.js', 'v7_patch.js', 'v8_patch.js', 'v9_patch.js', 'v10_patch.js', 'v11_patch.js', 'v12_patch.js', 'v13_patch.js', 'v14_patch.js', 'v15_patch.js', 'v16_patch.js', 'v17_patch.js', 'manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if(e.request.url.includes('.html') || e.request.url.endsWith('/')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  } else {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});
