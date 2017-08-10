'use strict';

const _ = require('lodash');

function makeRegexStringTest(regex) {
  return (string) => _.isString(string) && regex.test(string);
}

module.exports = {
  pascalcase: makeRegexStringTest(/^[A-Z0-9]+[a-z0-9]+(?:[A-Z0-9]+[a-z0-9]+)*$/),
  camelcase: makeRegexStringTest(/^[a-z0-9]+(?:[A-Z0-9][a-z0-9]+)*$/),
  kebabcase: makeRegexStringTest(/^[a-z0-9]*(?:[a-z0-9+-])+[a-z0-9]+$/),
  snakecase: makeRegexStringTest(/^[a-z0-9]*(?:[a-z0-9+_])+[a-z0-9]+$/),

  makeRegexStringTest: makeRegexStringTest
};
