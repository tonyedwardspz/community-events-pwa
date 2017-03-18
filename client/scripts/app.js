'use strict';

var app;

/** Set up the app on first load */
(function(){
  console.info('Script Loaded');

  app = {
    user: null,
    shell: document.querySelector('main'),
  };

  app.shell.innerHTML = '<h1 class="title">Community Events PWA</h1>';
})();