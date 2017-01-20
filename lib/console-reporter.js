'use strict';

/* eslint no-console: 0 */
const _ = require('lodash');
require('colors');

module.exports = _.curry(function(matcherName, result) {
  const fileCount = result.failing.concat(result.passing).length;
  if (result.ok) {
    console.log(`fnlint ${matcherName} pass: ${fileCount} file(s) linted`.green);
    return;
  }
  console.error(`${matcherName}: ${result.failing.length} of ${fileCount} file(s) failed linting`.red.underline);
  _.each(result.failing, function(file) {
    console.error(file);
  });
});
