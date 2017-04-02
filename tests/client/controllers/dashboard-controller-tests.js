// Look into other alternatives for testing client



// 'use strict';
//
// let path = require('path');
// let dotEnvPath = path.resolve('./.envtest');
// require('dotenv').config({ path: dotEnvPath});
//
// let chai = require('chai');
// let expect = chai.expect;
// chai.use(require('chai-datetime'));
// require('jsdom-global')();
//
// let fs = require('fs');
// let vm = require('vm');
// let req = fs.readFileSync('./public/scripts/require.js');
// let code = fs.readFileSync('./public/scripts/app.js');
// vm.runInThisContext(req);
// vm.runInThisContext(code);
// let data = require('../data/all-data');
// let sinon = require('sinon');
//
// describe('Dashboard Controller', () => {
//
//   beforeEach(() => {
//     sinon.stub(DataController, 'getData', ()=> {
//       return data.allData;
//     });
//
//     sinon.stub(DashboardController, 'updateShell', () => {
//       return
//     });
//   });
//
//   afterEach(() => {
//     DataController.getData.restore();
//     DashboardController.updateShell.restore();
//   });
//
//   it('Should load the dashboard view with events', () => {
//     expect(Dashboard.index()).to.equal('fart');
//   });
// });
