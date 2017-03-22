'use strict';

/** Class representing a events's views */
class EventView {
  constructor(){

  }

  /**
  * Returns HTML for the show event screen
  * @param {Event} evnt An event object
  * @param {Organisation} org The organiser object relating to the event
  * @return {String} The HTML string for display
  */
  show(evnt, org, orgEvents) {
    console.log('org events: ', orgEvents);
    let html = `
      <div class="row">
      <div class="column column-75">
      <h1>${evnt.title}</h1>
      <p>${evnt.getDisplayDate()}</p>
      </div>
      <div class="column">
        <img src="${org.logoURL}">
      </div>
      </div>
      <hr>
      ${evnt.description}
      <hr>
      <img src="/public/images/map-placeholder.jpg">
      <hr>
      ${app.organisationView.upcoming(org, orgEvents)}
    `;

    return html;
  }

  /**
  * Returns HTML for the index of events
  * @param {Array.<Event>} events An array of event objects
  * @return {String} The HTML string for display
  */
  index(events = []) {
    return `
      <h1>This is the event index view</h1>
      <a href="/dashboard">Dashboard</a>
    `;
  }

  eventList(events) {
    let list = ``;

    events.forEach(event => {
      list += this.eventListItem(event);
    });

    return list;
  }

  eventListItem(event){
    return `<div class="row">
              <div class="column column-75">
                <h3><a href="/event/${event.id}">${event.title}</a></h3>
                <p>${event.start}</p>
                <p>Location</p>
              </div>
              <div class="column">
                <img src="http://placehold.it/350x150">
              </div>
            </div>`;
  }
}
