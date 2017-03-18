'use strict';

class OrganisationController extends BaseController {
  constructor() {
    super();
  }

  show(id) {
    console.info('[Organisation] Show: ' + id);

    this.updateShell(`<h1>Show Organisation: ${id}</h1>`);
  }
}
