'use strict';

let BaseController = require('./baseController');
let Evnt = require('../models/event');
let Organiser = require('../models/organiser');
let Venue = require('../models/venue');
let Subgroup = require('../models/subgroup');
let fetch = require('node-fetch');
let Cache = require('../models/cache');
let CacheModel = Cache.getMongooseModel();
let dateHelpers = require('../helpers/dateHelpers');

class DataController extends BaseController {
  constructor() {
    super('data controller');
  }

  getData(req, res) {
    console.log('[Data Controller] Getting all data');

    // Check the cache for recent data
    let cacheData = {};
    CacheModel.findOne({ id: process.env.CACHE_ID}, function(err, cache) {
      if (cache) {
        cacheData = cache;
        // check to see if the cache is fresh
        if (dateHelpers.lastTwoHours(cache.date)){
        // if (1 === 2){
          console.log('[Cache] Is fresh', cache.date);
          res.send(JSON.stringify(cache.data));
        } else {
          console.log('[Cache] Not fresh. Retrieving new data', cache.date);
          // Get new data
          let allData = {};
          let promises = [];
          promises.push(Organiser.getDatabasePromise('organisers'));
          promises.push(Subgroup.getDatabasePromise('subgroups'));

          // Run all promises and process when all return data or error
          Promise.all(promises).then(function() {
            console.log('[Data Controller] All database promises resolved');

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
            // Send new data to client
            .then(() => res.send(JSON.stringify(allData)))
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
              res.status(500).send({ error: 'Error retrieving events' });
            });

          }, function(err) {
            console.log('ERROR: ' + err);
            res.send(500, { error: 'Error getting promise' });
          });
        }
      } else {
        console.log('[Cache] Error', err);
      }
    });
  }

  scheduledTask() {
    console.log('Scheduled task executed by Heroku.');
  }
}

module.exports = new DataController();
