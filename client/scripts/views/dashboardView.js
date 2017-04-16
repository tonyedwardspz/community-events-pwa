'use strict';

/** Class representing a dashboard's views */
class DashboardView extends BaseView {
  constructor(){
    super();
  }

  /**
  * Returns HTML for the index of events
  * @param {NotSureYet} data A data object representing the users dashboard
  * @return {String} The HTML string for display
  */
  index(data = []) {
    return `
      <h2>Your Dashboard</h2>
      <a href="/events/month" class="button">Filter by month</a>
      <hr />
    `;
  }
}
