'use strict';

/** Class representing a organisation's views */
class OrganisationView extends BaseView {
  constructor(){
    super();
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
    return `<div class="row">
              <div class="column column-75">
                <h1>${org.name}</h1>
                <p>${website}<br />
                   ${twitter}</p>
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

  index(orgs = app.organisations) {
    let html = `<h2>Organisers</h2>
                <p>Showing all ${orgs.length} organisers</p>
                <a href="https://tonyedwardspz.typeform.com/to/jwEbTA" title="Suggest new organiser"
                target="_blank" class="button">Add organiser</a>
                <div class="org-grid">`;

    orgs.forEach(org => {
      let isTracked = true;

      if (app.user !== null){
        if (app.user.trackedOrgs.includes(org.id)) {
          isTracked = true;
        } else { isTracked = false; }
      }
      html += `<div class="item ${isTracked ? 'tracked' : 'untracked'}" id="org-item-${org.id}">
                <p>${org.name}</p>
                <a href="/organisation/${org.id}" title="${org.name} page">
                  <img src="${org.logoURL}" alt="${org.name}">
                </a>
                <a href="#" id="org-follow-${org.id}" data-id="${org.id}" data-action="track-org"
                  class="button">${isTracked?'un':''}follow</a>
               </div>`;
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
