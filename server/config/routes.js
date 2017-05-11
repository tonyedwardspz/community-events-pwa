'use strict';

let path = require('path');
let data = require('../controllers/dataController');
let users = require('../controllers/userController');
let CacheModel = require('../models/cache').getMongooseModel();
let adminOrgs = require('../admin/controllers/organisation');
let adminDashboard = require('../admin/controllers/dashboard');
let adminEvents = require('../admin/controllers/event');


/**
* Exposes routes for the restful interface
* @param {Express} app The express app object
* @param {Passport} passport The instantiated passport authentication library
*/
module.exports = function(app, passport) {

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated) {
      return next();
    }
    console.log('Not authenticated');
    res.redirect('/');
  }

  //-------------- Data Routes --------------\\

  app.get('/getData', data.getData);



  //-------------- User / Authentication Routes --------------\\

  app.get('/user/:id', ensureAuthenticated, users.getUser);

  app.put('/user/:id', ensureAuthenticated, users.update);

  app.get('/user/auth/twitter', passport.authenticate('twitter'), users.auth);

  ['/user/auth/twitter/callback', '/user/auth/twitter/=callback'].forEach(cb => {
    app.get(cb, passport.authenticate('twitter', {
        failWithError: true
      }),
      function(req, res) {
        console.log('[Twitter] Auth success route hit');
        users.authSuccess(req, res);
      },
      function(err, req, res, next) {
        console.log('[Twitter] Auth failure route hit');
        users.authFailure(err, req, res, next);
      }
    );
  });

  app.get('/user/auth/google',
           passport.authenticate('google', { scope: ['profile'] }), users.auth);

  app.get('/user/auth/google/callback',
    passport.authenticate('google', {
      failWithError: true
    }),
    function(req, res) {
      users.authSuccess(req, res);
    },
    function(err, req, res, next) {
      users.authFailure(err, req, res, next);
    }
  );

  app.get('/user/login', function(req, res){
    res.sendFile(path.resolve(__dirname, '../../public/index.html'));
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.cookie('user_auth', 'false');
    res.cookie('user_id', null);
    res.cookie('user_name', null);
    res.cookie('auth_token', null);
    res.redirect('/');
  });



   //-------------- Admin Routes --------------\\

   // really basic admin check
   function ensureAdmin(req, res, next) {
     console.log('Admin check', req.cookies.user_id);
     if (req.isAuthenticated && req.cookies.user_id === process.env.ADMIN_ID) {
       return next();
     }
     console.log('[Admin] Not admin: ', req.cookies.user_id);
     res.redirect('/user/login');
   }

   // GET admin/dashboard
   app.get('/admin/dashboard', ensureAdmin, adminDashboard.index);

   // GET admin/organisations
   app.get('/admin/organisations', ensureAdmin, adminOrgs.index);

   // POST admin/organisations
   app.post('/admin/organisations', ensureAdmin, adminOrgs.create);

   // GET admin/organisations/edit/:id
   app.get('/admin/organisations/edit/:id', ensureAdmin, adminOrgs.edit);

   // GET admin/organisations/new
   app.get('/admin/organisations/new', ensureAdmin, adminOrgs.new);

   // GET admin/organisations/:id
   app.get('/admin/organisations/:id', ensureAdmin, adminOrgs.show);

   // PUT admin/organisations/:id
   app.put('/admin/organisations/:id', ensureAdmin, adminOrgs.update);

   // DELETE admin/organisations/:id
   app.delete('/admin/organisations/:id', ensureAdmin, adminOrgs.delete);

   // GET admin/events
   app.get('/admin/events', ensureAdmin, adminEvents.index);

   // GET admin/events/:id
   app.get('/admin/events/:id', ensureAdmin, adminEvents.show);

   //-------------- Misc Routes --------------\\

   app.get('/manifest.json', function(req, res){
     res.sendFile(path.join(__dirname + '/../../public/manifest.json'));
   });

   app.get('/serviceworker.js', (req, res) => {
     console.log('[SW] route hit');
     res.setHeader('content-type', 'text/javascript');
     res.sendFile(path.join(__dirname + '/../../public/serviceworker.js'));
   });

    app.get('/images/icons/favicon-16x16.png', (req, res) => {
      res.sendFile(path.join(__dirname + '/../../public/images/icons/favicon-16x16.png'));
    });

    app.get('/images/icons/favicon.ico', (req, res) => {
      res.sendFile(path.join(__dirname + '/../../public/images/icons/favicon-16x16.png'));
    });

    app.get('/*/scripts/require.js', function(req, res){
      res.sendFile(path.resolve(__dirname, '../../public/scripts/require.js'));
    });

    app.get('/*/scripts/app.js', function(req, res){
      res.sendFile(path.resolve(__dirname, '../../public/scripts/app.js'));
    });

    app.get('/*/scripts/lib/page.js', function(req, res){
      res.sendFile(path.resolve(__dirname, '../../public/scripts/lib/page.js'));
    });

   // Catch all Route to the main dash (MUST BE LAST ROUTE)
   app.get('*', function(req, res){
     console.log('[Route] Catch All: ' + req.path);
     res.sendFile(path.resolve(__dirname, '../../public/index.html'));
   });
};
