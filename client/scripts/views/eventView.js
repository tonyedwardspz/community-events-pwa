'use strict';

/** Class representing a events's views */
class EventView {
  constructor(){

  }

  /**
  * Returns HTML for the show event screen
  * @param {Event} event An event object
  * @return {String} The HTML string for display
  */
  show(event) {
    return `<h1>This is the event show view</h1>`;
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
                <h3>${event.title}</h3>
                <p>${event.start}</p>
                <p>Location</p>
              </div>
              <div class="column">
                <img src="http://placehold.it/350x150">
              </div>
            </div>`;
  }
}
