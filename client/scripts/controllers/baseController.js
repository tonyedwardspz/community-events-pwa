'use strict';

/** A base class for other controllers to inherit from */
class BaseController {
  constructor() {

  }

  /** Removes content from the application shell */
  clearDom() {
    app.shell.innerHtml = '';
  }

  /**
  * Updates the application shell with the passed HTML string
  * @param {String} html The html representing the current view
  */
  updateShell(html) {
    this.clearDom();
    app.shell.innerHtml = html;

  }
}
