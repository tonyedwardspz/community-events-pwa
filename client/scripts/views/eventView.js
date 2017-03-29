'use strict';

/** Class representing a events's views */
class EventView {
  constructor(){

  }

  /**
  * Returns HTML for the show event screen
  * @param {Event} evnt An event object
  * @param {Organisation} org The organiser object relating to the event
  * @param {Event.Array} orgEvents The upcoming events for the parent organisation
  * @return {String} The HTML string for display
  */
  show(evnt, org, orgEvents) {
    return `
      <div class="row">
      <div class="column column-75">
      <h1>${evnt.title}</h1>
      <p>${evnt.getDisplayDate()}</p>
      <p>Location</p>
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
      <h2>Upcoming <a href="/organisation/${org.id}">${org.name}</a> events</h2>
      ${app.organisationView.upcoming(org, orgEvents, false)}
      <a href="/organisation/${org.id}" class="button pull-right">
      View all events</a>
    `;
  }

  /**
  * Returns HTML for the index of events
  * @param {Array.<Event>} [events] An array of event objects
  * @return {String} The HTML string for display
  */
  index(events = []) {
    return `
      <h1>This is the event index view</h1>
      <a href="/dashboard">Dashboard</a>
    `;
  }

  eventList(events, showImage = true) {
    if (events.length === 0) {
      return 'No upcoming events';
    }

    let list = ``;

    events.forEach(event => {
      if (showImage){
        list += this.eventListItem(event);
      } else {
        list += this.eventListItemNoImage(event);
      }
    });


    return list;
  }

  eventListItem(event){
    return `<div class="row">
              <div class="column column-75">
                <h3><a href="/event/${event.id}">${event.title}</a></h3>
                <p>${event.getDisplayDate()}</p>
                <p>Location</p>
              </div>
              <div class="column">
                <img src="http://placehold.it/350x150">
              </div>
            </div>`;
  }

  eventListItemNoImage(event){
    return `<div class="row">
              <div class="column column-75">
                <h3><a href="/event/${event.id}">${event.title}</a></h3>
                <p>${event.getDisplayDate()}<br />
                   Location</p>
              </div>
              <div class="column">
                <a href="/event/${event.id}" class="button">View Event</a>
              </div>
            </div>`;
  }
}
