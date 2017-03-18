'use strict';

class DataController extends BaseController {
  constructor() {
    super();
  }

  getData() {
    app.db.retrieve(`/getData`, data => {
      console.log('[DASH]: Fetch all data');

      console.log(data);

      var html = app.dashboardView.index();
      this.updateShell(html);
      this.updateHistory('dashboard_index');
    });
  }
}
