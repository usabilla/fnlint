'use strict';

const _ = require('lodash');
const util = require('./../util/util');

const DEFAULT_MATCHERS = [
  ['camelcase', 'should be camel case format', makeFileNameMatcher(util.isCamelCase)],
  ['pascalcase', 'should be pascal case format', makeFileNameMatcher(util.isPascalCase)],
  ['kebabcase', 'should be kebab case format', makeFileNameMatcher(util.isKebabCase)],
  ['privatekebabcase', 'should be private kebab case', makeFileNameMatcher(util.isPrivateKebabCase)],
];
let availableMatchers = {};
const matcherDescriptionProp = Symbol('matcher description');

// intitalize default matchers
resetMatchers();

/**
 * Creates a matcher from a test function. Test function
 * receives a file name.
 * @param {Function} test Boolean returning test function.
 * @returns {function(String): boolean}
 */
function makeFileNameMatcher(test) {
  return (filePath) => test(util.getFileName(filePath));
}

/**
 * Add a new matcher to available matchers.
 * @param {String} name Matcher reference name.
 * @param {String} description
 * @param {Function|RegExp} matcher
 * @returns void
 */
function addMatcher(name, description, matcher) {
  if (!_.isString(name) || !_.isString(description) || !(_.isFunction(matcher) || _.isRegExp(matcher))) {
    throw new Error('addMatcher invalid call signature. ' +
      'Expected name (string), description (string), matcher (function|regex). ' +
      `Got ${_.map(arguments, (arg) => typeof arg).join(', ')}.`);
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

/**
 * Get a matcher by name.
 * @param {String} name
 * @returns {Function}
 */
function getMatcher(name) {
  if (!availableMatchers[name]) {
    throw new Error(`Unknown matcher "${name}"`);
  }
  return availableMatchers[name];
}

/**
 * Get description from matcher function.
 * @param {Function} matcher
 * @returns {String}
 */
function getDescription(matcher) {
  if (!_.isFunction(matcher)) {
    throw new Error(`Expected a matcher function. Got a ${typeof matcher}: ${matcher}`)
  }
  return matcher[matcherDescriptionProp];
}

/**
 * Resets available matchers to default.
 * @returns void
 */
function resetMatchers() {
  availableMatchers = {};
  _.each(DEFAULT_MATCHERS, (matcherOptions) => addMatcher.apply(null, matcherOptions));
}

/**
 * Populates the given LintPackage matcher with regex,
 * function, or predefined matcher based on matcherName.
 * @param {LintPackage} lintPackage
 * @returns {LintPackage} New LintPackage instance.
 */
function updatePackageMatcher(lintPackage) {
  let matcherName = lintPackage.matcherName;
  let matcher;
  let matcherDescription;

  if (_.isRegExp(matcherName)) {
    matcher = function regexMatcher(string) { return matcherName.test(string); };
    matcherDescription = `should match regex ${matcherName.toString()}`
  } else if (_.isFunction(matcherName)) {
    matcher = matcherName;
    matcherDescription = matcher.name || 'custom matcher';
  } else {
    matcher = getMatcher(lintPackage.matcherName);
    matcherDescription = getDescription(matcher);
  }

  return lintPackage
    .set('matcherName', matcherName.toString())
    .set('matcher', matcher)
    .set('matcherDescription', matcherDescription)
}

module.exports = {
  addMatcher,
  getMatcher,
  getDescription,
  resetMatchers,
  makeFileNameMatcher,
  updatePackageMatcher
};
