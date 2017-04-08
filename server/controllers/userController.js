'use strict';

let BaseController = require('./baseController');
let User = require('../models/user').getMongooseModel();

class UserController extends BaseController {
  constructor() {
    super('user controller');
  }

  auth() {
    console.log('[User] Auth hit');
  }

  authSuccess(req, res) {
    console.log('[User] Auth Success');

    console.log('[User Controller] User',req.user);

    res.cookie('user_auth', 'true');
    res.cookie('user_id', req.user.userID);
    res.cookie('user_name', req.user.firstName + ' ' + req.user.lastName);
    res.cookie('auth_token', req.user.accessToken);
    res.writeHead(302, {'Location': '/user/login/success'});
    res.end();
  }

  authFailure(err, req, res, next) {
    console.log('[User] Auth failure: ' + err);
    res.redirect('/user/login');
  }

  getUser(req, res, next) {
    User.findOne({ userID: req.params.id}, (err, user) => {
      if (err) {
        res.send(JSON.stringify({'error' : err}));
      } else {
        res.send(JSON.stringify(user));
      }
    });
  }

}

module.exports = new UserController();
