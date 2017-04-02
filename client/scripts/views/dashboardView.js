'use strict';

/** Class representing a dashboard's views */
class DashboardView {
  constructor(){

  }

  /**
  * Returns HTML for the index of events
  * @param {NotSureYet} data A data object representing the users dashboard
  * @return {String} The HTML string for display
  */
  index(data = []) {
    return `
      <h1>This is the dashboard view</h1>
      ${app.eventView.monthButtons(getNextSixMonths())}
    `;
  }
}
