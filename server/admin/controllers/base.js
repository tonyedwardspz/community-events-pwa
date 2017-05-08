'use strict';

class AdminBaseController {
  constructor() {

  }

  findByID(id, objects) {
    let item = {};

    objects.forEach( obj => {
      if (obj.id === id) {
        item = obj;
      }
    });
    return item;
  }
}

module.exports = AdminBaseController;
