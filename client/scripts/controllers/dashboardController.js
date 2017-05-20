'use strict';

/** A class to control the displaying of the dashboard */
class DashboardController extends BaseController {
  constructor() {
    super();
  }

  /** Fetches all data, displays the dashboard view */
  index(msg = null) {
    console.info('[Dashboard]: index');
    let html = '';

    let evnts = EventModel.getTrackedEvents();
    if (evnts.length > 7){
      evnts.length = 7;
    }

    let event = false;
    let venue = false;
    let org = false;
    try {
      event = app.user.getTrackedEvents().sort(sortByDate)[0];
      venue = Venue.findByID(event.venueID, app.venues);
      org = Organisation.findByID(event.organiserID, app.organisations);
    } catch (err) {
      console.log('[DASH] No tracked events');
    }

    html += app.dashboardView.welcomeSplash(event, venue, org);
    html += app.dashboardView.index(msg);
    html += app.eventView.eventList(evnts);

    this.updateShell(html);
  }
}
