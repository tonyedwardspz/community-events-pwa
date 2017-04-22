'use strict';

var app;

/** Set up the app on first load */
(function(){
  console.info('App Loading');

  app = {
    user: null,
    online: true,
    shell: document.querySelector('main'),
    menuCheckbox: document.getElementById('nav-trigger-label'),
    menu: document.getElementById('nav-trigger-label'),
    header: document.getElementsByTagName('header')[0],
    wrap: document.getElementById('site-wrap'),
    menuCheckBox: document.getElementById('nav-trigger'),
    db: new Database(),
    dataController: new DataController(),
    dashboardController: new DashboardController(),
    dashboardView: new DashboardView(),
    eventController: new EventController(),
    eventView: new EventView(),
    organisationController: new OrganisationController(),
    organisationView: new OrganisationView(),
    userController: new UserController(),
    userView: new UserView()
  };

  // Style the menu on load & screen resize
  menuStyleListener();

  // Setup the page.js client side routing
  setupRoutes();

  // Make sure the menu behaves
  setMenuListeners();

  // listen for changes to the update user form
  formListeners();

  // Load up the content and direct as appropriate
  loadContent();

  // Register service workers
  setupServiceWorker();

  // Listen for changes in online status
  offlineListener();

})();
