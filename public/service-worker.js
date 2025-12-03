const CACHE_NAME = 'dtfs-pwa-v2';
const DYNAMIC_CACHE_NAME = 'dtfs-dynamic-v2';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install Event - Cache core assets
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch Event - Stale-While-Revalidate Strategy
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip caching for API calls, Analytics, or Non-GET requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
     if (request.destination === 'image') {
         // Cache external images with Cache-First strategy
         event.respondWith(
            caches.open(DYNAMIC_CACHE_NAME).then(cache => {
                return cache.match(request).then(response => {
                    return response || fetch(request).then(networkResponse => {
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
         );
         return;
     }
     return;
  }

  // Stale-While-Revalidate for local assets
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(request).then(cachedResponse => {
        const fetchPromise = fetch(request).then(networkResponse => {
          cache.put(request, networkResponse.clone());
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      });
    })
  );
});