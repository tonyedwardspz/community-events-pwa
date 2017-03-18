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
  index(events) {
    return `<h1>This is the event index view</h1>`;
  }
}
