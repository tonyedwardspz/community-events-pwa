'use strict';

let BaseModel = require('./base');
let fetch = require('node-fetch');

class Evnt extends BaseModel {
  constructor() {
    super();
  }

  processEventbriteData(events) {
    let processed = [];
    events.forEach(evt => {
      processed.push({
        'id': evt.id,
        'title': evt.name.text,
        'description': evt.description.html,
        'organiserID': evt.organizer_id,
        'venueID': evt.venue_id,
        'start': evt.start.local,
        'end': evt.end.local,
        'ticketURL': evt.url,
        'source': 'eventbrite',
      });
    });
    return processed;
  }

  processMeetupData(events, subgroups) {
    let processed = [];
    events.forEach(evt => {
      console.log('processing: ', evt.name);
      try {
        processed.push({
          'id': evt.id,
          'title': evt.name,
          'description': evt.description,
          'organiserID': evt.group.urlname,
          'venueID': evt.venue ? evt.venue.id : null,
          'start': this.convertEpochDate(evt.time, evt.utc_offset),
          'end': this.getEndDate(evt.time, evt.utc_offset, evt.duration),
          'ticketURL': evt.link,
          'source': 'meetup',
        });
      } catch (e) {
        console.log('Error processing meetup event: ', e);
      }
    });


    // match events to subgroups to handle multiple groups on cornwall digi
    // Why do the Cornish have to be different? :)
    processed.forEach(evt => {
      subgroups.forEach(sub => {
        if (evt.title.includes(sub.name)){
          evt.organiserID = sub.id;
        }
      });
    });
    return processed;
  }

  convertEpochDate(stamp, offset) {
    let stmp = parseInt(stamp);

    if (offset.toString().includes('-')){
      let off = offset.slice(1, offset.length);
      stmp -= parseInt(off);
    } else {
      stmp += parseInt(offset);
    }
    return new Date(stmp);
  }

  getEndDate(stamp, offset, length) {
    let duration = length === undefined ? 10800000 : length;
    let start = this.convertEpochDate(stamp, offset);
    return new Date(start.getTime() + duration);
  }

  extractEventbriteEvents(events) {
    let results = [];

    events.forEach(event => {
      event.events.forEach(evt => {
        results.push(evt);
      });
    });

    return results;
  }
}

module.exports = new Evnt();
