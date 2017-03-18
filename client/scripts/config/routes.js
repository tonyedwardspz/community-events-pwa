'use strict';

let setupRoutes = () => {
  console.info('[Routes] Setting up');

  requirejs(["lib/page"], function(page) {
    page();

    // Dashboard
    page('/dashboard', () => {
      app.dashboardController.index();
    });


    // Events
    page('/events', (context) => {
      app.eventController.index();
    });

    page('/event/:id', (context) => {
      app.eventController.index(context.params.id);
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

    page('/user/:id/edit', (context) => {
      app.userController.edit(context.params.id);
    });

    page('/user/:id/save', (context) => {
      app.userController.update(context.params.id);
    });

  });

};
