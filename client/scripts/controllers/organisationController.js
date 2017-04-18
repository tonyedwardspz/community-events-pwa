'use strict';

class OrganisationController extends BaseController {
  constructor() {
    super();
  }

  index() {
    console.info('[Organisation] Index');

    let orgs = app.organisations;
    orgs.sort(function(a, b){
      if(a.name < b.name) {return -1;}
      if(a.name > b.name) {return 1;}
      return 0;
    });

    let html = app.organisationView.index();

    this.updateShell(html);
  }

  show(id) {
    console.info('[Organisation] Show: ' + id);

    let org = Organisation.findByID(id, app.organisations);
    let orgEvents = Organisation.getOrgEvents(id, app.events);

    let html = app.organisationView.show(org, orgEvents);

    this.updateShell(html);
  }
}
