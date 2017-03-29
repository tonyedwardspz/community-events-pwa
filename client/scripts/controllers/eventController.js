'use strict';

class EventController extends BaseController {
  constructor() {
    super();
  }

  show(id) {
    console.info('[Event] Show: ' + id);

    let thisEvent = EventModel.findByID(id, app.events);
    let thisOrg = Organisation.findByID(thisEvent.organiserID, app.organisations);
    let orgEvents = Organisation.getOrgEvents(thisEvent.organiserID, app.events);
    orgEvents.sort(sortByDate);

    let html = app.eventView.show(thisEvent, thisOrg, orgEvents);

    this.updateShell(html);
  }

  index() {
    console.log('[Event] Index');

    let html = app.eventView.index();
    this.updateShell(html);
  }
}
