'use strict';

let mongoose = require('mongoose');
let BaseModel = require('./base');
let fetch = require('node-fetch');

class Evnt extends BaseModel {
  constructor() {
    super();
    this.mongooseModel = mongoose.model('events', this.getMongooseSchema());
  }

  getMongooseModel() {
    console.log('getting mongoose model', this.mongooseModel);
    return this.mongooseModel;
  }

  getMongooseSchema() {
    return new mongoose.Schema({
      id: String,
      title: String,
      description: String,
      organiserID: String,
      ticketURL: String,
      date: Date,
      timeStart: String,
      timeEnd: String,
      hashtag: String
    });
  }

  getDatabasePromise() {
    let mongoModel = this.getMongooseModel();
    return this.getPromise(mongoModel, 'events');
  }

  processEventbriteData(events) {
    let processed = [];
    events.forEach(evt => {
      processed.push({
        'id': evt.id,
        'title': evt.name.text,
        'description': evt.description.html,
        'organiserID': evt.organizer_id,
        'venueID': evt.venue_id,
        'start': evt.start.local,
        'end': evt.end.local,
        'ticketURL': evt.url,
        'source': 'eventbrite',
      });
    });
    return processed;
  }

  extractEventbriteEvents(events) {
    let results = [];

    events.forEach(event => {
      event.events.forEach(evt => {
        results.push(evt);
      });
    });

    return results;
  }

  meetupPromise(urls) {
    return new Promise((resolve, reject) => {
      let eventURLS = this.getMeetupURLS(urls);

      Promise.all(eventURLS.map( url =>
        fetch(url).then(data => data.json())))
      .then(events => {
        console.log('meetup events', events);
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
    console.log('meetup urls', urls);
    return urls;
  }
}

module.exports = new Evnt();
