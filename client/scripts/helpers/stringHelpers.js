'use strict';

/**
* Generates a random string to be used as an ID for objects. Not the best
* generator in the world...... but it will do for our purposes.
* @param {Int} [length=32] the length of string to generate
* @return The generated random string
*/
let randomString = (length = 32) => {
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;
};

/**
* Capitalizes the first letter of provided string
* @return The capitalized string
*/
let capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.substring(1);
};
