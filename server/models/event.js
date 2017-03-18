'use strict';

let mongoose = require('mongoose');
let BaseModel = require('./base');

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
      subtitle: String,
      description: String,
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
}

module.exports = new Evnt();
