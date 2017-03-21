'use strict';

class DataController extends BaseController {
  constructor() {
    super();
  }

  getData(cb) {
    app.db.retrieve(`/getData`, data => {
      console.log('[DASH]: Fetch all data');

      EventModel.processEventData(data.events);

      cb();
    });
  }
}
