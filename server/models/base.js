'use strict';

class BaseModel {
  constructor() { }

  /**
  * Returns a mongoose model for subgroups
  * @return {Mongoose.model} The subgroups mongoose model
  */
  getMongooseModel() {
    return this.mongooseModel;
  }

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
