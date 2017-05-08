'use strict';

let path = require('path');
let CacheModel = require('../../models/cache');
let AdminBaseController = require('./base');

class AdminEventController extends AdminBaseController {
  constructor() {
    super();
  }

  index(req, res) {
    console.log('[ADMIN] Event Index');

    CacheModel.getCachedData(data => {
      let parsed = JSON.parse(data);
      res.render(path.resolve(__dirname + '/../views/events/index'), {
        events: parsed.events.sort((a, b) => {
          return new Date(a.start) - new Date(b.start);
        })
      });
    });
  }

  show(req, res) {
    console.log('[ADMIN] Event Index');

    CacheModel.getCachedData((data) => {
      let parsed = JSON.parse(data);

      let findByID = (objects, id) => {
        let item = {};

        objects.forEach( obj => {
          if (obj.id === id) {
            item = obj;
          }
        });
        return item;
      };

      let event = findByID(parsed.events, req.params.id);
      let venue = findByID(parsed.venues, event.venueID);
      let organisation = findByID(parsed.organisations, event.organiserID);

      res.render(path.resolve(__dirname + '/../views/events/show'), {
        event: event,
        venue: venue,
        organisation: organisation
      });
    });
  }
}

module.exports = new AdminEventController();
