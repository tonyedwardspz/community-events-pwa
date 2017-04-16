'use strict';

let setupRoutes = () => {
  console.info('[Routes] Setting up');

  requirejs(['lib/page'], (page) => {
    page();

    // Dashboard
    page('/', () => {
      app.dashboardController.index();
    });

    // Dashboard
    page('/dashboard', () => {
      app.dashboardController.index();
    });


    // Events
    page('/events', (context) => {
      app.eventController.index();
    });

    page('/event/:id', (context) => {
      app.eventController.show(context.params.id);
    });

    page('/events/month/:id', (context) => {
      app.eventController.showMonth(context.params.id);
    });

    page('/events/month', (context) => {
      app.eventController.showMonth('/month');
    });

    page('/events/tracked', (context) => {
      app.eventController.tracked();
    });


    // Organisations
    page('/organisations', (context) => {
      app.organisationController.index();
    });

    page('/organisation/:id', (context) => {
      app.organisationController.show(context.params.id);
    });

    // User
    page('/user', (context) => {
      app.userController.show();
    });

    page('/user/login', context => {
      app.userController.login();
    });

    page('/user/profile', (context) => {
      app.userController.show();
    });

    // page('/user/:id/save', (context) => {
    //   app.userController.update(context.params.id);
    // });

  });

};
