'use strict';

class OrganisationController extends BaseController {
  constructor() {
    super();
  }

  show(id) {
    console.info('[Organisation] Show: ' + id);

    let org = Organisation.findByID(id, app.organisations);
    let orgEvents = Organisation.getOrgEvents(id, app.events);

    let html = app.organisationView.show(org, orgEvents);

    this.updateShell(html);
  }
}
