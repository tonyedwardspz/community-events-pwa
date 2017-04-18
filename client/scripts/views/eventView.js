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
  show(evnt, org, orgEvents, venue, tracked = false) {
    return `
      <div class="row">
        <div class="column column-75">
          <h2>${evnt.title}</h2>
          <p>Date: ${evnt.getDisplayDate()}<br />
             Location: ${venue.getDisplayVenue()}</p>
          <p>
            <a href="${evnt.ticketURL}" class="button"
              title="Book your place">Book your place</a>
            <a href="/user/${tracked ? 'un': ''}track-event/${evnt.id}"
              class="button ${tracked ? 'tracked': ''}" title="Track this event"
              id="track-event">${tracked ? 'Untrack Event': 'Track Event'}</a>
          </p>
        </div>
        <div class="column">
          <a href="/organisation/${org.id}" title="View organiser">
          <img src="${org.logoURL}" alt="${org.name} logo" class="event-org-logo">
          </a>
        </div>
      </div>

      <div class="row divider"></div>
      ${evnt.description}

      <div class="row divider"></div>
      <a href="" id="show-map" data-id="${venue.id}" class="button">Show map</a>

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

  /**
  * Returns HTML for top of the tracked events page
  * @param {Array.<Event>} [events] An array of event objects
  * @return {String} The HTML string for display
  */
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

    let list = `<div class="list-wrap">`;

    events.forEach(event => {
      let venue = Venue.findByID(event.venueID, app.venues);

      if (showImage){
        let org = Organisation.findByID(event.organiserID, app.organisations);
        list += this.eventListItem(event, venue, org);
      } else {
        list += this.eventListItemNoImage(event, venue);
      }
    });

    return list+= '</div>';
  }

  eventListItem(event, venue, org){
    let hasVenue = event.venueID ? true : false;
    const trackedBullet = '<span class="is-tracked">Tracked</span>';
    return `<div class="row event-list-item">
              <div class="column column-75">
                <h3><a href="/event/${event.id}">${event.title}</a>
                ${event.isTracked() ? trackedBullet : ''}</h3>

                <p>Date: ${event.getDisplayDate()}<br />
                Location: ${hasVenue ? venue.getDisplayVenue() : 'TBC'}</p>
              </div>
              <div class="column event-list-profile-photo">
                <img src="${org.logoURL}" alt="${org.name} logo"
                class="org-logo pull-right">
              </div>
            </div>
            <div class="row divider"></div>`;
  }

  eventListItemNoImage(event, venue){
    const trackedBullet = '<span class="is-tracked">Tracked</span>';
    return `<div class="row event-list-item">
              <div class="column column-75">
                <h3><a href="/event/${event.id}">${event.title}</a>
                ${event.isTracked() ? trackedBullet : ''}</h3>
                <p>${event.getDisplayDate()}<br />
                   Location: ${venue.getDisplayVenue()}</p>
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

  mapEmbed(lat, long) {
    return `<iframe frameborder="0" allowfullscreen class="map-embed"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.426779637843!2d-${long}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDIyJzA5LjQiTiA0wrAwOCcxOC44Ilc!5e0!3m2!1sen!2suk!4v1492448183454">
     </iframe>`;
  }
}
