'use strict';

let BaseModel = require('./base');
let fetch = require('node-fetch');

class Venue extends BaseModel {
  constructor() {
    super();
  }

  /**
  * Returns an array of urls which need to be fetched from eventbrite
  * @param {Events.Array} events The organisations data
  * @return {String} An array of url strings
  */
  extractURLS(events) {
    let urls = [];
    const stub = 'https://www.eventbriteapi.com/v3/venues/';

    events.forEach( event => {
      urls.push(`${stub}${event.venueID}/?token=${process.env.EVENTBRITE_TOKEN}`);
    });
    return urls;
  }

  venuesPromise(allData) {
    return new Promise((resolve, reject) => {
      let venueURLS = this.extractURLS(allData.events);

      Promise.all(venueURLS.map( url =>
        fetch(url).then(data => data.json())))
      .then(venues => {
        resolve(venues);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });


    });
  }

  processEventbriteVenueData(data) {
    let venue = {};

    venue.id = data.id;
    venue.name = data.name;
    venue.address = data.address.localized_address_display;
    venue.postcode = data.address.postcode ? data.address.postcode :
                     this.extractPostcode(venue.address)[0];
    venue.lat = data.latitude;
    venue.long = data.longitude;
    venue.geographic = data.address.localized_area_display;

    return venue;
  }

  extractPostcode(address) {
    let postcode_regex = /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/gi;
    return address.match(postcode_regex);
  }
}

module.exports = new Venue();
