const cacheName = 'coffee-website-v1';
const assets = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    // Add paths to your images or other files
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => cache.addAll(assets))
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});
