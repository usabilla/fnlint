'use strict';

const _ = require('lodash');

function makeRegexStringTest(regex) {
  return (string) => _.isString(string) && regex.test(string);
}

module.exports = {
  pascalcase: makeRegexStringTest(/^[A-Z]+[a-z]+(?:[A-Z]+[a-z]+)*$/),
  camelcase: makeRegexStringTest(/^[a-z]+(?:[A-Z][a-z]+)*$/),
  kebabcase: makeRegexStringTest(/^[a-z]*(?:[a-z+-])+[a-z]+$/),

  makeRegexStringTest: makeRegexStringTest
};
