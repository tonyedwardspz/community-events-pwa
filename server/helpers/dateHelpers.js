'use strict';

/**
* Checks that the povided date is within the last 2 hours
* @param {Date} date The date to be tested
* @return The generated random string
*/
exports.lastTwoHours = (date) => {
  const TWO_HOURS = 60 * 60 * 1000 * 2;
  const TWO_HOURS_AGO = Date.now() - TWO_HOURS;
  let d = new Date(date);

  console.log('[DATE HELPER]: ' + new Date(TWO_HOURS_AGO));
  console.log('[DATE HELPER]: ' + new Date(date));

  if (d > TWO_HOURS_AGO) {
    return true;
  } else {
    return false;
  }
};
