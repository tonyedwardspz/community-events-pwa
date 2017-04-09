'use strict';

var app;

/** Set up the app on first load */
(function(){
  console.info('App Loading');

  app = {
    user: null,
    shell: document.querySelector('main'),
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

  // Setup the page.js client side routing
  setupRoutes();

  // Make sure the menu behaves
  setMenuListeners();

  // listen for changes to the update user form
  formListeners();

  // Load up the content and direct as appropriate
  loadContent();
})();
