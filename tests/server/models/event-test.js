'use strict';

let path = require('path');
var dotEnvPath = path.resolve('./.envtest');
require('dotenv').config({ path: dotEnvPath});

var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-datetime'));
let Evnt = require('../../../server/models/event');
let data = require('../data/event-data');


describe('Event Model', () => {

  it('Should convert a epoch timstamp to the start date string', () => {
    let dateString = Evnt.convertEpochDate('1493398800000', '3600000');
    expect(dateString).to.equalDate(new Date(1493402400000));
  });

  it('Should convert a epoch timestamp to the end date string', () => {
    let dateString = Evnt.convertEpochDate('1493398800000', '3600000',
                                           '12600000');
    let dateStringNoEnd = Evnt.convertEpochDate('1493398800000', '3600000',
                                                undefined);
    expect(dateString).to.equalDate(new Date(1493415000000));
    expect(dateStringNoEnd).to.equalDate(new Date(1493413200000));
  });

  it('Should process meetup data into events', () => {
    let processed = Evnt.processMeetupData(data.meetupEvents, data.subgroups);
    expect(processed[0].title).to.equal(data.processedMeetupEvents[0].title);
    expect(processed[0].description).to.equal(data.processedMeetupEvents[0].description);
    expect(processed[0].organiserId).to.equal(data.processedMeetupEvents[0].organiserId);
    expect(processed[0].venueID).to.equal(data.processedMeetupEvents[0].venueID);
    expect(processed[0].ticketURL).to.equal(data.processedMeetupEvents[0].ticketURL);
    expect(processed[0].source).to.equal(data.processedMeetupEvents[0].source);
    expect(processed[0].start).to.equalDate(new Date(data.processedMeetupEvents[0].start));
    expect(processed[0].end).to.equalDate(new Date(data.processedMeetupEvents[0].end));

    expect(processed[processed.length -1].title).to.equal(data.processedMeetupEvents[data.processedMeetupEvents.length -1].title);
    expect(processed[processed.length -1].description).to.equal(data.processedMeetupEvents[data.processedMeetupEvents.length -1].description);
    expect(processed[processed.length -1].organiserId).to.equal(data.processedMeetupEvents[data.processedMeetupEvents.length -1].organiserId);
    expect(processed[processed.length -1].venueID).to.equal(data.processedMeetupEvents[data.processedMeetupEvents.length -1].venueID);
    expect(processed[processed.length -1].ticketURL).to.equal(data.processedMeetupEvents[data.processedMeetupEvents.length -1].ticketURL);
    expect(processed[processed.length -1].source).to.equal(data.processedMeetupEvents[data.processedMeetupEvents.length -1].source);
    expect(processed[processed.length -1].start).to.equalDate(new Date(data.processedMeetupEvents[data.processedMeetupEvents.length -1].start));
    expect(processed[processed.length -1].end).to.equalDate(new Date(data.processedMeetupEvents[data.processedMeetupEvents.length -1].end));
  });

  it('Should process eventbrite data into events', () => {
    let processed = Evnt.processEventbriteData(data.eventbriteData);
    expect(processed[0].title).to.equal(data.processedEventbriteData[0].title);
    expect(processed[0].description).to.equal(data.processedEventbriteData[0].description);
    expect(processed[0].organiserId).to.equal(data.processedEventbriteData[0].organiserId);
    expect(processed[0].venueID).to.equal(data.processedEventbriteData[0].venueID);
    expect(processed[0].ticketURL).to.equal(data.processedEventbriteData[0].ticketURL);
    expect(processed[0].source).to.equal(data.processedEventbriteData[0].source);
    expect(new Date(processed[0].start)).to.equalDate(new Date(data.processedEventbriteData[0].start));
    expect(new Date(processed[0].end)).to.equalDate(new Date(data.processedEventbriteData[0].end));
  });

});
