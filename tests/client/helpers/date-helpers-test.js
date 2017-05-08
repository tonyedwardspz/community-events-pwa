'use strict';

let assert = require('assert');
let fs = require('fs');
let vm = require('vm');
let code = fs.readFileSync('./client/scripts/helpers/dateHelpers.js');
vm.runInThisContext(code);
let data = require('../../server/data/event-data');

describe('Date Helpers', () => {
  let _date = new Date();
  let month = ('0' + (_date.getMonth() + 1)).slice(-2);
  let day = ('0' + _date.getDate()).slice(-2);

  describe('#convertDateToLocale(date)', () => {

    it('Returns UK formatted date when passed a string', () => {
      assert.equal('1/12/2017', convertDateToLocale('2017-01-12T08:45:00.000Z'));
    });
  });

  describe('#sortByDate()', () => {
    let data = [{'name':'second', 'start': '2017-04-17T13:00:00'},
                {'name': 'first', 'start': '2017-04-15T13:00:00'}];
    let expected = [{'name':'first', 'start': '2017-04-15T13:00:00'},
                {'name': 'second', 'start': '2017-04-17T13:00:00'}];
    data = data.sort(sortByDate);

    it('Sorts an array of events by date', () => {
      assert.equal(data[0].name, expected[0].name);
    });
  });

  describe('#isDateAfterToday()', () => {

    it('Returns true if date is after today', () => {
      assert.equal(true, isDateAfterToday('2025-01-01T00:00:00Z'));
    });

    it('Returns false if date is before today', () => {
      assert.equal(false, isDateAfterToday('2010-01-01T00:00:00Z'));
    });
  });

  describe('#getNextNMonths()', () => {
    let expected = ['Apr','May','Jun','Jul'];
    let actual = getNextNMonths(4, new Date('2017-04-01T13:00:00'));

    it('Returns an array containing 4 three letter month names', () => {
      assert.deepEqual(expected, actual);
      assert.equal(4, actual.length);
      assert.equal(3, actual[0].length);
    });
  });

  describe('#getMonthNumberFromName()', () => {

    it('Returns the correct month number from the supplied name', () => {
      assert.equal(0, getMonthNumberFromName('jan'));
      assert.equal(0, getMonthNumberFromName('Jan'));
      assert.equal(11, getMonthNumberFromName('dec'));
      assert.equal(-1, getMonthNumberFromName('dgisdahdsahj'));
    });
  });

  describe('#getFullMonthName()', () => {

    it('Returns the full month name from the supplied 3 char name', () => {
      assert.equal('January', getFullMonthName('jan'));
      assert.equal('January', getFullMonthName('Jan'));
      assert.equal('December', getFullMonthName('dec'));
      assert.equal('No month string!', getFullMonthName('dgisdahdsahj'));
    });
  });
});
