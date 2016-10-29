const _ = require('lodash');
const util = require('./util');

const DEFAULT_MATCHERS = [
  ['camelcase', 'should be camel case format', makeFileNameMatcher(util.isCamelCase)],
  ['pascalcase', 'should be pascal case format', makeFileNameMatcher(util.isPascalCase)],
  ['kebabcase', 'should be kebab case format', makeFileNameMatcher(util.isKebabCase)],
  ['privatekebabcase', 'should be private kebab case', makeFileNameMatcher(util.isKebabCase)],
];

let availableMatchers = {};
const matcherDescriptionProp = Symbol('matcher description');

// intitalize default matchers
resetMatchers();

function makeFileNameMatcher(matcher) {
  return filePath => matcher(util.getFileName(filePath));
}

function addMatcher(name, description, matcher) {
  if (!_.isString(name) || !_.isString(description) || !(_.isFunction(matcher) || _.isRegExp(matcher))) {
    throw new Error('addMatcher invalid call signature. ' +
      'Expected name (string), description (string), matcher (function|regex). ' +
      `Got ${_.map(arguments, arg => typeof arg).join(', ')}.`);
  }
  if (availableMatchers[name]) {
    throw new Error(`Matcher "${name}" already exists.`);
  }
  if (_.isRegExp(matcher)) {
    matcher = util.makeRegexStringTest(matcher);
  }
  matcher[matcherDescriptionProp] = description;
  availableMatchers[name] = matcher;
}

function getMatcher(name) {
  if (!availableMatchers[name]) {
    throw new Error(`Unknown matcher "${name}"`);
  }
  return availableMatchers[name];
}

function getDescription(matcher) {
  return matcher[matcherDescriptionProp];
}

function resetMatchers() {
  availableMatchers = {};
  _.each(DEFAULT_MATCHERS, matcherOptions => addMatcher.apply(null, matcherOptions));
}

module.exports = {
  addMatcher,
  getMatcher,
  getDescription,
  resetMatchers,
  makeFileNameMatcher
};
