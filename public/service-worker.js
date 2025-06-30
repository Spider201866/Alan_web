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
        return self.clients.claim();
      })
  );
});

// 3. Fetch Event: Intercept network requests.
self.addEventListener('fetch', (event) => {
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
      return fetch(request).then((networkResponse) => {
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });
        return networkResponse;
      });
    })
  );
});