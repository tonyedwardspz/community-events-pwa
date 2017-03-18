'use strict';

class EventController extends BaseController {
  constructor() {
    super();
  }

  show(id) {
    console.info('[Event] Show: ' + id);

    this.updateShell(`<h1>Show event: ${id}</h1>`);
  }
}
