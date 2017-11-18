'use strict';

/**
* Checks that the povided date is within the last n hours
* @param {Date} date The date to be tested
* @param {Integer} hours The number of hours ago to test
* @return The generated random string
*/
exports.lastNHours = (date, hours) => {
  const N_HOURS = 60 * 60 * 1000 * hours;
  const N_HOURS_AGO = Date.now() - N_HOURS;
  let d = new Date(date);

  console.log('[Date Helper]: ' + new Date(N_HOURS_AGO));
  console.log('[Date Helper]: ' + new Date(date));

  if (d > N_HOURS_AGO) {
    return true;
  } else {
    return false;
  }
};
