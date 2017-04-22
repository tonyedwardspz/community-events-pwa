'use strict';

/** Class representing a dashboard's views */
class DashboardView extends BaseView {
  constructor(){
    super();
  }

  /**
  * Returns HTML for the index of events
  * @return {String} The HTML string for display
  */
  index() {
    let descText = '';
    if (app.user !== null){
      descText = `<p>Showing the next 7 events for your
                  <a href="/organisations" title="Tracked organisers">tracked
                  organisations</a>.</p>`;
    } else {
      descText = '<p>Showing the next 7 events.</p>';
    }
    return `
      <h2>Your Dashboard</h2>
      ${descText}
      <a href="/events/month" class="button">Filter by month</a>
      <hr />
    `;
  }
}
