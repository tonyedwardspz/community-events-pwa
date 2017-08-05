'use strict';

let BaseController = require('./baseController');
let Cache = require('../models/cache');
let CacheModel = Cache.getMongooseModel();

class APIController extends BaseController {
  constructor() {
    super('data controller');
  }

  allData(req, res) {
    console.log('[API Controller] Getting all data');

    CacheModel.findOne({ id: process.env.CACHE_ID}, function(err, cache) {
      res.send(JSON.stringify(cache.data));
    });
  }

  upcomingEvents(req, res) {
    CacheModel.findOne({ id: process.env.CACHE_ID}, function(err, cache) {

      let parsed = JSON.parse(cache.data);

      let events = parsed.events;
      let venues = parsed.venues;
      let organisations = parsed.organisations;

      events.forEach(evnt => {
        for (var key in evnt) {
          if (evnt.hasOwnProperty('description')) {
              // do something with `key'
              console.log('Event has description');
              delete evnt.description;
          }

          if (evnt.hasOwnProperty('source')) {
              // do something with `key'
              console.log('Event has source');
              delete evnt.source;
          }
        }

        // swap organiser id for name
        organisations.forEach(org => {
          if (org.id === evnt.organiserID) {
            delete evnt.organiserID;
            evnt.organiser = org.name;
          }
        });


        // swap venue ID for details
        venues.forEach(ven => {
          if (ven.id === evnt.venueID) {
            delete evnt.venueID;
            evnt.venueName = ven.name;
            evnt.venueAddress = ven.address;
          }
        });

      });



      // console.log(events);

      res.send(JSON.stringify(events));
    });
  }
}

module.exports = new APIController();
