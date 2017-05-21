'use strict';

/** An object representing an Event */
class EventModel extends BaseModel {
  constructor(id, title, description, organiserID, venueID,start, end,
              ticketURL, source) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.organiserID = organiserID;
    this.venueID = venueID;
    this.start = start;
    this.end = end;
    this.ticketURL = ticketURL;
    this.source = source;
  }

  /**
  * Removes certain HTML elements from the description
  * @return {String} The cleaned description
  */
  get description(){
    let clean = this._description;
    clean = clean.replace('<H1>', '<p><strong>');
    clean = clean.replace('</H1>', '</strong></p>');
    clean = clean.replace('<H2>', '<p><strong>');
    clean = clean.replace('</H2>', '</strong></p>');
    clean = clean.replace('<H3>', '<p><strong>');
    clean = clean.replace('</H3>', '</strong></p>');
    clean = clean.replace('<h1>', '<p><strong>');
    clean = clean.replace('</h1>', '</strong></p>');
    clean = clean.replace('<h2>', '<p><strong>');
    clean = clean.replace('</h2>', '</strong></p>');
    clean = clean.replace('<h3>', '<p><strong>');
    clean = clean.replace('</h3>', '</strong></p>');
    return clean;
  }

  /**
  * Updates the objects description
  * @param {String} The new description
  */
  set description(desc) {
    this._description = desc;
  }

  static getTrackedEvents() {
    let events = [];
    app.events.forEach(e => {
      if (app.user){
        if (User.getTrackedOrgs().includes(e.organiserID)){
          events.push(e);
        }
      } else {
        events.push(e);
      }

    });
    events.sort(sortByDate);
    return events;
  }

  /**
  * Converts the events start date to human readable form
  * @return {String} A string representation of the date
  */
  getDisplayDate() {
    return convertDateToLocale(this.start);
  }

  /**
  * Converts the events start date to human readable form
  * @return {Date} A Date object containg the time
  */
  getDislpayTime() {
    try {
      return new Date(app.events[0].start).toUTCString().slice(17,22);
    } catch (e) {
      console.log('[Event] Unable to get display time: ', e);
    }
  }

  /**
  * Is the event is tracked by the user
  * @return {Boolean}
  */
  isTracked() {
    try {
      return app.user.trackedEvents.includes(this.id);
    } catch (e) {
      // console.log('[Event] Failed to get tracked status: ', e);
      return false;
    }
  }

  /**
  * Does the event has a venue
  * @return {Boolean}
  */
  hasVenue() {
    return this.venueID ? true : false;
  }

  /**
  * Sets the apps events, processing them from raw data
  * @param {Event.Array} data An JSON array of event data
  * @return {}
  */
  static processEventData(data){
    let events = [];
    data.forEach(evt => {
      events.push(
        new EventModel(
          evt.id,
          evt.title,
          evt.description,
          evt.organiserID,
          evt.venueID,
          evt.start,
          evt.end,
          evt.ticketURL,
          evt.source
        )
      );
    });
    app.events = events;
    return;
  }

  /**
  * Sets the apps events, processing them from raw data
  * @param {String} month The month to find events for
  * @return {Event.Array} the array of events
  */
  static getEventsForMonth(month) {
    let events = [];
    app.events.forEach(event => {
      let eventDate = new Date(event.start);
      let eventMonth = eventDate.getMonth();

      if (month === eventMonth){
        events.push(event);
      }
    });
    return events;
  }
}
