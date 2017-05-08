'use strict';

/** An object representing an Organisation */
class Organisation extends BaseModel {
  constructor(id, name, logoURL, apiURL, twitterHandle, website) {
    super();
    this.id = id;
    this.name = name;
    this.logoURL = logoURL;
    this.apiURL = apiURL;
    this.twitterHandle = twitterHandle;
    this.website = website;
  }

  /**
  * Sets the apps organisations, processing them from raw data
  * @param {Organisation.Array} data An JSON array of organisation data
  * @return {}
  */
  static processOrgData(data) {
    let orgs = [];

    data.forEach(org => {
      orgs.push(
        new Organisation(
          org.id,
          org.name,
          org.logoURL,
          org.apiURL,
          org.twitterHandle,
          org.website
        )
      );
    });

    app.organisations = orgs;
    return;
  }

  /**
  * Returns the upcoming events for the provided organisation id
  * @param {String} is The organisation ID
  * @param {Event.Array} events The array of events to test
  * @return {Event.array} The matching events
  */
  static getOrgEvents(id, events){
    let orgEvents = [];

    events.forEach( obj => {
      if (obj.organiserID === id) {
        orgEvents.push(obj);
      }
    });
    return orgEvents;
  }
}
