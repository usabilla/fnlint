'use strict';

const _ = require('lodash');
const map = require('lodash/fp/map');
const path = require('path');
const Linter = require('./linter');
const glob = require('glob-promise');
const matchers = require('./matchers');
const pathParsers = require('./file-path-parsers');
const consoleReporter = require('./console-reporter');


function fnlint(options, cb) {
  fnlint.promise(options)
    .then((results) => cb(null, results))
    .catch((err) => cb(err));
}


fnlint.promise = function(options) {
  const opts = parseOptions(options);
  const linter = makeLinter(opts);
  return glob(opts.globPath, {nodir: true})
    .then(map(removeBasePath(opts)))
    .then(linter.lint)
    .then(report(opts));
};


fnlint.sync = function(options) {
  const opts = parseOptions(options);
  const linter = makeLinter(opts);
  const files = _.map(glob.sync(opts.globPath, {nodir: true}), removeBasePath(opts));
  const results = linter.lint(files);
  report(options, results);
  return results;
};


function removeBasePath(options) {
  return (filePath) => _.replace(filePath, options.basePath, '');
}

function parseOptions(options) {
  const basePath = path.resolve(options.basePath || '');
  return _.defaults({
    basePath: basePath,
    files: options.files,
    globPath: path.join(basePath, options.files),
  }, options);
}

const report = _.curry(function(options, results) {
  let reporter = consoleReporter(options.format);
  if (options.reporter === false) {
    reporter = _.noop;
  }
  reporter(results);
  return results;
});

function makeLinter(options) {
  const parser = options.directories ? pathParsers.fullPathParser : pathParsers.fileNameParser;
  return new Linter({
    pathParser: parser,
    matcher: matchers[options.format],
  });
}

module.exports = fnlint;
