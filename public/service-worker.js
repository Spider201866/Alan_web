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

const CACHE_NAME = 'alanui-v1';
const OFFLINE_URL = 'offline.html';

// A list of essential assets to cache on installation.
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/home.html',
  '/offline.html',
  '/styles/styles.css',
  '/styles/styles_index.css',
  '/scripts/index.js',
  '/scripts/home.js',
  '/scripts/agent1-chatbot-module.js',

  '/favicons/manifest.json',
  '/favicons/favicon-32x32.png',
  '/favicons/apple-touch-icon.png',
  '/images/AP.png',
];

// 1. Install Event: Cache core assets.
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching core assets');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => {
        // Force the waiting service worker to become the active service worker.
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
            // If a cache's name is not the current one, delete it.
            if (cacheName !== CACHE_NAME) {
              console.log(`Service Worker: Deleting old cache: ${cacheName}`);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated and ready to control clients.');
        // Take control of all open clients immediately.
        return self.clients.claim();
      })
  );
});

// 3. Fetch Event: Intercept network requests.
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // --- Caching Strategy for Navigation (HTML) ---
  // Network-first, falling back to cache, then to offline page.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // If the network request is successful, cache the response for future offline use.
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // If the network fails, try to get the response from the cache.
          return caches.match(request).then((cachedResponse) => {
            // If it's in the cache, serve it. Otherwise, serve the offline page.
            return cachedResponse || caches.match(OFFLINE_URL);
          });
        })
    );
    return;
  }

  // --- Caching Strategy for Static Assets (CSS, JS, Images) ---
  // Cache-first, falling back to network.
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // If the asset is in the cache, return it.
      if (cachedResponse) {
        return cachedResponse;
      }

      // If the asset is not in the cache, fetch it from the network.
      return fetch(request).then((networkResponse) => {
        // Cache the newly fetched asset for future use.
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });
        return networkResponse;
      });
    })
  );
});
