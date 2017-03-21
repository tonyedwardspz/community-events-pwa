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

  loadContent();

  setupRoutes();

  app.dashboardController.index();
})();
