const _ = require('lodash');
const matchers = require('./matchers');

function lint(lintPackages) {
  return _.map(lintPackages, (lintPackage) => {
    let matcher = matchers.getMatcher(lintPackage.matcherName);
    return _.merge(
      lintPackage,
      lintFiles(matcher, lintPackage.files),
      matcherDescription(matcher)
    );
  })
}

function lintFiles(matcher, files) {
  return _.groupBy(files, _.flow(
    matcher,
    passingOrFailing
  ));
}

function matcherDescription(matcher) {
  return {
    matcherDescription: matchers.getDescription(matcher)
  }
}

function passingOrFailing(pass) {
  return pass ? 'passing' : 'failing';
}

module.exports = {
  lint,
  lintFiles
};
