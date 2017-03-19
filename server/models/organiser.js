'use strict';

let mongoose = require('mongoose');
let BaseModel = require('./base');

class Organiser extends BaseModel {
  constructor() {
    super();
    this.mongooseModel = mongoose.model('organisers', this.getMongooseSchema());
  }

  getMongooseModel() {
    return this.mongooseModel;
  }

  getMongooseSchema() {
    return new mongoose.Schema({
      id: String,
      name: String,
      twitterHandle: String,
      logoURL: String,
      website: String,
      apiURL: String
    });
  }

  getDatabasePromise() {
    console.log('get database promise');
    let mongoModel = this.getMongooseModel();
    return this.getPromise(mongoModel, 'organisers');
  }
}

module.exports = new Organiser();
