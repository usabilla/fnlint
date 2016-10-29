/*eslint-disable */
const _ = require('lodash');
const linter = require('./linter');
const glob = require('glob');
const asyncMap = require('async/map');
const reporters = require('./reporters');

let reporter = reporters.consoleReporter;


function fnlint(lintSources, cb = _.noop) {
  asyncMap(mapToLintPackages(lintSources), (lintPackage, asyncMapCallback) => {
    glob(lintPackage.src, (err, files) => {
      asyncMapCallback(err, setLintPackageFiles(lintPackage, files));
    });
  }, (err, lintPackages) => {
    cb(err, reporter(linter.lint(lintPackages)));
  });
}

fnlint.sync = function sync(lintSources) {
  return linter.lint(_.map(mapToLintPackages(lintSources), (lintPackage) => {
    return setLintPackageFiles(lintPackage, glob.sync(lintPackage.src));
  }));
};

function mapToLintPackages(lintSources) {
  return _.map(lintSources, (matcherName, src) => {
    return {
      src: src,
      files: [],
      matcherName: matcherName
    }
  });
}

function setLintPackageFiles(lintPackage, files) {
  return _.merge(lintPackage, {files});
}

fnlint.useReporter = function useReporter(rptr) {
  reporter = rptr;
};

fnlint.matchers = {};

module.exports = fnlint;
