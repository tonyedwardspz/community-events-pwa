'use strict';

/** Class representing a organisation's views */
class UserView {
  constructor(){

  }

  login() {
    return `<h2>This is the login view</h2>
           <a href="/user/auth/twitter">Login with Twitter</a>
           <a href="/user/auth/google">Login with Google</a>`;
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
