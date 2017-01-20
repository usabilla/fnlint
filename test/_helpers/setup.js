'use strict';

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const matchers = require('./matchers');
const promiseMatchers = require('@pietvanzoen/jasmine-promise-matchers');

// Custom reporter
if (!global.wallaby) {
  jasmine.getEnv().clearReporters();
  jasmine.getEnv().addReporter(new SpecReporter({
    spec: {
      displayPending: true
    },
    summary: {
      displayPending: false
    }
  }));
}

// Custom Matchers
beforeEach(function() {
  promiseMatchers.install(jasmine);
  jasmine.getEnv().addMatchers(matchers);
});
