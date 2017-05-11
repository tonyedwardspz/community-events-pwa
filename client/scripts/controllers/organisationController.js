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
    if (!this.validItem(org, 'name', 'Organisation', id)) {
      return;
    }

    let orgEvents = Organisation.getOrgEvents(id, app.events);
    orgEvents.sort(sortByDate);

    let html = app.organisationView.show(org, orgEvents);

    this.updateShell(html);
  }

  follow(id) {
    console.log('[Organisation] Follow', id);

    // if user follows, unfollow the org else follow it
    let el = document.getElementById('org-follow-' + id);
    let container = document.getElementById('org-item-' + id);
    let button = document.getElementById('org-follow-' + id);
    if (app.user.trackedOrgs.includes(id)) {
      app.user.unfollowOrg(id);
      switchClass(container, 'tracked', 'untracked');
      switchClass(button, 'danger', 'success');
      el.innerHTML = 'follow';
    } else {
      app.user.followOrg(id);
      switchClass(container, 'untracked', 'tracked');
      switchClass(button, 'success', 'danger');

      el.innerHTML = 'unfollow';
    }
    app.db.publish(`/user/${app.user.id}`, app.user, 'PUT');
  }
}
