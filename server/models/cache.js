'use strict';

let mongoose = require('mongoose');
let BaseModel = require('./base');
let fetch = require('node-fetch');

class Cache extends BaseModel {
  constructor() {
    super();
    if (mongoose.models.organisers) {
      this.mongooseModel = mongoose.models.cache;
    } else {
      this.mongooseModel = mongoose.model('cache', this.mongooseSchema);
    }
  }

  /**
  * Returns the mongoose schema for the cache model
  * @return {Mongoose.schema} The schema for the cache model
  */
  get mongooseSchema() {
    return new mongoose.Schema({
      id: String,
      updated: Date,
      data: String
    });
  }
}

module.exports = new Cache();
