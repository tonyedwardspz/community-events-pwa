'use strict';

let assert = require('assert');
let fs = require('fs');
let vm = require('vm');
let code = fs.readFileSync('./client/scripts/helpers/viewHelpers.js');
vm.runInThisContext(code);




describe('View Helpers', () => {
  describe('#twitterLink(handle)', () => {

    it('Returns a link tag for the provided handle', () => {
      let expected = `<a href="https://twitter.com/tonyedwardspz" target="_blank">https://twitter.com/tonyedwardspz</a>`;
      assert.equal(expected, twitterLink('tonyedwardspz'));
    });
  });

  describe('#webLink(url, title)', () => {

    it('Returns a link tag for the provided url with a title atribute', () => {
      let expected = `<a href="https://kernowdat.co.uk" target="_blank" title="Kernow DAT website">https://kernowdat.co.uk</a>`;
      assert.equal(expected, webLink('https://kernowdat.co.uk', 'Kernow DAT'));
    });
  });
});
