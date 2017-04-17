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

  getDisplayDate(){
    return convertDateToLocale(this.start);
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
    console.log(`[Events] Get events for month ${month}: `, events);
    return events;
  }

  static getEventsByIds(ids) {
    let matched = [];
    ids.forEach(id => {
      app.events.forEach(evnt => {
        if (evnt.id === id) {
          matched.push(evnt);
        }
      });
    });
    return matched;
  }
}
