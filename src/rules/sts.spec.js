'use strict';

const csp = require('./sts');
const constants = require('../constants');

describe('sts rule', () => {
  describe('check setup', () => {
    expect(csp.appliesTo).toEqual(constants.HTTPS_ONLY);
    expect(csp.ruleId).toEqual('sts');
  });

  describe('#fail', () => {
    it('no headers', (done) => {
      csp.handle({})
        .then((result) => {
          expect(result).toEqual(false);
          done();
        });
    });
    it('different', (done) => {
      csp.handle({ 'content-type': true })
        .then((result) => {
          expect(result).toEqual(false);
          done();
        });
    });
  });

  describe('#pass', () => {
    it('contains strict-transport-security', (done) => {
      csp.handle({ 'strict-transport-security': true })
        .then((result) => {
          expect(result).toEqual(true);
          done();
        });
    });
  });
});