'use strict';

let mongoose = require('mongoose');
let BaseModel = require('./base');
let fetch = require('node-fetch');

class Cache extends BaseModel {
  constructor() {
    super();
    if (mongoose.models.caches) {
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

  getCachedData(cb = null){
    this.mongooseModel.findOne({ id: process.env.CACHE_ID}, function(err, cache) {
      if (err) {
        return { 'error' : err };
      } else {
        if (cb) {
          cb(cache.data);
        }
        return cache.data;
      }
    });
  }

  invalidateCache() {
    this.mongooseModel.update({ id: process.env.CACHE_ID},{
      date: new Date('2010-05-21T01:28:34.551Z')
    }, function(err) {

    });
  }
}

module.exports = new Cache();
