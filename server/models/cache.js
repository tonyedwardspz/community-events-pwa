'use strict';

let mongoose = require('mongoose');
let BaseModel = require('./base');
let fetch = require('node-fetch');

class Cache extends BaseModel {
  constructor() {
    super();
    if (mongoose.models.cache) {
      this.mongooseModel = mongoose.models.caches;
    } else {
      this.mongooseModel = mongoose.model('caches', this.mongooseSchema);
    }
  }

  /**
  * Returns the mongoose schema for the cache model
  * @return {Mongoose.schema} The schema for the cache model
  */
  get mongooseSchema() {
    return new mongoose.Schema({
      id: String,
      date: Date,
      data: String
    });
  }
}

module.exports = new Cache();
