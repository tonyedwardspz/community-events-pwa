'use strict';

class BaseModel {
  constructor(){

  }

  static findByID(id, objects) {
    let item = {};

    objects.forEach( obj => {
      if (obj.id === id) {
        item = obj;
      }
    });
    return item;
  }

  static getEventsByIds(ids, objects) {
    let matched = [];
    ids.forEach(id => {
      objects.forEach(evnt => {
        if (evnt.id === id) {
          matched.push(evnt);
        }
      });
    });
    return matched;
  }
}
