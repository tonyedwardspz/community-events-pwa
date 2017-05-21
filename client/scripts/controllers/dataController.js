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

      app.localStorageAPI.setObject('cache', data);

      cb();
    });
  }

  getUser(id, cb) {
    app.db.retrieve('/user/' + id, user => {
      User.processUserData(user, () => {
        let userMenu = document.getElementById('user-menu');
        userMenu.innerHTML = app.userView.loggedIn();

        if (!user.email || user.email === null || user.email.length === 0) {
          console.log('[DATA] User email is null');
          app.userController.show('Please add an email to your profile.');
        } else {
          directURL(getRoutingUrl()[0], getRoutingUrl()[1]);
        }
      });
      app.user.cleanup();
      cb();
    });
  }
}
