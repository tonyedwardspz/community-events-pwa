'use strict';

class BaseModel {
  constructor() { }

  getPromise(mongoModel, model, id=null) {
    return new Promise(
      (resolve, reject) => {
        mongoModel.find({}, function(err, data) {
          if (err) {
            reject(err);
          } else {
            switch (model) {
              case 'events':
                resolve({ 'events' : data });
                break;
              case 'organisers':
                resolve({ 'organisers' : data});
                break;
              case 'subgroups':
                resolve({ 'subgroups' : data});
                break;
              default:
                console.log('Promise default hit');
                break;
            }
          }
        });
      }
    );
  }
}

module.exports = BaseModel;
