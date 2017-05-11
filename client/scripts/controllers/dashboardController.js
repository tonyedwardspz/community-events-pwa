'use strict';

/** A class to control the displaying of the dashboard */
class DashboardController extends BaseController {
  constructor() {
    super();
  }

  /** Fetches all data, displays the dashboard view */
  index(msg = null) {
    console.info('[Dashboard]: index');

    let evnts = EventModel.getTrackedEvents();
    if (evnts.length > 7){
      evnts.length = 7;
    }

    let html = app.dashboardView.index(msg);
    html += app.eventView.eventList(evnts);

    this.updateShell(html);
  }
}
