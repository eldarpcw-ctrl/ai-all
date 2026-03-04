/* =========================================================
   AI All — Service Worker
   Стратегия: Cache-first для статики, Network-first для данных
   ========================================================= */

const CACHE_NAME = 'ai-all-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap'
];

// ===== INSTALL: кешируем статику =====
self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { mode: 'no-cors' })));
        }).catch(() => { })
    );
});

// ===== ACTIVATE: удаляем старые кеши =====
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// ===== FETCH: Cache-first + fallback =====
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Пропускаем не-GET запросы и chrome-extension
    if (event.request.method !== 'GET' || url.protocol === 'chrome-extension:') return;

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;

            return fetch(event.request).then(response => {
                // Кешируем успешные ответы (не opaque)
                if (response && response.status === 200 && response.type !== 'opaque') {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            }).catch(() => {
                // Offline fallback: возвращаем index.html для навигации
                if (event.request.mode === 'navigate') {
                    return caches.match('/index.html');
                }
            });
        })
    );
});
