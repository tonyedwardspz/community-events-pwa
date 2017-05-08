'use strict';

let path = require('path');
let organiser = require('../../models/organiser');
let CacheModel = require('../../models/cache');

class AdminDashboardController {
  constructor() {

  }

  index(req, res) {
    console.log('[ADMIN] Dashboard Index');

    CacheModel.getCachedData(data => {
      let parsed = JSON.parse(data);
      res.render(path.resolve(__dirname + '/../views/dashboard/index'), {
        organisations: parsed.organisations,
        events: parsed.events,
        venues: parsed.venues
      });
    });
  }
}

module.exports = new AdminDashboardController();
