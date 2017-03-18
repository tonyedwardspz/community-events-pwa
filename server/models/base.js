'use strict';

class BaseModel {
  constructor() { }

  getPromise(mongoModel, model, id=null) {
    return new Promise(
      function(resolve, reject) {
        mongoModel.find({}, function(err, data) {
          if (err) {
            reject(err);
          } else {
            switch (model) {
              case 'events':
                resolve({ 'events' : data });
                break;
              default:
                break;
            }
          }
        });
      }
    );
  }
}

module.exports = BaseModel;
