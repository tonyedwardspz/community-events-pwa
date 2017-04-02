'use strict';

let path = require('path');
var dotEnvPath = path.resolve('./.envtest');
require('dotenv').config({ path: dotEnvPath});

var chai = require('chai');
var expect = chai.expect;
let Venue = require('../../../server/models/venue');
let mongoose = require('mongoose');
let data = require('../data/event-data');
let venueData = require('../data/venue-data');

describe('Venues Model', () => {

  it('Should return a promise to get venues from Eventbrite', ()=>  {
    let promise = Venue.venuesPromise(data.eventbriteData);
    expect(promise).to.be.an.instanceof(Promise);
  });

  it('Should return an array of eventbrite venue urls', () => {
    let expected = [ 'https://www.eventbriteapi.com/v3/venues/17005980/?token=EVENTBRITE_TOKEN',
                     'https://www.eventbriteapi.com/v3/venues/18658326/?token=EVENTBRITE_TOKEN' ];
    let result = Venue.extractURLS(data.processedEventbriteData);
    expect(result[0]).to.equal(expected[0]);
    expect(result[result.length -1]).to.equal(expected[expected.length -1]);
  });

  it('Should return an array of processed meetup venues', () => {
    let result = Venue.processMeetupVenueData(data.meetupEvents);
    expect(result[0].name).to.equal('Bodmin Library');
    expect(result[0].postcode).to.equal('PL31 2FR');
    expect(result[0].address).to.equal('Bodmin, PL31 2FR');
  });

  it('Should extract a poscode embeded in a string', () => {
    let expected = 'TR18 2BU';
    let address = 'I am a string TR18 2BU with a postcode TR18 in the middle';
    expect(Venue.extractPostcode(address)[0]).to.equal(expected);
    expect(Venue.extractPostcode(address).length).to.equal(1);
  });

  it('Should return a processed eventbrite venue', () => {
    let results = Venue.processEventbriteVenueData(venueData.rawEventbriteVenueData);

    expect(results.length).to.equal(2);
    expect(results[0].name).to.equal(venueData.processedEventbriteVenues[0].name);
    expect(results[1].address).to.equal(venueData.processedEventbriteVenues[1].address);
  });
});
