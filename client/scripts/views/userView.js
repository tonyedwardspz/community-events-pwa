'use strict';

/** Class representing a organisation's views */
class UserView extends BaseView {
  constructor(){
    super();
  }

  login(msg = '') {
    let message = `<p>${msg}</p>`;
    let offlineText = this.offlineMessage('login to the app');
    return `<h2>Login</h2>
            ${app.online ? '' : offlineText}
            ${msg.length > 0 ? message : ''}

            <div class="row">
              <div class="column">
                <p>Login to to create a Gather-SW account.</p>
                <p>After signing up, you'll be able to:
                  <ul>
                    <li>Filter events by following organisers.</li>
                    <li>Track events for quick access.</li>
                  </ul>
                </p>
              </div>
            </div>
            <div class="center content-stack">
              <a href="/user/auth/twitter" class="button ${app.online ? '' : 'button-disabled'}"
                ${app.online ? '' : 'onclick="return false;"'}>
                Login with Twitter</a>
              <a href="/user/auth/google" class="button ${app.online ? '' : 'button-disabled'}"
                ${app.online ? '' : 'onclick="return false;"'}>Login with Google</a>
            </div>`;
  }

  /**
  * Returns HTML for the show user screen
  * @param {User} user An user object
  * @param {Boolean} [updated = false] Has the user just been updated?
  * @return {String} The HTML string for display
  */
  show(user, updated = false) {
    let updatedText = `<p>Profile sucessfully updated.</p>`;
    let hasEmailText = `<p>Please update your email address.<p>`;
    let offlineText = this.offlineMessage('update your profile');
    return `<h2>Your Profile</h2>
      ${user.email === null || user.email.length === 0 ? hasEmailText : ''}
      ${app.online ? '' : offlineText}

      <div class="row">
        <div class="column profile-photo-container center">
          <img src="${app.user.profilePhoto}" alt="Profile Photo"
            class="profile-photo">
        </div>

        <div class="column">
        ${updated ? updatedText : ''}
        <form name="show_user">
        <fieldset>

          <label for="firstName">First Name</label>
          <input type="text" name="firstName" id="firstName" autofocus require
            value="${user.firstName ? user.firstName : ''}" class="colum-50">

          <label for="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastName" require
            value="${user.lastName ? user.lastName : ''}">

          <label for="email">Email</label>
          <input type="email" name="email" id="email" require
            placeholder="you@companyname.com"
            value="${user.email ? user.email : ''}">

          <div>

          <input type="checkbox" id="recieveEmail"
            ${user.recieveEmail ? 'checked' : ''}>
          <label class="label-inline" for="recieveEmail">Recieve Emails?</label>

          </div>

          <div>

          <a href="${user.pushpadURL}" target="_blank" rel="noopener noreferrer"
            title="Manage push notifications">
            Manage push notifications</a>

          </div>

          <input class="button pull-right success" type="submit"
                 value="Update" id="save_user"
                 ${app.online ? '' : 'disabled'}>
          <p>${app.online ? '' : 'Saving unavailable, currently offline'}</p>

        </fieldset>
        </form>
        </div>
      </div>


    `;
  }

  /**
  * The user related menu items (profile photo, profile links)
  * @return {String} The HTML string for display
  */
  loggedIn(){
    return `<div class="menu-profile-photo">
              <a href="/user" title="User profile">
                <img src="${app.user.profilePhoto}" alt="Profile Photo"
                 class="profile-photo">
              </a>
            </div>
            <div class="menu-profile-links">
              <a href="/user" title="User profile">Your Profile</a>
              <a href="/logout" title="User profile">Logout</a>
            </div>`;
  }
}
