'use strict';

let path = require('path');


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

  // app.get('/getAllData/:id', ensureAuthenticated, dash.getAllData);

  //-------------- User / Authentication Routes --------------\\

  // app.get('/user/auth', passport.authenticate('twitter'), users.auth);

  app.get('/user/auth/twitter/callback',
    passport.authenticate('twitter', {
      failWithError: true
    }),
    function(req, res) {
      users.authSuccess(req, res);
    },
    function(err, req, res, next) {
      users.authFailure(err, req, res, next);
    }
  );

  // app.put('/user/:id', ensureAuthenticated, users.update);


   //-------------- Misc Routes --------------\\

   app.get('/manifest.json', function(req, res){
     res.sendFile(path.join(__dirname + '/../../public/manifest.json'));
   });

   app.get('/service-worker.js', (req, res) => {
     console.log('[SW] route hit');
     res.setHeader('content-type', 'text/javascript');
     res.sendFile(path.join(__dirname + '/../../public/service-worker.js'));
   });

    app.get('/favicon-16x16.png', (req, res) => {
      console.log('[ICO] route hit');
      res.sendFile(path.join(__dirname + '/../../public//favicon-16x16.png'));
    });

    app.get('/favicon.ico', (req, res) => {
      console.log('[ICO] route hit');
      res.sendFile(path.join(__dirname + '/../../public//favicon-16x16.png'));
    });

   // Catch all Route to the main dash (MUST BE LAST ROUTE)
   app.get('*', function(req, res){
     console.log('[Route] Catch All: ' + req.path);
     res.sendFile(path.resolve(__dirname, '../../public/index.html'));
   });
};
