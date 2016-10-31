'use strict';

const _ = require('lodash');
const matchers = require('./matchers');

/**
 * Update lintPackages with matchers then run linter.
 * Returns an array of completed LintPackages.
 * @param {LintPackage[]} lintPackages
 * @returns {LintPackage[]}
 */
function lint(lintPackages) {
  return _.map(lintPackages, _.flow(
    matchers.updatePackageMatcher,
    runPackageLinter
  ));
}

function runPackageLinter(lintPackage) {
  let filesSortedByPassing = lintAndSortFiles(lintPackage.files, lintPackage.matcher);
  return lintPackage
    .set('passing', filesSortedByPassing.passing || [])
    .set('failing', filesSortedByPassing.failing || []);
}

function lintAndSortFiles(files, matcher) {
  return _.groupBy(files, _.flow(
    matcher,
    (pass) => pass ? 'passing' : 'failing'
  ));
}

module.exports = {
  lint
};
