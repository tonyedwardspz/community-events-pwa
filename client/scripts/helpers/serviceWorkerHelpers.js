'use strict';

/**
* Triggers the setting up of the service workers, if available in browser,
* and related listeners.
*/
let setupServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    registerServiceWorker();
  } else {
    console.log(`Your browser does not support service workers`);
  }
};

/**
* Registers a service worker to enable caching, push notifications and
* app installation.
*/
let registerServiceWorker = () => {
  navigator.serviceWorker.register('/serviceworker.js').then((registration) => {
    console.log('[SW] Registered');
  }).catch((error) => {
    console.log('[SW] Failed to registered: ', error);
  });
};
