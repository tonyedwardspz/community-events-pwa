'use strict';

class User extends BaseModel {
  constructor(userID, twitterID, googleID, email, firstName, lastName,
      recieveEmail, recievePush, accessToken, refreshToken, profilePhoto,
      trackedEvents, trackedOrgs, pushpadURL) {
    super();
    this.userID = userID;
    this.twitterID = twitterID;
    this.googleID = googleID;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.recieveEmail = recieveEmail;
    this.recievePush = recievePush;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.profilePhoto = profilePhoto;
    this.trackedEvents = trackedEvents;
    this.trackedOrgs = trackedOrgs;
    this.pushpadURL = pushpadURL;
  }

  static processUserData(data, cb) {
    app.user = new User(
      data.userID,
      data.twitterID,
      data.googleID,
      data.email,
      data.firstName,
      data.lastName,
      data.recieveEmail,
      data.recievePush,
      data.accessToken,
      data.refreshToken,
      data.profilePhoto,
      data.trackedEvents,
      data.trackedOrgs,
      data.pushpadURL
    );

    cb();
  }

  static getTrackedOrgs() {
    if (app.user && app.user.trackedOrgs) {
      return app.user.trackedOrgs;
    } else {
      return ['6377821409', '11761620027', 'techexeter', '8225401568',
        'Cornwall-Digital', 'Digital-Exeter', 'AgileSouthWest', 'Plymouth-Web',
        'hVwi8wFm8qwexGwr7891n34x913', 'niux6i76QBI6Ppi7yxpisuHa8wy',
        'CIAHQy0aMziIvOFikGeyg2lZeAC5KxcS', 'JFNoAXzlQ4Is2kHpUouCSLbOEGksUDyh'];
    }
  }

  updateFromForm(form) {
    this.firstName = form.firstName.value;
    this.lastName = form.lastName.value;
    this.email = form.email.value;
    this.recieveEmail = form.recieveEmail.checked;
  }

  trackEvent(eventID) {
    try {
      if (!this.trackedEvents.includes(eventID)) {
        this.trackedEvents.push(eventID);
        return true;
      }
    } catch (e) {
      console.log('[User Model] Error tracking event', e);
    }
    return false;
  }

  removeTrackedEvent(eventID) {
    try {
      if (this.trackedEvents.includes(eventID)) {
        this.trackedEvents.splice(this.trackedEvents.indexOf(eventID), 1);
        return true;
      }
    } catch (e) {
      console.log('[User Model] Error untracking event', e);
    }
    return false;
  }

  followOrg(id) {
    this.trackedOrgs.push(id);
  }

  unfollowOrg(id) {
    let index = this.trackedOrgs.indexOf(id);
    if (index > -1) {
      this.trackedOrgs.splice(index, 1);
    }
  }
}
