'use strict';

/** Class representing a organisation's views */
class UserView {
  constructor(){

  }

  /**
  * Returns HTML for the show user screen
  * @param {User} user An user object
  * @return {String} The HTML string for display
  */
  show(user) {
    return `<h1>This is the user show view</h1>`;
  }

  /**
  * Returns HTML for the edit user screen
  * @param {User} user An user object
  * @return {String} The HTML string for display
  */
  edit(user){
    return `<h1>This is the edit user view</h1>`;
  }
}
