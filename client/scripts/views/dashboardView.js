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

  welcomeSplash(evnt = false, venue = false, org = false) {
    let html = `<div class="welcome-wrap">
                <div class="welcome-splash"><div class="row">`;

    if (evnt && venue) {
      html += `${app.eventView.welcomeEvent(evnt, venue, org)}`;

    } else {
      html += `<div class="column column-75 full-width">
            <p><a href="/user/login" class="button-nav" title="Login">Login</a>
                to display your next event.</p></div>`;
    }
    html += `<div class="column column-25 full-width">
              <ul>
                <li>${app.events.length} Events</li>
                <li>${app.organisations.length} Organisations</li>
                <li>${app.user ? app.user.trackedEvents.length : 0} Tracked Events</li>
              </ul>
            </div>`;
    return html += '</div></div></div>';
  }
}
