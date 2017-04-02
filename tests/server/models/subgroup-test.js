'use strict';

let path = require('path');
var dotEnvPath = path.resolve('./.envtest');
require('dotenv').config({ path: dotEnvPath});

var chai = require('chai');
var expect = chai.expect;
let Subgroup = require('../../../server/models/subgroup');
let mongoose = require('mongoose');

describe('Subgroup Model', () => {

  it('Should return a promise to get model from database', ()=>  {
    let promise = Subgroup.getDatabasePromise('subgroups');
    expect(promise).to.be.an.instanceof(Promise);
  });

  it('Should return a mongoose model', ()=>  {
    expect(Subgroup.getMongooseModel()).to.equal(mongoose.models.subgroups);
  });

  it('Should return a mongoose schema', ()=>  {
    expect(Subgroup.mongooseSchema.name).to.equal(mongoose.schema);
  });


});
