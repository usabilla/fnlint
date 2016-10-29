const _ = require('lodash');
const fp = require('lodash/fp');


function getFileName(filePath) {
  return _.flow(
    fp.split('/'),
    fp.last,
    fp.split('.'),
    fp.first
  )(filePath);
}

function getFileExtension(filePath) {
  return _.get((filePath || '').match(/\.(.*)/), 1) || '';
}

function makeRegexStringTest(regex) {
  return string => _.isString(string) && regex.test(string);
}

const isPascalCase = makeRegexStringTest(/^[A-Z]+[a-z]+(?:[A-Z]+[a-z]+)*$/);
const isCamelCase = makeRegexStringTest(/^[a-z]+(?:[A-Z][a-z]+)*$/);
const isKebabCase = makeRegexStringTest(/^[a-z]*(?:[a-z+-])+[a-z]+$/);

function isPrivateKebabCase(string) {
  return _.startsWith(string, '_') && isKebabCase(_.trimStart(string, '_'));
}

module.exports = {
  getFileName,
  getFileExtension,
  makeRegexStringTest,
  isPascalCase,
  isCamelCase,
  isKebabCase,
  isPrivateKebabCase
};
