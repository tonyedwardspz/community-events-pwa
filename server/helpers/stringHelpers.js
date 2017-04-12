'use strict';

/**
* Generates a random string to be used as an ID for objects. Not the best
* generator in the world...... but it will do for our purposes.
* @param {Int} [length=32] The length of string to generate
* @return The generated random string
*/
exports.randomString = (length = 32) => {
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;
};

/**
* Splits the provided string by the provided deliminator, or a space
* @param {String} str The string to split
* @return The generated random string
*/
exports.splitString = (str, deliminator = ' ') => {
  let strings = str.split(deliminator);
  return strings;
};
