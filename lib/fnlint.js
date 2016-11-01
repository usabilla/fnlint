'use strict';

const _ = require('lodash');
const linter = require('./services/linter');
const glob = require('./util/glob');
const mapPromise = require('./util/map-promise');
const reporters = require('./services/reporters');
const optionsParser = require('./util/options-parser');
const util = require('./util/util');


function fnlint(options, cb) {
  cb = cb || _.noop;
  fnlint.promise(options)
    .then((result) => cb(null, result))
    .catch(cb);
}


fnlint.promise = function promise(options) {
  let parsedOptions = optionsParser(options);
  return mapPromise(parsedOptions.lintPackages, (lintPackage) => {
    return glob.promise(lintPackage.src)
      .then((files) => lintPackage.set('files', files));
  }).then((result) => {
    return reportResults(linter.lint(result));
  })
};


fnlint.sync = function sync(options) {
  let parsedOptions = optionsParser(options);
  return reportResults(linter.lint(_.map(parsedOptions.lintPackages, (lintPackage) => {
    return lintPackage.set('files', glob.sync(lintPackage.src));
  })));
};

function reportResults(results) {
  return _.tap(results, reporters.consoleReporter);
}

fnlint.util = util;

module.exports = fnlint;
