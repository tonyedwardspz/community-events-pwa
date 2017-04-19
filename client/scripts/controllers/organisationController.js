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

  follow(id) {
    console.log('[Organisation] Follow', id);

    // if user dosnt follow, follow the org
    // else unfollow the org
    let el = document.getElementById('org-follow-' + id);
    let container = document.getElementById('org-item-' + id);
    if (app.user.trackedOrgs.includes(id)) {

      console.log('[Organisation] Unfollowing org: ', id);
      let index = app.user.trackedOrgs.indexOf(id);
      if (index > -1) {
        app.user.trackedOrgs.splice(index, 1);
      }
      console.log(app.user.trackedOrgs);

      el.innerHTML = 'follow';
      container.classList.remove('tracked');
      container.classList.add('untracked');

    } else {
      console.log('[Organisation] Following org: ', id);
      app.user.trackedOrgs.push(id);
      console.log(app.user.trackedOrgs);

      el.innerHTML = 'unfollow';
      container.classList.add('tracked');
      container.classList.remove('untracked');
    }
    app.db.publish(`/user/${app.user.id}`, app.user, 'PUT');
  }
}
