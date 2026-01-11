/*
 * AlanUI - Service Worker
 *
 * This service worker is responsible for caching application assets and enabling
 * offline functionality, turning the web application into a Progressive Web App (PWA).
 *
 * Features:
 * - Cache Versioning: Ensures that users receive the latest assets upon update.
 * - Offline Fallback: Provides a fallback page when a network request fails for navigation.
 * - Caching Strategies:
 *   - Network-First for HTML: Prioritizes fetching the latest page from the network.
 *   - Cache-First for Static Assets: Serves static assets from the cache for speed.
 */

// Bump this value whenever you need to force clients to refresh cached assets.
const CACHE_NAME = 'alanui-v3';
const OFFLINE_URL = 'offline.html';

// A list of essential assets to cache on installation.
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/home.html',
  '/offline.html',
  '/referral.html',
  '/aboutalan.html',
  '/atoms.html',
  '/ear.html',
  '/eye.html',
  '/instructions.html',
  '/skin.html',
  '/weblinks.html',
  '/styles/styles.css',
  '/styles/styles_index.css',
  '/scripts/index.js',
  '/scripts/listener-module.js',
  '/scripts/home.js',
  '/scripts/home-ui.js',
  '/scripts/home-ui-core.js',
  '/scripts/view-records-dom.js',
  '/scripts/home-ui-handlers.js',
  '/scripts/home-ui-popup.js',
  '/scripts/home-ui-state.js',
  '/scripts/agent1-chatbot-module.js',
  '/scripts/page-template.js',
  '/scripts/language.js',
  '/scripts/log.js',
  '/scripts/aboutalan.js',
  '/scripts/atoms.js',
  '/scripts/ear.js',
  '/scripts/eye.js',
  '/scripts/instructions.js',
  '/scripts/skin.js',
  '/scripts/weblinks.js',
  '/scripts/referral.js',
  '/scripts/sw-register.js',
  '/favicons/manifest.json',
  '/favicons/favicon-32x32.png',
  '/favicons/apple-touch-icon.png',
  '/images/AP.webp',
  '/images/lang.webp',
  '/images/eyeor.webp',
];

// 1. Install Event: Cache core assets.
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching core assets');
        return cache
          .addAll(CORE_ASSETS)
          .then(() => {
            console.log('Service Worker: Core assets cached successfully.');
            return cache.keys().then((keys) => {
              console.log(
                'Service Worker: Cached assets:',
                keys.map((k) => k.url)
              );
            });
          })
          .catch((error) => {
            console.error('Service Worker: Failed to cache core assets:', error);
          });
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});

// 2. Activate Event: Clean up old caches.
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log(`Service Worker: Deleting old cache: ${cacheName}`);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated and ready to control clients.');
        return self.clients.claim().then(() => {
          self.clients.matchAll().then((clients) => {
            clients.forEach((client) => client.postMessage({ type: 'SW_READY' }));
          });
        });
      })
  );
});

// 3. Fetch Event: Intercept network requests.
self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetching', event.request.url);
  // Only process GET requests.
  if (event.request.method !== 'GET') {
    return;
  }

  // Bypass Flowise proxy requests entirely.
  // Flowise embed uses both POST (prediction) and GET (EventSource/streaming).
  // The SW only handles GET, so this prevents caching/stream interference.
  if (event.request.url.includes('/flowise/')) {
    console.log('Service Worker: Bypassing for Flowise proxy request:', event.request.url);
    return;
  }

  // --- START OF FIX ---
  // If the request is for the admin page or any asset on it, do nothing.
  // This lets the browser handle the request normally, bypassing the service worker.
  if (
    event.request.url.includes('/view-records.html') ||
    (event.request.referrer && event.request.referrer.includes('/view-records.html'))
  ) {
    console.log('Service Worker: Bypassing for admin page request:', event.request.url);
    return;
  }
  // --- END OF FIX ---

  const { request } = event;

  // --- Caching Strategy for Navigation (HTML) ---
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match(OFFLINE_URL);
          });
        })
    );
    return;
  }

  // --- Caching Strategy for Static Assets (CSS, JS, Images) ---
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request)
        .then((networkResponse) => {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return networkResponse;
        })
        .catch(() => {
          // For static assets, we don't want to return the offline page.
          // We'll just return a simple error response.
          return new Response('Network error', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' },
          });
        });
    })
  );
});

// Listen for push events
self.addEventListener('push', function (event) {
  // Define the notification's appearance
  const options = {
    body: 'This test message came from your browser DevTools!',
    icon: '/images/icons/icon-192x192.png', // Optional: path to an icon
    vibrate: [100, 50, 100], // Optional: vibration pattern
  };

  // Tell the service worker to keep running until the notification is shown
  event.waitUntil(self.registration.showNotification('PWA Test Push!', options));
});
