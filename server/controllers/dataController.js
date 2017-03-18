'use strict';

let BaseController = require('./baseController');
let Evnt = require('../models/event');

class DataController extends BaseController {
  constructor() {
    super('data controller');
  }

  getData(req, res) {
    console.log('gettig all data');

    let promises = [];
    promises.push(Evnt.getDatabasePromise());


    // Run all promises and process when all return data or error
    Promise.all(promises).then(function() {
      console.log('[Data] All database promises resolved');
      res.send(JSON.stringify(arguments[0]));
    }, function(err) {
      console.log('ERROR: ' + err);
    });

  }

}

module.exports = new DataController();
