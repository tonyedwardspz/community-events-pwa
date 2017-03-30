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

  /**
  * Returns a promise to get the organisers from the database
  * @return {Promise} The organisers promise
  */
  getDatabasePromise() {
    console.log('get database promise');
    let mongoModel = this.getMongooseModel();
    return this.getPromise(mongoModel, 'organisers');
  }

  /**
  * Returns an array of urls which need to be fetched from eventbrite
  * @param {Orgnisations.Array} orgs The organisations data
  * @return {String} An array of url strings
  */
  extractURLS(orgs) {
    let urls = [];

    orgs.forEach( org => {
      urls.push(`${org.apiURL}&token=${process.env.EVENTBRITE_TOKEN}`);
    });

    return urls;
  }
}

module.exports = new Organiser();
