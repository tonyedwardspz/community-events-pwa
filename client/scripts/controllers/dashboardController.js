'use strict';

/** A class to control the displaying of the dashboard */
class DashboardController extends BaseController {
  constructor() {
    super();
  }

  /** Fetches all user data, displays the dashboard view */
  index() {
    console.info('[Dashboard]: index');
    app.dataController.getData(() => {

      let html = app.dashboardView.index();
      html += app.eventView.eventList(app.events);

      this.updateShell(html);
    });
  }
}
