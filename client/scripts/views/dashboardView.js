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
      <h1>Upcoming Events</h1>
      <p>Filter by month</p>
      ${app.eventView.monthButtons(getNextFourMonths())}
      <hr />
    `;
  }
}
