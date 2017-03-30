'use strict';

class Venue extends BaseModel {
  constructor(id, name, address, geographic, postcode, lat, long) {
    super();
    this.id = id;
    this.name = name;
    this.address = address;
    this.geographic = geographic;
    this.postcode = postcode;
    this.lat = lat;
    this.long = long;
  }

  getDisplayVenue() {
    return `${this.name}, ${this.geographic}`;
  }

  static processVenueData(data) {
    let venues = [];
    data.forEach(venue => {
      venues.push(
        new Venue(
          venue.id,
          venue.name,
          venue.address,
          venue.geographic,
          venue.postcode,
          venue.lat,
          venue.long
        )
      );
    });
    app.venues = venues;
    return;
  }
}
