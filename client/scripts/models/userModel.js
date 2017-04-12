'use strict';

class User extends BaseModel {
  constructor(userID, twitterID, googleID, email, firstName, lastName,
      recieveEmail, recievePush, accessToken, refreshToken, isAdmin) {
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
    this.isAdmin = isAdmin;
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
      data.isAdmin
    );

    cb();
  }

  updateFromForm(form) {
    this.firstName = form.firstName.value;
    this.lastName = form.lastName.value;
    this.email = form.email.value;
    this.recieveEmail = form.recieveEmail.checked;
  }
}
