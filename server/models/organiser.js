'use strict';

let mongoose = require('mongoose');
let BaseModel = require('./base');
let fetch = require('node-fetch');

class Organiser extends BaseModel {
  constructor() {
    super();
    if (mongoose.models.organisers) {
      this.mongooseModel = mongoose.models.organisers;
    } else {
      this.mongooseModel = mongoose.model('organisers', this.getMongooseSchema());
    }
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
      if (org.apiURL !== 'null'){
        urls.push(`${org.apiURL}&token=${process.env.EVENTBRITE_TOKEN}`);
      }
    });
    return urls;
  }

  meetupPromise(urls) {
    return new Promise((resolve, reject) => {
      let eventURLS = this.getMeetupURLS(urls);

      Promise.all(eventURLS.map( url =>
        fetch(url).then(data => data.json())))
      .then(events => {
        resolve(events);
      })
      .catch(err => {
        console.log('meetup promise error', err);
        reject(err);
      });
    });
  }

  getMeetupURLS(orgs) {
    let urls = [];
    const stub = 'https://api.meetup.com/';

    orgs.forEach(org => {
      if (org.apiURL === 'null'){
        urls.push(
          `${stub}${org.id}/events?key=${process.env.MEETUP_TOKEN}&sign=true`);
      }
    });
    return urls;
  }
}

module.exports = new Organiser();
