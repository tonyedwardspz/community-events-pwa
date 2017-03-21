'use strict';

class EventController extends BaseController {
  constructor() {
    super();
  }

  show(id) {
    console.info('[Event] Show: ');

    var thisEvent;
    app.events.forEach( evt => {
      if (evt.id === id) {
        thisEvent = evt;
      }
    });

    this.updateShell(`<h1>${thisEvent.title}</h1>`);
  }

  index() {
    console.log('[Event] Index');

    let html = app.eventView.index();
    this.updateShell(html);
  }
}
