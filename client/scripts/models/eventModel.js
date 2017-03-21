'use strict';

class EventModel extends BaseModel {
  constructor(id, title, description, organiserID, start, end, ticketURL, source) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.organiserID = organiserID;
    this.start = start;
    this.end = end;
    this.ticketURL = ticketURL;
    this.source = source;
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
}
