'use strict';

/** Class representing a organisation's views */
class OrganisationView {
  constructor(){

  }

  /**
  * Returns HTML for the show organisation screen
  * @param {Organisation} org An organisation object to be displayed
  * @param {Event.Array} orgEvents The upcoming events
  * @return {String} The HTML string for display
  */
  show(org, orgEvents) {
    const website = org.website ? webLink(org.website, org.name) : '';
    const twitter = org.twitterHandle ? twitterLink(org.twitterHandle): '';
    let isTracked = true;
    if (app.user !== null) {
      if (!app.user.trackedOrgs.includes(org.id)) {
        isTracked = false;
      }
    }

    return `<div class="row">
              <div class="column column-75">
                <h1>${org.name}</h1>
                <p>${website}<br />
                   ${twitter}</p>
                <p>
                <a href="#" id="org-follow-${org.id}" data-id="${org.id}" data-action="track-org"
                  class="button ${isTracked?'danger':'success'}">${isTracked?'un':''}follow</a>
                </p>
              </div>
              <div class="column">
                <img src="${org.logoURL}" alt="${org.name} logo" class="event-org-logo">
              </div>
            </div>
            <hr>
            <h2>Upcoming Events</h2>
            ${this.upcoming(org, orgEvents, false)}
            `;
  }

  /**
  * Returns HTML for the organisation index view
  * @param {Organisation.Array} orgs An array of organisation objects to be displayed
  * @return {String} The HTML string for display
  */
  index(orgs = app.organisations) {
    let noUserTxt = `<p><a href="/user/login">Login</a> to filter organisations.</p>`;
    let html = `<h2>Organisers</h2>
                ${app.user ? '' : noUserTxt}
                <p>Showing all ${orgs.length} organisers.</p>
                <p>Follow and unfollow organisers for quick filtering of their events throughout the app.</p>
                <a href="https://tonyedwardspz.typeform.com/to/jwEbTA" title="Suggest new organiser"
                target="_blank" class="button">Add organiser</a>
                <div class="org-grid">`;

    orgs.forEach(org => {
      let isTracked = true;
      if (app.user !== null) {
        if (!app.user.trackedOrgs.includes(org.id)) {
          isTracked = false;
        }
      }
      html += `<div class="item ${isTracked ? 'tracked' : 'untracked'}" id="org-item-${org.id}">
                <p>${org.name}</p>
                <div class="org-logo-container">
                  <a href="/organisation/${org.id}" title="${org.name} page">
                    <img src="${org.logoURL}" alt="${org.name}">
                  </a>
                </div>`;

      if (app.user) {
        html += `<a href="#" id="org-follow-${org.id}" data-id="${org.id}" data-action="track-org"
          class="button ${isTracked?'danger':'success'}">${isTracked?'un':''}follow</a>`;
      }
      html +=`</div>`;
    });

    return html += `</div>`;
  }

  /**
  * Returns HTML for the list of upcoming organisation events
  * @param {Organisation} organisatiom An organisation to be displayed
  * @param {Event.Array} events The organisations upcoming events
  * @param {Boolean} [showImage=true] Should the associated image be displayed?
  * @return {String} The HTML string for display
  */
  upcoming(org, events, showImage = true){
    return `${app.eventView.eventList(events, showImage)}`;
  }
}
