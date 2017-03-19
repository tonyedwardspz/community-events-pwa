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

    let mongoModel = Organiser.getMongooseModel();

    // mongoModel.find({}, function(err, data) {
    //   if (err) {
    //     console.log('There was an error getting the data');
    //   } else {
    //     console.log('mongo data', data);
    //     console.log(data[0].apiURL);
    //     // res.send(JSON.stringify(data));
    //     fetch(`${data[0].apiURL}&token=${process.env.EVENTBRITE_TOKEN}`)
    //       .then(events => events.json())
    //       .then(json => {
    //         console.log('eventbrite results', json);
    //         res.send(JSON.stringify(json));
    //       });
    //
    //   }
    // });



    let promises = [];
    promises.push(Organiser.getDatabasePromise());

    // Run all promises and process when all return data or error
    Promise.all(promises).then(function() {
      console.log('[Data] All database promises resolved');

      let eventbritePromises = [];
      let urls = [];

      arguments[0][0].organisers.forEach( org => {
        urls.push(`${org.apiURL}&token=${process.env.EVENTBRITE_TOKEN}`);
      });

      // fetch(urls[0]).then(events => events.json())
      // .then(json => {
      //   console.log('eventbrite results', json);
      // });

      console.log('urls', urls);

      var results = [];

      Promise.all(urls.map( url =>
        fetch(url).then(data => data.json())))
        .then(events => {
          events.forEach(event => {
            event.events.forEach(evt => {
              results.push(evt);
            });
          });
          // console.log('EVENT', results);
        })
        .then(json => {
          // console.log('eventbrite results', Evnt.processEventbriteData(results));
          res.send(JSON.stringify(Evnt.processEventbriteData(results)));
        });


      // res.send(JSON.stringify(arguments[0][0]));
    }, function(err) {
      console.log('ERROR: ' + err);
    });

  }

}

module.exports = new DataController();
