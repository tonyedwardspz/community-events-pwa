'use strict';

/** A class to control the displaying of the dashboard */
class DashboardController extends BaseController {
  constructor() {
    super();
  }

  /** Fetches all user data, unpack it and display the dashboard view */
  index() {
    // app.db.retrieve(`/getAllData`, data => {
      console.info('[Dashboard]: index');

      let html = app.dashboardView.index();

      this.updateShell(html);
    // });
  }
}
