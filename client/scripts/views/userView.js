'use strict';

/** Class representing a organisation's views */
class UserView {
  constructor(){

  }

  login(msg = '') {
    let message = `<p>${msg}</p>`
    return `<h2>Login</h2>
           ${msg.length > 0 ? message : ''}
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
      ${user.email === null || user.email.length === 0 ? hasEmailText : ''}
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

  /**
  * The popover presented to the user if they have no email.
  * @return {String} The HTML string for display
  */
  emailPopover() {
    return `<div class="popover" id="popover">
            <p>We dont seem to have an email address asociated to your acount.
            Please provide one so that we can link your social profiles</p>
            <p>
              <a href="/user" title="Update user profile" id="update-profile">Update Profile</a>
            </p>
            </div>`;
  }
}
