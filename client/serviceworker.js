/* global version */
'use strict';

//VERSION-HERE
const cacheName = `gsw-${version}-static`;
const cacheFiles = [
  '/scripts/app.js',
  '/index.html',
  '/manifest.json',
  '/images/icons/favicon.ico',
  '/images/icons/favicon-16x16.png',
  '/images/icons/favicon-194x194.png',
  '/images/icons/favicon-32x32.png',
  '/',
  '/events/month/jan',
  '/events/month/feb',
  '/events/month/mar',
  '/events/month/apr',
  '/events/month/may',
  '/events/month/jun',
  '/events/month/jul',
  '/events/month/aug',
  '/events/month/sep',
  '/events/month/oct',
  '/events/month/nov',
  '/events/month/dec'
];

// Open the cache and store static files
function updateStaticCache() {
  return caches.open(cacheName)
    .then( cache => { return cache.addAll(cacheFiles);});
}

// Save an item into the cache
function stashInCache(cacheName, request, response) {
  caches.open(cacheName).then( cache => cache.put(request, response));
}

// Remove excess items over the passed limit
function trimCache(cacheName, maxItems) {
  caches.open(cacheName).then( cache => {
    cache.keys().then(keys => {
      if (keys.length > maxItems) {
        cache.delete(keys[0])
        .then(trimCache(cacheName, maxItems));
      }
    });
  });
}

// Remove caches whose name is no longer valid
function clearOldCaches() {
  return caches.keys()
  .then( keys => {
    return Promise.all(keys.filter(key => key.indexOf(version) !== 0)
      .map(key => caches.delete(key))
    );
  });
}

// Save items to the cache upon installation
self.addEventListener('install', event => {
  event.waitUntil(updateStaticCache()
  .then( () => {
    console.log('[SW] Installed');
    self.skipWaiting(); })
  );
});

// Clear cache and make this service worker the active one for the page.
// This allows the SW to function immediately, rather than waiting for reload.
self.addEventListener('activate', event => {
  console.log('[SW] Activated');
  event.waitUntil(clearOldCaches()
    .then( () => self.clients.claim() )
  );
});

// Listen for the message event, do some funky stuff
self.addEventListener('message', event => {
  if (event.data.command === 'trimCaches') {
    trimCache(cacheName, 50);
  }
});

// Intercept the fetch request and do some funky stuff
self.addEventListener('fetch', event => {
  let request = event.request; // copy the request as it can only be used once
  let url = new URL(request.url);

  // Ignore non-GET requests, SW can't deal with them
  if (request.method !== 'GET') {
    return;
  }

  // Ignore chrome extention requests
  if (request.url.includes('chrome-extension')) {
    return;
  }

  // Try the network first, fall back to the cache for the majority of calls,
  // finally redirect to base url to allow app.js to send user to the dashboard
    event.respondWith(
      fetch(request).then( response => {
        // NETWORK - Stash a copy of this response in the pages cache
        let copy = response.clone();
        stashInCache(cacheName, request, copy);
        return response;
      })
      .catch( () => {
        // CACHE - Check cache or fallback to base
        return caches.match(request)
          .then( response => response || caches.match('/') );
      })
    );
    return;
});
