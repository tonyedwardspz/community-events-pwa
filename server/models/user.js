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
      profilePhoto: String
    });
  }
}

module.exports = new User();
