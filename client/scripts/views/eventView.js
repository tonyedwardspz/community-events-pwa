'use strict';

/** Class representing a events's views */
class EventView extends BaseView {
  constructor(){
    super();
  }

  /**
  * Returns HTML for the show event screen
  * @param {Event} evnt An event object
  * @param {Organisation} org The organiser object relating to the event
  * @param {Event.Array} orgEvents The upcoming events for the parent organisation
  * @param {Venue} venue The events venue
  * @return {String} The HTML string for display
  */
  show(evnt, org, orgEvents, venue) {
    return `
      <div class="row">
        <div class="column column-75">
          <h2>${evnt.title}</h2>
          <p>Date: ${evnt.getDisplayDate()}<br />
             Location: ${venue.getDisplayVenue()}</p>
          <p>
            <a href="${evnt.ticketURL}" class="button"
              title="Book your place">Book your place</a>
            <a href="/user/track-event/${evnt.id}" class="button"
              title="Track this event">Track Event</a>
          </p>
        </div>
        <div class="column">
          <img src="${org.logoURL}" alt="${org.name} logo" class="event-org-logo">
        </div>
      </div>

      <div class="row divider"></div>
      ${evnt.description}

      <div class="row divider"></div>
      <img src="/public/images/map-placeholder.jpg">

      <div class="row divider"></div>
      <h2><a href="/organisation/${org.id}">${org.name}</a> events</h2>
      ${app.organisationView.upcoming(org, orgEvents, false)}
      <a href="/organisation/${org.id}" class="button pull-right">
      View organisation events</a>
    `;
  }

  showMonth(events, month, currentMonth) {
    let html = `<h2>${getFullMonthName(month)}s Events</h2>`;
    html += this.monthButtons(getNextFourMonths(), month);
    html += '<hr />';
    html += app.eventView.eventList(events);
    return html;
  }

  tracked(events) {
    let html = `<h2>Tracked Events</h2>
      <p>Here's the ${events.length} upcoming event${events.length > 1 ? 's' : ''}
        you're tracking.</p>`;

    return html;
  }

  /**
  * Returns HTML for the index of events
  * @param {Array.<Event>} [events] An array of event objects
  * @return {String} The HTML string for display
  */
  index(events = []) {
    return `
      <h2>All upcoming events</h2>
      ${this.eventList(events)}
    `;
  }

  eventList(events, showImage = true) {
    if (events.length === 0) {
      return 'No upcoming events';
    }

    let list = ``;

    events.forEach(event => {
      let venue = Venue.findByID(event.venueID, app.venues);
      if (showImage){
        let org = Organisation.findByID(event.organiserID, app.organisations);
        list += this.eventListItem(event, venue, org);
      } else {
        list += this.eventListItemNoImage(event, venue);
      }
    });


    return list;
  }

  eventListItem(event, venue, org){
    return `<div class="row event-list-item">
              <div class="column column-75">
                <h3><a href="/event/${event.id}">${event.title}</a></h3>
                <p>${event.getDisplayDate()}<br />
                Location: ${venue.getDisplayVenue(app.venues)}</p>
              </div>
              <div class="column event-list-profile-photo">
                <img src="${org.logoURL}" alt="${org.name} logo"
                class="org-logo pull-right">
              </div>
            </div>
            <div class="row divider"></div>`;
  }

  eventListItemNoImage(event, venue){
    return `<div class="row">
              <div class="column column-75">
                <h3><a href="/event/${event.id}">${event.title}</a></h3>
                <p>${event.getDisplayDate()}<br />
                   Location: ${venue.getDisplayVenue(app.venues)}</p>
              </div>
              <div class="column">
                <a href="/event/${event.id}" class="button pull-right">View Event</a>
              </div>
            </div>
            <div class="row divider"></div>`;
  }

  monthButtons(months, currentMonth = null){
      let html =  `<div class="month-boxes row">`;

      months.forEach(month => {
        let current = false;
        if (currentMonth && currentMonth.toLowerCase() === month.toLowerCase()){
          current = true;
        }
        html += `
          <div class="month-box column column-25 ${current ? 'current' : ''}">
            <a class="button" href="/events/month/${month.toLowerCase()}">${month}</a>
          </div>
        `;
      });

      html += `</div>`;

      return html;
  }
}
