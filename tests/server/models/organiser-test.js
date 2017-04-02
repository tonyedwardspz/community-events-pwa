'use strict';

let path = require('path');
var dotEnvPath = path.resolve('./.envtest');
require('dotenv').config({ path: dotEnvPath});

var chai = require('chai');
var expect = chai.expect;
let Organiser = require('../../../server/models/organiser');
let data = require('../data/organiser-data');
let mongoose = require('mongoose');

describe('Organiser Model', () => {

  it('Should return the api endpoints to retieve meetup events from', ()=>  {
    let urls = Organiser.getMeetupURLS(data.organisations);
    let expected = [ 'https://api.meetup.com/Cornwall-Digital/events?key=MEETUP_TOKEN&sign=true' ];

    expect(urls[0]).to.equal(expected[0]);
  });

  it('Should return the api endpoints to retieve eventbrite events from', ()=>  {
    let urls = Organiser.extractURLS(data.organisations);
    let expected = [ 'https://www.eventbriteapi.com/v3/organizers/6377821409/events/?status=live&order_by=start_desc&token=EVENTBRITE_TOKEN',
  'https://www.eventbriteapi.com/v3/organizers/11761620027/events/?status=live&order_by=start_desc&token=EVENTBRITE_TOKEN' ];

    expect(urls[0]).to.equal(expected[0]);
    expect(urls[urls.length -1]).to.equal(expected[expected.length -1]);
  });

  it('Should return a promise to get model from database', ()=>  {
    let promise = Organiser.getDatabasePromise();
    expect(promise).to.be.an.instanceof(Promise);
  });

  it('Should return a mongoose model', ()=>  {
    expect(Organiser.getMongooseModel()).to.equal(mongoose.models.organisers);
  });

  it('Should return a mongoose schema', ()=>  {
    expect(Organiser.mongooseSchema.name).to.equal(mongoose.schema);
  });


});
