'use strict';

/** Class representing a organisation's views */
class OrganisationView {
  constructor(){

  }

  /**
  * Returns HTML for the show organisation screen
  * @param {Organisation} event An organisation object
  * @return {String} The HTML string for display
  */
  show(org, orgEvents) {
    const website = org.website ? `<a href="${org.website}" target="_blank">
                                   ${org.website}</a>` : '';
    const twitter = org.twitterHandle ? `<a href="https://twitter.com/
                                         ${org.twitterHandle}" target="_blank">
                                         https://twitter.com/${org.twitterHandle}</a>`: '';
    return `<div class="row">
              <div class="column column-75">
                <h1>${org.name}</h1>
                <p>${website}<br />
                   ${twitter}</p>
              </div>
              <div class="column">
                <img src="${org.logoURL}">
              </div>
              <div class="column">
              </div>
            </div>
            <hr>
            <h2>Upcoming Events</h2>
            ${this.upcoming(org, orgEvents, false)}
            `;
  }

  upcoming(org, events, showImage = true){
    return `${app.eventView.eventList(events, showImage)}`;
  }
}
