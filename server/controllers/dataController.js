'use strict';

let BaseController = require('./baseController');
let Evnt = require('../models/event');
let Organiser = require('../models/organiser');
let Venue = require('../models/venue');
let Subgroup = require('../models/subgroup');
let fetch = require('node-fetch');

class DataController extends BaseController {
  constructor() {
    super('data controller');
  }

  getData(req, res) {
    console.log('[Data Controller] Getting all data');

    let allData = {};
    let promises = [];
    promises.push(Organiser.getDatabasePromise());
    promises.push(Subgroup.getDatabasePromise());
    console.log('Promises', promises);

    // Run all promises and process when all return data or error
    Promise.all(promises).then(function() {
      console.log('[Data Controller] All database promises resolved');

      allData.organisations = arguments[0][0].organisers;

      // console.log(allData.organisations);

      let subgroups = arguments[0][1].subgroups;
      let urls = Organiser.extractURLS(allData.organisations);

      // Fetch all the events for all organisations
      Promise.all(urls.map(url =>
        fetch(url).then(data => data.json())))
      .then(events => {
        // Process eventbrite events & store in data structure
        let data = Evnt.extractEventbriteEvents(events);
        allData.events = Evnt.processEventbriteData(data);
        return allData;
      })
      .then(data => Venue.venuesPromise(data))
      .then(venues => {
        let results = [];
        venues.forEach(v => {
          results.push(Venue.processEventbriteVenueData(v));
        });
        return results;
      })
      .then(venues => allData.venues = venues)
      .then(data => Organiser.meetupPromise(allData.organisations))
      .then(events => {
        let processed = Evnt.processMeetupData(events[0], subgroups);
        let venues = Venue.processMeetupVenueData(events[0]);
        processed.map(proc => allData.events.push(proc));
        venues.map(ven => allData.venues.push(ven));
        subgroups.map(sub => allData.organisations.push(sub));
        return;
      })
      .then(() => res.send(JSON.stringify(allData)))
      .catch(err => {
        console.log('Error retrieving events', err);
        res.send(500, { error: 'Error retrieving events' });
      });

    }, function(err) {
      console.log('ERROR: ' + err);
      res.send(500, { error: 'Error getting promise' });
    });

  }

}

module.exports = new DataController();
