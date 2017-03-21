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

      EventModel.processEventData(data.events);
      Organisation.processOrgData(data.organisations);

      cb();
    });
  }
}
