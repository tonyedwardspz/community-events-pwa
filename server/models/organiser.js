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
      this.mongooseModel = mongoose.model('organisers', this.mongooseSchema);
    }
  }

  /**
  * Returns the mongoose schema for the organiser model
  * @return {Mongoose.schema} The schema for the organiser model
  */
  get mongooseSchema() {
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
  * Returns an array of urls which need to be fetched from eventbrite
  * @param {Orgnisations.Array} orgs The organisations data
  * @return {String} An array of url strings
  */
  extractURLS(orgs) {
    let urls = [];

    orgs.forEach( org => {
      if (org.apiURL !== 'null' || org.apiURL !== null || !org.apiURL.includes('null')){
        let url = `${org.apiURL}&token=${process.env.EVENTBRITE_TOKEN}`;
        if (! url.includes('null')){
          urls.push(url);
        }
      }
    });
    return urls;
  }

  /**
  * Returns an promise to get all data from the mongo database
  * @param {String.Array} urls An array of strings representing the organisers
  * whose events should be retrieved from meetup
  * @return {Promise} A promise to retrieve event data from provided urls
  */
  meetupPromise(urls) {
    return new Promise((resolve, reject) => {
      let eventURLS = this.getMeetupURLS(urls);

      Promise.all(eventURLS.map( url =>
        fetch(url)
        .then(data => data.json())))
        .catch(err => console.log('Error fetching events: ', err))
      .then(events => {
        resolve(events);
      })
      .catch(err => {
        console.log('meetup promise error', err);
        reject(err);
      });
    });
  }

  /**
  * Returns an promise to get all data from the mongo database
  * @param {Organisations.Array} orgs The organisations whose urls need to
  * extracted from
  * @return {String.Array} An array of URL strings
  */
  getMeetupURLS(orgs) {
    let urls = [];
    const stub = 'https://api.meetup.com/';

    orgs.forEach(org => {
      // is this a meetup URL?
      if (org.apiURL === 'null' || org.apiURL === null){
        urls.push(
          `${stub}${org.id}/events?key=${process.env.MEETUP_TOKEN}&sign=true`);
      }
    });
    return urls;
  }
}

module.exports = new Organiser();
