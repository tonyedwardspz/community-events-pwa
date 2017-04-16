'use strict';

class EventController extends BaseController {
  constructor() {
    super();
  }

  show(id) {
    console.info('[Event] Show: ' + id);

    let thisEvent = EventModel.findByID(id, app.events);
    let thisOrg = Organisation.findByID(thisEvent.organiserID, app.organisations);
    let thisVenue = Venue.findByID(thisEvent.venueID, app.venues);
    console.log(thisVenue);

    // Fetch and sort the organisations upcoming events
    let orgEvents = Organisation.getOrgEvents(thisEvent.organiserID, app.events);
    orgEvents.sort(sortByDate);
    if (orgEvents.length > 4){
      orgEvents.length = 4;
    }

    let html = app.eventView.show(thisEvent, thisOrg, orgEvents, thisVenue);

    this.updateShell(html);
  }

  showMonth(month) {
    console.info(`[Event] Show months events: `, month);

    if(month.includes('month')) {
      month = getMonthNameFromNumber(new Date().getMonth());
    }

    let events = EventModel.getEventsForMonth(getMonthNumberFromName(month));
    let html = app.eventView.showMonth(events, month);

    this.updateShell(html);

  }

  index() {
    console.log('[Event] Index');

    let html = app.eventView.index(app.events.sort(sortByDate));
    this.updateShell(html);
  }
}
