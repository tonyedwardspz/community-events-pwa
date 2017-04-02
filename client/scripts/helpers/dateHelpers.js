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

/**
* Sorts an array by date, with the oldest first. Use with Array.sort()
* @param {Event} a Event 1 to compare
* @param {Event} a Event 2 to compare
* @return {Integer} The order of items
*/
let sortByDate = (a, b) => {
  return new Date(a.start) - new Date(b.start);
};

/**
* Gets an array containing the next 6 months of truncated month names
* @return {String.Array} The array of truncated month names
*/
let getNextSixMonths = () => {
  let date = new Date();
  const months = ['Jan','Feb','Mar','Apr','May','Jun',
                  'Jul','Aug','Sep','Oct','Nov','Dec'];
  let sortedMonths = [];
  for(let i = date.getMonth(); i <= months.length -1; i++){
    sortedMonths.push(months[i]);
  }
  for(let i = 0; i < date.getMonth(); i++){
    sortedMonths.push(months[i]);
  }
  sortedMonths.length = 6;
  return sortedMonths;
};

let getMonthNumberFromName = (name) => {
  const months = ['Jan','Feb','Mar','Apr','May','Jun',
                  'Jul','Aug','Sep','Oct','Nov','Dec'];
  let monthNumber = -1;
  for(let i = 0; i <= months.length -1; i++) {
    if (months[i].toLowerCase() === name) {
      monthNumber = i;
    }
  }
  return monthNumber;
};
