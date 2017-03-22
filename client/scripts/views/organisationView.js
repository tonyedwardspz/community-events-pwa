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
  show(org) {
    return `<h1>This is the organisation show view</h1>`;
  }

  upcoming(org, events){
    return `<h2>Upcoming ${org.name} events</h2>
            ${app.eventView.eventList(events)}`;


  }
}
