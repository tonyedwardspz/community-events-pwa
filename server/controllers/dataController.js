'use strict';

let BaseController = require('./baseController');
let Evnt = require('../models/event');
let Organiser = require('../models/organiser');
let fetch = require('node-fetch');

class DataController extends BaseController {
  constructor() {
    super('data controller');
  }

  getData(req, res) {
    console.log('gettig all data');

    let allData = {};

    let mongoModel = Organiser.getMongooseModel();

    let promises = [];
    promises.push(Organiser.getDatabasePromise());

    // Run all promises and process when all return data or error
    Promise.all(promises).then(function() {
      console.log('[Data] All database promises resolved');

      let eventbritePromises = [];
      let urls = [];

      allData.organisers = arguments[0][0].organisers;

      arguments[0][0].organisers.forEach( org => {
        urls.push(`${org.apiURL}&token=${process.env.EVENTBRITE_TOKEN}`);
      });

      console.log('API urls: ', urls);

      let results = [];

      Promise.all(urls.map( url =>
        fetch(url).then(data => data.json())))
        .then(events => {
          events.forEach(event => {
            event.events.forEach(evt => {
              results.push(evt);
            });
          });
        })
        .then(json => {
          allData.events = Evnt.processEventbriteData(results);
          res.send(JSON.stringify(allData));
        })
        .catch(err => {
          console.log('Error retrieving events');
          res.send(500, { error: 'Error retrieving events' });
        });

    }, function(err) {
      console.log('ERROR: ' + err);
      res.send(500, { error: 'Error getting promise' });
    });

  }

}

module.exports = new DataController();
