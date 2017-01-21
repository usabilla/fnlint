/* eslint no-console: 0 */
'use strict';

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const promiseMatchers = require('@pietvanzoen/jasmine-promise-matchers');

console.log(`Testing with Node ${process.version}`);

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
});
