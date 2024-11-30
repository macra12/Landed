// Name of the cache
const CACHE_NAME = 'site-cache-v1';

// Files to cache
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/left-sidebar.html',
    '/right-sidebar.html',
    '/no-sidebar.html',
    '/elements.html',
    '/assets/css/main.css',
    '/assets/css/noscript.css',
    '/assets/js/main.js',
    '/assets/js/util.js',
    '/assets/js/jquery.min.js',
    '/assets/js/jquery.scrolly.min.js',
    '/assets/js/jquery.dropotron.min.js',
    '/assets/js/jquery.scrollex.min.js',
    '/assets/js/browser.min.js',
    '/assets/js/breakpoints.min.js',
    '/images/pic01.jpg',
    '/images/pic02.jpg',
    '/images/pic03.jpg',
    '/images/pic04.jpg',
];

// Install the Service Worker
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Install');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Activate the Service Worker
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
        caches.keys().then((keyList) => {
        return Promise.all(
            keyList.map((key) => {
            if (key !== CACHE_NAME) {
                console.log('[ServiceWorker] Removing old cache', key);
                return caches.delete(key);
            }
            })
        );
        })
    );
    return self.clients.claim();
    });

// Fetch Event
self.addEventListener('fetch', (event) => {
    console.log('[ServiceWorker] Fetch', event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
        return response || fetch(event.request);
        })
    );
    });
