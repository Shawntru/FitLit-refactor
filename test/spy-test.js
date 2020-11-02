const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);
const expect = chai.expect;

describe('domManipulation', function() {
  before(function() {
    global.domManipulation = {};
    chai.spy
    
    chai.spy.on(fetch, [])
  })
})