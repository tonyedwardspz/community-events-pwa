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

  extractURLS(orgs) {
    let urls = [];

    orgs.forEach( org => {
      urls.push(`${org.apiURL}&token=${process.env.EVENTBRITE_TOKEN}`);
    });

    console.log('API urls: ', urls);

    return urls;
  }
}

module.exports = new Organiser();
