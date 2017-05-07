'use strict';

var pushpad = require('pushpad');

/** A class encasulating the pushpad notification interface */
class Notification {
  constructor() {
    this.pushPadProject = new pushpad.Pushpad({
      authToken: process.env.PUSHPAD_AUTH_TOKEN,
      projectId: process.env.PUSHPAD_PROJECT_ID
    });
  }

  /**
  * Returns the push pad object
  * @return {Pushpad} The authenticated pushpad object
  */
  get pushPadProject() {
    return this._pushPadProject;
  }

  /**
  * Sets the current ppushpad project
  */
  set pushPadProject(project){
    this._pushPadProject = project;
  }

  /**
  * Returns the push pad object
  * @return {String} The path for the current user, to allow targeting of messages
  */
  getPushpadURL(userID) {
      return this.pushPadProject.pathFor(userID);
  }

  /**
  * Returns a ne pushpad object
  * @return {Pushpad.Notification} The notification object
  */
  getNewNotification(body, title) {
    return new pushpad.Notification({
      project: this.pushPadProject,
      body: body, // max 120 characters
      title: title //  max 30 characters
    });
  }
}

module.exports = new Notification();
