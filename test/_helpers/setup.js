const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const matchers = require('./matchers');

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
  jasmine.getEnv().addMatchers(matchers);
});
