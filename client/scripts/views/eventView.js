'use strict';

/** Class representing a events's views */
class EventView {
  constructor(){

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
    let hasVenue = evnt.venueID ? true : false;
    let map =  `<div class="row divider"></div>
                <div class="map-container" id="map-container">
                  <a href="" id="show-map" data-id="${evnt.id}" class="button">Show map</a>
                </div>`;
    let mapUnavailable =  `<div class="row divider"></div>
                <div class="map-container" id="map-container">
                  <a href="" class="button disabled" onclick="return false;">Map Unavailable Offline</a>
                </div>`;
    return `
      <div class="row">
        <div class="column column-75 full-width show-event">
          <h2>${evnt.title}</h2>
          <p>Date: ${evnt.getDisplayDate()} - ${evnt.getDislpayTime()}<br />
             Location: ${hasVenue ? venue.getDisplayVenue() : 'TBC'}</p>
          <p>
            <a href="${evnt.ticketURL}" class="button"
              title="Book your place">Tickets</a>
            <a href="#" title="Track this event" data-id="${evnt.id}" class="button ${tracked ? 'tracked': ''}"
              id="${tracked ? 'un': ''}track-event">${tracked ? 'Tracked': 'Not Tracked'}</a>
            ${this.tweetButton(evnt, org)}
          </p>
        </div>
        <div class="column event-org-logo-container">
          <a href="/organisation/${org.id}" title="View organiser">
            <img src="${org.logoURL}" alt="${org.name} logo" class="event-org-logo">
          </a>
        </div>
      </div>

      <div class="row divider"></div>
      ${evnt.description}

      ${ hasVenue && app.online ? map : mapUnavailable}

      <div class="row divider"></div>
      <h2>Upcoming <a href="/organisation/${org.id}">${org.name}</a> events</h2>
      ${app.organisationView.upcoming(org, orgEvents, false)}
      <a href="/organisation/${org.id}" class="button pull-right more">
      View organisation</a>
    `;
  }

  showMonth(events, month, currentMonth) {
    let html = `<h2>${getFullMonthName(month)}'s Events</h2>`;
    html += `<p>Showing ${capitalize(getFullMonthName(month))}'s events for all organisations.<p>`;
    html += this.monthButtons(getNextNMonths(4), month);
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
    let html = `<h2>Tracked Events</h2>`;
    if (events.length === 0) {
      return html += `<p>Your not currently tracking any events. <a href="/events">Find an event</a> you
               like, track it... and it'll apear here.<p>`;
    } else {
      return html += `<p>Here's the ${events.length} upcoming event${events.length > 1 ? 's' : ''}
        you're tracking.</p>`;
    }
  }

  /**
  * Returns HTML for the index of events
  * @param {Array.<Event>} [events] An array of event objects
  * @return {String} The HTML string for display
  */
  index(events = []) {
    let descText = '';
    if (app.user !== null){
      descText = `<p>Showing all upcoming events for your
                  <a href="/organisations" title="Tracked organisers">tracked
                  organisations</a>.</p>`;
    } else {
      descText = `<p>Showing all upcoming events for all <a href="/organisations" title="Tracked organisers">
      organisations</a>.</p>`;
    }
    return `
      <h2>Upcoming events</h2>
      ${descText}
      <hr />
      ${this.eventList(events)}
    `;
  }

  eventList(events, showImage = true) {
    if (events.length === 0) {
      return 'No upcoming events.';
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
    return `<div class="row event-list-item photo">
              <div class="column column-75">
                <h3><a href="/event/${event.id}">${event.title}</a>
                ${event.isTracked() ? trackedBullet : ''}</h3>

                <p>Date: ${event.getDisplayDate()}<br />
                Location: ${hasVenue ? venue.getDisplayVenue() : 'TBC'}</p>
              </div>
              <div class="column event-list-profile-photo">
                <a href="/organisation/${org.id}" title="${org.name} page">
                  <img src="${org.logoURL}" alt="${org.name} logo"
                  class="org-logo pull-right">
                </a>
              </div>
            </div>
            <div class="row divider"></div>`;
  }

  eventListItemNoImage(event, venue){
    let hasVenue = event.venueID ? true : false;
    const trackedBullet = '<span class="is-tracked">Tracked</span>';
    return `<div class="row event-list-item">
              <div class="column column-75 full-width">
                <h3><a href="/event/${event.id}">${event.title}</a>
                ${event.isTracked() ? trackedBullet : ''}</h3>
                <p>${event.getDisplayDate()}<br />
                   Location: ${hasVenue ? venue.getDisplayVenue() : 'TBC'}</p>
              </div>
              <div class="column">
                <a href="/event/${event.id}" class="button pull-right">View Event</a>
              </div>
            </div>
            <div class="row divider"></div>`;
  }

  welcomeEvent(evnt, venue, org) {
    let hasVenue = evnt.venueID ? true : false;
    return `<div class="column column-75 full-width">
              <p class="half-padding">Your next tracked event:</p>
              <h3><a href="/event/${evnt.id}">${evnt.title}</a></h3>
              <p><a href="/organisation/${org.id}" title="${org.name} page">${org.name}</a><br />
              ${evnt.getDisplayDate()} - ${hasVenue ? venue.getDisplayVenue() : 'TBC'}</p>
            </div>`;
  }

  monthButtons(months, currentMonth = null){
      let html = `<div class="month-boxes row">`;

      months.forEach(month => {
        let current = false;
        if (currentMonth && currentMonth.toLowerCase() === month.toLowerCase()){
          current = true;
        }
        html += `
          <div class="month-box column ${current ? 'current' : ''}">
            <a class="button ${current ? 'success' : ''}"
            href="/events/month/${month.toLowerCase()}">${month}</a>
          </div>
        `;
      });

      html += `</div>`;

      return html;
  }

  mapEmbed(lat, long) {
    return `<iframe frameborder="0" allowfullscreen class="map-embed"
    src="https://maps.google.com/maps?q=${lat},${long}&hl=es;z=14&amp;output=embed"></iframe>`;
  }

  // 106 chars before end
  tweetButton(evnt, org) {
    let base = '<a class="button share" target="_blank" rel="noopener" href="http://twitter.com/home?status=MESSAGE">Share</a>';
    let msg = `Check out this event by ${org.twitterHandle ? '@' + org.twitterHandle : org.name} - ${evnt.title} `;
    if (msg.length >=106) {
      msg = msg.slice(0, 102);
      msg += '...';
    }
    msg += `https://community-events-pwa.herokuapp.com/event/${evnt.id} #GatherSW`;
    msg = encodeURIComponent(msg);
    return base.replace('MESSAGE', msg);
  }
}
