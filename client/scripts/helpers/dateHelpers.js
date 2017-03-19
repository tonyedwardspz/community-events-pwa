'use strict';

/**
* Gets a UK formatted date for display to user
* @param {String} date The full unix date string to convert
* @return {String} Formatted date string - dd/mm/yyyy
*/
let convertDateToLocale = (date) => {
  try {
    return new Date(date).toLocaleDateString('en-GB');
  } catch (e) {
    console.warn('Error converting date - Trying backup: ' + e);
    let _date = new Date(date);
    return `${_date.getDate()}/${_date.getMonth() + 1}/${_date.getFullYear()}`;
  }
};

/**
* Checks to see if the passed date is prior to today
* @param {String} date The date which needs to be checked
* @return {Boolean} Whether the date is after today or not
*/
let isDateAfterToday = (date) => {
  return (new Date(date) >= new Date().setHours(0,0,0,0)) ? true : false;
};