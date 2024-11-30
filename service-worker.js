const cacheName = 'landed-site-cache-v1';
const assetsToCache = [
    '/',
    '/index.html',
    '/element.html',
    '/left-sidebar.html',
    '/no-sidebar.html',
    '/right-sidebar.html',
    '/assets/css/main.css', // Update the path for your CSS file
    '/assets/css/noscript.css',
    '/assets/css/fontawesome.css',
    '/assets/js/script.js', // Update the path for your JS file
    '/assets/images/logo.png', // Add other images here
];

// Install Event: Cache Files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Fetch Event: Serve Cached Content When Offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate Event: Clean Up Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
