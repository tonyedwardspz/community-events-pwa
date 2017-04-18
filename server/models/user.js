'use strict';

let mongoose = require('mongoose');
let BaseModel = require('./base');
let fetch = require('node-fetch');

class User extends BaseModel {
  constructor() {
    super();
    if (mongoose.models.organisers) {
      this.mongooseModel = mongoose.models.user;
    } else {
      this.mongooseModel = mongoose.model('users', this.mongooseSchema);
    }
  }

  defaulTrackedOrgs() {
    return ['6377821409', '11761620027', 'techexeter',
      'Cornwall-Digital', 'Digital-Exeter', 'AgileSouthWest', 'Plymouth-Web',
      'hVwi8wFm8qwexGwr7891n34x913', 'niux6i76QBI6Ppi7yxpisuHa8wy',
      'CIAHQy0aMziIvOFikGeyg2lZeAC5KxcS', 'JFNoAXzlQ4Is2kHpUouCSLbOEGksUDyh'];
  }

  /**
  * Returns the mongoose schema for the user model
  * @return {Mongoose.schema} The schema for the user model
  */
  get mongooseSchema() {
    return new mongoose.Schema({
      userID: String,
      twitterID: String,
      googleID: String,
      email: String,
      firstName: String,
      lastName: String,
      recieveEmail: Boolean,
      recievePush: Boolean,
      accessToken: String,
      refreshToken: String,
      profilePhoto: String,
      trackedEvents: Array,
      trackedOrgs: Array
    });
  }
}

module.exports = new User();
