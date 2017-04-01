'use strict';

let mongoose = require('mongoose');
let BaseModel = require('./base');

class Subgroup extends BaseModel {
  constructor() {
    super();
    if (mongoose.models.subgroups) {
      this.mongooseModel = mongoose.models.subgroups;
    } else {
      this.mongooseModel = mongoose.model('subgroups', this.getMongooseSchema());
    }
  }

  /**
  * Returns a mongoose schema for subgroups
  * @return {Mongoose.schema} The subgroups mongoose schema
  */
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
  * Returns a promise to get the subgroups from the database
  * @return {Promise} The subgroup promise
  */
  getDatabasePromise() {
    console.log('get subgroup database promise');
    let mongoModel = this.getMongooseModel();
    return this.getPromise(mongoModel, 'subgroups');
  }
}

module.exports = new Subgroup();
