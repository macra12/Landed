const CACHE_NAME = 'site-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/element.html',
    '/left-sidebar.html',
    '/no-sidebar.html',
    '/right-sidebar.html',
    '/assets/css/main.css',
    '/assets/js/main.js',
    '/images/pic01.jpg',
    '/images/pic02.jpg',
    '/images/pic03.jpg',
    '/images/pic04.jpg'
];

// Install the Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch from Cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return the cached version or fetch from the network
                return response || fetch(event.request);
            })
    );
});

// Update Service Worker and Clear Old Cache
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
