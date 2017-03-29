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
}
