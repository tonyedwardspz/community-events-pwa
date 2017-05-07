'use strict';

var pushpad = require('pushpad');

class Notification {
  constructor() {
    this.pushPadProject = new pushpad.Pushpad({
      authToken: process.env.PUSHPAD_AUTH_TOKEN,
      projectId: process.env.PUSHPAD_PROJECT_ID
    });
  }

  get pushPadProject() {
    return this._pushPadProject;
  }

  set pushPadProject(project){
    this._pushPadProject = project;
  }

  getPushpadURL(userID) {
      return this.pushPadProject.pathFor(userID);
  }

  getNewNotification(body, title) {
    return new pushpad.Notification({
      project: this.pushPadProject,
      body: body, // max 120 characters
      title: title //  max 30 characters
    });
  }
}

module.exports = new Notification();
