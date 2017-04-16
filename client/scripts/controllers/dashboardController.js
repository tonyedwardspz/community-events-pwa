'use strict';

/** A class to control the displaying of the dashboard */
class DashboardController extends BaseController {
  constructor() {
    super();
  }

  /** Fetches all data, displays the dashboard view */
  index() {
    console.info('[Dashboard]: index');

    let evnts = app.events.slice();
    evnts.sort(sortByDate);
    if (evnts.length > 7){
      evnts.length = 7;
    }

    let html = app.dashboardView.index();
    html += app.eventView.eventList(evnts);

    this.updateShell(html);
  }
}
