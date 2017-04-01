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
});
