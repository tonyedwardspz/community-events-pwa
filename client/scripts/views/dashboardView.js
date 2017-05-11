'use strict';

/** Class representing a dashboard's views */
class DashboardView extends BaseView {
  constructor(){
    super();
  }

  /**
  * Returns HTML for the index of events
  * @param {String} msg A message to be displayed to the user
  * @return {String} The HTML string for display
  */
  index(msg) {
    let descText = '<p>Showing the next 7 events.</p>';
    let msgText = false;
    if (msg !== null) {
      msgText = `<p><strong>ERROR:</strong> ${msg}</p>`;
    }
    if (app.user !== null) {
      descText = `<p>Showing the next 7 events for your
                  <a href="/organisations" title="Tracked organisers">tracked
                  organisations</a>.</p>`;
    }
    return `
      <h2>Dashboard</h2>
      ${msgText ? msgText : ''}
      ${descText}
      <a href="/events/month" class="button">Filter by month</a>
      <hr />
    `;
  }
}
