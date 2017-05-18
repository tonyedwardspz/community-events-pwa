'use strict';
/** A base for other models to inherit from, sharing functionality */
class BaseModel {
  constructor(){

  }

  /**
  * Returns the onbject corresponsing with the ID provided
  * @param {String} is The ID to search for
  * @param {Object.Array} objects The array of objects to search
  * @return {Object} The matching object
  */
  static findByID(id, objects) {
    let item = {};

    objects.forEach( obj => {
      if (obj.id === id) {
        item = obj;
      }
    });
    return item;
  }

  /**
  * Returns the matching items from the provided array
  * @param {String} is The ID
  * @param {Object.Array} objects The array of events to search
  * @return {Object.array} The matching events
  */
  static findObjectsByIds(ids, objects) {
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
