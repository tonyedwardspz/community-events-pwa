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
    res.writeHead(302, {'Location': '/'});
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

  update(req, res){
    console.log('[User Controller] Update hit : ', req.params.id);
    console.log('[User Controller] Update params : ', req.params);
    console.log('[User Controller] Update body : ', req.body);

    User.update({userID: req.body.userID}, { $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      recieveEmail: req.body.recieveEmail,
      recievePush: req.body.recievePush
    }}, (err, updated) => {
      if (err){
        console.log('Error updating user', err);
      } else {
        console.log(`[User] updated: ${updated}`);
        res.send(JSON.stringify({ a: JSON.stringify(updated) }));
      }
    });
  }

}

module.exports = new UserController();
