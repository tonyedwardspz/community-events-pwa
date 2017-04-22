'use strict';

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

  getDisplayDate(){
    return convertDateToLocale(this.start);
  }

  isTracked() {
    try {
      return app.user.trackedEvents.includes(this.id);
    } catch (e) {
      console.log('[Event] Failed to get tracked status');
      return false;
    }
  }

  hasVenue() {
    return this.venueID ? true : false;
  }

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
