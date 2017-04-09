'use strict';

/** Class representing a organisation's views */
class UserView {
  constructor(){

  }

  login() {
    return `<h2>This is the login view</h2>
           <a href="/user/auth/twitter" class="button">Login with Twitter</a>
           <a href="/user/auth/google" class="button">Login with Google</a>`;
  }

  /**
  * Returns HTML for the show user screen
  * @param {User} user An user object
  * @param {Boolean} [updated = false] Has the user just been updated?
  * @return {String} The HTML string for display
  */
  show(user, updated = false) {
    let updatedText = `<p>Profile sucessfully updated</p>`;
    let hasEmailText = `<p>Please update your email address<p>`;
    return `<h2>Your Profile</h2>
      ${updated ? updatedText : ''}
      ${user.email === null ? hasEmailText : ''}
      <form name="show_user">
      <fieldset>

        <label for="firstName">First Name</label>
        <input name="firstName" id="firstName" autofocus require
         value="${user.firstName ? user.firstName : ''}">

        <label for="lastName">Last Name</label>
        <input name="lastName" id="lastName" require
         value="${user.lastName ? user.lastName : ''}">

        <label for="email">email</label>
        <input name="email" id="email" require placeholder="you@companyname.com"
         value="${user.email ? user.email : ''}">

        <input type="checkbox" id="recieveEmail" ${user.recieveEmail ? 'checked' : ''}>
        <label class="label-inline" for="recieveEmail">Recieve Emails?</label>

        <p>Push notifications here</p>

        <input class="button-primary" type="submit" value="Update" id="save_user">

      </fieldset>
      </form>
    `;
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
