'use strict';

class EventController extends BaseController {
  constructor() {
    super();
  }

  show(id) {
    console.info('[Event] Show: ', id);

    let thisEvent = EventModel.findByID(id, app.events);
    if (!this.validItem(thisEvent, 'title', 'Event', id)) {
      return;
    }

    let thisOrg = Organisation.findByID(thisEvent.organiserID, app.organisations);
    let thisVenue = Venue.findByID(thisEvent.venueID, app.venues);

    // Fetch and sort the organisations upcoming events
    let orgEvents = Organisation.getOrgEvents(thisEvent.organiserID, app.events);
    orgEvents.sort(sortByDate);
    if (orgEvents.length > 4){
      orgEvents.length = 4;
    }

    let html = app.eventView.show(thisEvent, thisOrg, orgEvents, thisVenue,
                                  thisEvent.isTracked());
    this.updateShell(html);
  }

  showMonth(month) {
    console.info(`[Event] Show months events: `, month);

    if(month.includes('month')) {
      month = getMonthNameFromNumber(new Date().getMonth());
    }

    let events = EventModel.getEventsForMonth(getMonthNumberFromName(month));
    events.sort(sortByDate);
    let html = app.eventView.showMonth(events, month);

    this.updateShell(html);
  }

  index() {
    console.log('[Event] Index');

    let events = EventModel.getTrackedEvents();

    let html = app.eventView.index(events.sort(sortByDate));
    this.updateShell(html);
  }

  tracked() {
    console.log('[Event] Tracked');

    let html = `<p>No tracked events.
                <a href="/user/login" title="login">Login</a>
                to begin tracking events you're interested in.</p>`;

    if (app.user){
      let events = EventModel.findObjectsByIds(app.user.trackedEvents, app.events);
      events.sort(sortByDate);
      html = app.eventView.tracked(events);
      html += app.eventView.eventList(events);
    }

    this.updateShell(html);
  }

  showMapEmbed(id) {
    console.log('[Event] Tracked');

    if (app.online) {
      let evnt = EventModel.findByID(id, app.events);
      let html = document.getElementById('map-container');
      if (evnt.hasVenue()) {
        let venue = Venue.findByID(evnt.venueID, app.venues);
        let mapEmbed = app.eventView.mapEmbed(venue.lat, venue.long);
        html.innerHTML = mapEmbed;
      } else {
        html.innerHTML = 'This event has no venue!';
      }

    } else {
      let ref = document.getElementById('show-map');
      let html = document.createElement('p');
      html.innerHTML = 'You must be online to view map';
      insertAfter(html, ref);
    }

  }
}
