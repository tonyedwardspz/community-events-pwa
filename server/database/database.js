'use strict';

let mongoose = require('mongoose');

class Database {
  constructor() {
    this.createConnection();
  }

  createConnection(){
    mongoose.connect(process.env.MONGODB_URI, function (err) {
      if (err) {
        console.log ('[Database] Error connecting: ' + err);
      } else {
        console.log ('[Database] Succeeded connected');
      }
    });

    this.connection = mongoose.connection;
  }
}

module.exports = new Database();
