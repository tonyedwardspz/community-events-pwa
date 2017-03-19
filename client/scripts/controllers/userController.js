'use strict';

class UserController extends BaseController {
  constructor() {
    super();
  }

  show() {
    console.info('[User] Show');

    this.updateShell(`<h1>Show User</h1>`);
  }

  edit() {
    console.info('[User] Edit');

    this.updateShell('<h1>Edit User</h1>');

  }

  save() {
    console.info('[User] Save');

    this.updateShell('<h1>Save User</h1>');
  }
}