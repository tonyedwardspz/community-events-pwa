'use strict';

/** A controller for interfacing with the database mediator */
class DataController extends BaseController {
  constructor() {
    super();
  }

  /**
  * Fetches all data from the server and processes locally
  * @callback The callback to the appropriate controller
  */
  getData(cb) {
    app.db.retrieve(`/getData`, data => {
      console.log('[DASH]: Fetch all data');

      // If recieving the cache data, is should be parsed first
      try {
        data = JSON.parse(data);
      } catch (err) {
        console.log('[DATA] Does not need parsing');
      }

      EventModel.processEventData(data.events);
      Organisation.processOrgData(data.organisations);
      Venue.processVenueData(data.venues);

      cb();
    });
  }

  getUser(id, cb) {
    app.db.retrieve('/user/' + id, user => {
      User.processUserData(user, () => {
        let userMenu = document.getElementById('user-menu');
        userMenu.innerHTML = `<a href="/user" title="Use profile">Your Profile</a>`;
      });
    });
  }
}
