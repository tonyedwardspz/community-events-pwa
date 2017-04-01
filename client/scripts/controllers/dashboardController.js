'use strict';

/** A class to control the displaying of the dashboard */
class DashboardController extends BaseController {
  constructor() {
    super();
  }

  /** Fetches all data, displays the dashboard view */
  index() {
    console.info('[Dashboard]: index');
    app.dataController.getData(() => {

      let events = app.events.sort(sortByDate);

      let html = app.dashboardView.index();
      html += app.eventView.eventList(events);

      this.updateShell(html);
    });
  }
}
