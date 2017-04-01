'use strict';

let mongoose = require('mongoose');
let BaseModel = require('./base');

class Subgroup extends BaseModel {
  constructor() {
    super();
    if (mongoose.models.subgroups) {
      this.mongooseModel = mongoose.models.subgroups;
    } else {
      this.mongooseModel = mongoose.model('subgroups', this.mongooseSchema);
    }
  }

  /**
  * Returns a mongoose schema for subgroups
  * @return {Mongoose.schema} The subgroups mongoose schema
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
}

module.exports = new Subgroup();
