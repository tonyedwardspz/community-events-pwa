'use strict';

/**
* Read the provided cookie from the user device
* @param {String} name The key for the required cookie
* @return {String} The value for the cookie
*/
let readCookie = name => {
  let nameEQ = name + '=';
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
};

/**
* Creates a new cookie
* @param {String} name The key for the required cookie
* @param {String} vale The vale of the required cookie
* @param {String} days The number of days the cookie should be valid
*/
let createCookie = (name, value, days) => {
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    let expires = '; expires=' + date.toUTCString();
  } else {
    let expires = '';
    document.cookie = name + '=' + value + expires + '; path=/';
  }
};

/**
* Deletes an existing cookie
* @param {String} name The key of the cookie to be deleted
*/
let eraseCookie = name => {
  createCookie(name, '', -1);
};
