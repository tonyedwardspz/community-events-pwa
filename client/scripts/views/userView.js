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
            <a href="/user/auth/twitter" class="button ${app.online ? '' : 'button-disabled'}"
              ${app.online ? '' : 'onclick="return false;"'}>
              Login with Twitter</a>
            <a href="/user/auth/google" class="button ${app.online ? '' : 'button-disabled'}"
              ${app.online ? '' : 'onclick="return false;"'}>Login with Google</a>`;
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

          <input type="checkbox" id="recievePush"
            ${user.recievePush ? 'checked' : ''} disabled>
          <label class="label-inline" for="recievePush">Recieve Push Notifications?</label>

          </div>

          <input class="button pull-right success" type="submit"
                 value="Update" id="save_user"
                 ${app.online ? '' : 'disabled'}>

        </fieldset>
        </form>
        </div>
      </div>


    `;
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
