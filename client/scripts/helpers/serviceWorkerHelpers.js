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

/**
* Updates the online status of the application
*/
let offlineListener = () => {
  console.log('[STATUS] Setting offline listener');
  window.addEventListener('load', () => {
    function updateOnlineStatus(event) {
      app.online =  navigator.onLine;
      console.log('[STATUS] Online: ', app.online);
    }
    updateOnlineStatus();
    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  });
};
