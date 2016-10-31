'use strict';

const path = require('path');

const reportsDir = path.resolve(process.env.CIRCLE_TEST_REPORTS || './_test-results');

const reporters = require('jasmine-reporters');
let junitReporter = new reporters.JUnitXmlReporter({
  savePath: path.resolve(reportsDir, 'jasmine'),
  consolidateAll: false
});
jasmine.getEnv().addReporter(junitReporter);
