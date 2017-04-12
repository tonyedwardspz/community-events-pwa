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
      html  = '<p>User data not present</p>';
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
}
