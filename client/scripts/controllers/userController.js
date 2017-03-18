'use strict';

class UserController extends BaseController {
  constructor() {
    super();
  }

  show(id) {
    console.info('[User] Show: ' + id);

    this.updateShell(`<h1>Show User: ${id}</h1>`);
  }
}
