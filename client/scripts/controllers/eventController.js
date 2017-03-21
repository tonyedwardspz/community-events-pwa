'use strict';

class EventController extends BaseController {
  constructor() {
    super();
  }

  show(id) {
    console.info('[Event] Show: ');

    let thisEvent = EventModel.findByID(id, app.events);
    let html = app.eventView.show(thisEvent);

    this.updateShell(html);
  }

  index() {
    console.log('[Event] Index');

    let html = app.eventView.index();
    this.updateShell(html);
  }
}
