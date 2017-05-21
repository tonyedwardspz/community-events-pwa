'use strict';

let path = require('path');
let organiser = require('../../models/organiser');
let CacheModel = require('../../models/cache');

class AdminCacheController {
  constructor() {

  }

  invalidate(req, res) {
    console.log('[ADMIN] Dashboard Index');

    CacheModel.invalidateCache();

    CacheModel.getCachedData(data => {
      let parsed = JSON.parse(data);
      res.render(path.resolve(__dirname + '/../views/dashboard/index'), {
        organisations: parsed.organisations,
        events: parsed.events,
        venues: parsed.venues,
        message: 'Cache invalidated'
      });
    });
  }
}

module.exports = new AdminCacheController();
