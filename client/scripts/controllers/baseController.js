'use strict';

/** A base class for other controllers to inherit from */
class BaseController {
  constructor() {

  }

  /** Removes content from the application shell */
  clearDom() {
    app.shell.innerHTML = '';
  }

  /**
  * Updates the application shell with the passed HTML string
  * @param {String} html The html representing the current view
  */
  updateShell(html) {
    this.clearDom();
    app.shell.innerHTML = html;
    app.wrap.scrollTop = 0;
  }

  /**
  * Checks to see that a valid object is attempting to be viewed. Returns true
  * ny default. Directs user to the dashboard if false;
  * @param {Object} obj The object to be checked
  * @param {String} prop The property to check for
  * @param {String} type The type of object
  * @param {String} id The id attempting to load
  */
  validItem(obj, prop, type, id){
    try {
      if (!obj.hasOwnProperty(prop)) {
        console.log('[Valid] Not a valid object to view', id);
        app.dashboardController.index(`${type} not found with the ID: ${id}`);

        // Not used because of refresh. Decided to leave the url intact.
        // window.history.pushState({}, null, '/');
        return false;
      }
      return true;
    } catch(e) {
      return true;
    }
  }
}
