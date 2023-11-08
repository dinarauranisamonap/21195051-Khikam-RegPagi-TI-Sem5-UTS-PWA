var cacheName = 'My CV';
var filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/img/Icon.png',
  '/img/Khikam.jpg',
  '/js/main.js',
  '/js/indexdb.js',
  '/js/notifikasi.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});