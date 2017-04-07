'use strict';

let path = require('path');
var dotEnvPath = path.resolve('./.envtest');
require('dotenv').config({ path: dotEnvPath});

let assert = require('assert');
let StringHelpers = require('../../../server/helpers/stringHelpers');


describe('String Helpers', () => {

  it('Returns a random string 32 charachters long as default', () => {
    assert.equal(32, StringHelpers.randomString().length);
  });

  it('Returns a random string of the length passed', () => {
    assert.equal(10, StringHelpers.randomString(10).length);
    assert.equal(9584, StringHelpers.randomString(9584).length);
  });

  it('Should capitalize the provided string', () => {
    assert.equal('January', capitalize('january'));
    assert.equal('I do not need change', capitalize('I do not need change'));
  });

});
