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
        'start': evt.start.local,
        'end': evt.end.local,
        'ticketURL': evt.url,
        'source': 'eventbrite'
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
}

module.exports = new Evnt();
