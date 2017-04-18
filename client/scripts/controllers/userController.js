'use strict';

class UserController extends BaseController {
  constructor() {
    super();
  }

  login(){
    console.log('Login clicked');

    let html = app.userView.login();

    this.updateShell(html);
  }

  show() {
    console.info('[User] Show');

    let html = '';

    if (app.user){
      html = app.userView.show(app.user);
    } else {
      html  = app.userView.login(`Please login to view your profile`);
    }

    this.updateShell(html);
  }

  update() {
    console.info('[User] Update');

    let formData = document.querySelector('form');
    app.user.updateFromForm(formData);

    app.db.publish(`/user/${app.user.id}`, app.user, 'PUT');

    let html = app.userView.show(app.user, true);

    this.updateShell(html);
  }

  trackEvent(id) {
    console.info('[User] Track event: ', id);

    let el = document.getElementById('track-event');
    el.classList.add('tracked');
    el.innerHTML = 'Untrack event';
    el.id = 'untrack-event';

    if (app.user.trackEvent(id)) {
      app.db.publish(`/user/${app.user.id}`, app.user, 'PUT');
      console.log('[User] Event tracked: ', app.user.trackedEvents);
    }
  }

  untrackEvent(id) {
    console.info('[User] Untrack event: ', id);

    let el = document.getElementById('untrack-event');
    el.classList.remove('tracked');
    el.innerHTML = 'Track event';
    el.id = 'track-event';

    if (app.user.removeTrackedEvent(id)) {
      app.db.publish(`/user/${app.user.id}`, app.user, 'PUT');
      console.log('[User] Event untracked: ', app.user.trackedEvents);
    }
  }
}
