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

  /**
  * Returns a promise to get the organisers from the database
  * @return {Promise} The organisers promise
  */
  getDatabasePromise(model) {
    let mongoModel = this.getMongooseModel();
    return this.getPromise(mongoModel, model);
  }

  /**
  * Returns an promise to get all data from the mongo database
  * @param {Mongo.model} mongoModel The mongo model to be retrieved
  * @param {String} model A string representing the model
  * @return {Promise} A promise to retieve data
  */
  getPromise(mongoModel, model) {
    return new Promise(
      (resolve, reject) => {
        mongoModel.find({}, function(err, data) {
          if (err) {
            reject(err);
          } else {
            switch (model) {
              case 'organisers':
                resolve({ 'organisers' : data});
                break;
              case 'subgroups':
                resolve({ 'subgroups' : data});
                break;
              case 'caches':
                resolve({ 'caches' : data});
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
