#!/usr/bin/env node

'use strict';

let BaseController = require('../server/controllers/baseController');
let Evnt = require('../server/models/event');
let Organiser = require('../server/models/organiser');
let Venue = require('../server/models/venue');
let Subgroup = require('../server/models/subgroup');
let fetch = require('node-fetch');
let Cache = require('../server/models/cache');
let CacheModel = Cache.getMongooseModel();
let dateHelpers = require('../server/helpers/dateHelpers');

var process = () => {
  console.log('[Cache] Updating cache from scheduled task');
  // Get new data
  let cacheData = {};
  let allData = {};
  let promises = [];
  promises.push(Organiser.getDatabasePromise('organisers'));
  promises.push(Subgroup.getDatabasePromise('subgroups'));

  // Run all promises and process when all return data or error
  Promise.all(promises).then(function() {
    console.log('[Cache] All database promises resolved');

    allData.organisations = arguments[0][0].organisers;

    let subgroups = arguments[0][1].subgroups;
    let urls = Organiser.extractURLS(allData.organisations);

    // Fetch all the events from eventbrite for all organisations
    Promise.all(urls.map(url =>
      fetch(url).then(data => data.json())))
    .then(events => {
      // Process eventbrite events & store in data structure
      let data = Evnt.extractEventbriteEvents(events);
      allData.events = Evnt.processEventbriteData(data);
      return allData;
    })
    // Fetch venues from eventbrite
    .then(data => Venue.venuesPromise(data.events))
    // Process eventbrite venues and save venues to data structure
    .then(venues =>
      allData.venues = Venue.processEventbriteVenueData(venues)
    )
    // Get events from meetup
    .then(() => Organiser.meetupPromise(allData.organisations))
    // Process Meetup data, matching subgroups to events & extracting venues
    .then(events => {
      let allEvents = [];
      events.forEach(arr => {
        arr.map(e => allEvents.push(e));
      });
      let processed = Evnt.processMeetupData(allEvents, subgroups);
      let venues = Venue.processMeetupVenueData(allEvents);
      processed.map(proc => allData.events.push(proc));
      venues.map(ven => allData.venues.push(ven));
      subgroups.map(sub => allData.organisations.push(sub));
      return;
    })
    // Update the cache
    .then(() => {
      cacheData.data = JSON.stringify(allData);
      cacheData.date = new Date();
      cacheData.save( err => {
        if(err) {
          console.log(err);
        } else {
          console.log('[Cache] updated');
        }
      });
    })
    .catch(err => {
      console.log('Error retrieving events', err);
    });

  }, function(err) {
    console.log('ERROR: ' + err);
  });
};

process();
