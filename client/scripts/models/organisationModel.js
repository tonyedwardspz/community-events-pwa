'use strict';

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
}
