const get = require('lodash/fp/get');
const trimStart = require('lodash/trimStart');
const startsWith = require('lodash/startsWith');

module.exports = {
  getFileName,
  getFileExtension,
  isPascalCase,
  isCamelCase,
  isKebabCase,
  isPrivateKebabCase
};

function getFileName(filePath) {
  return get(1, filePath.match(/\/([^\/\.]+)\./));
}

function getFileExtension(filePath) {
  return get(1, filePath.match(/\.(.*)/));
}

function isPascalCase(string) {
  return /^[A-Z]+[a-z]+(?:[A-Z]+[a-z]+)*$/.test(string);
}

function isCamelCase(string) {
  return /^[a-z]+(?:[A-Z][a-z]+)*$/.test(string);
}

function isKebabCase(string) {
  return /^[a-z]*(?:[a-z+-])+[a-z]+$/.test(string);
}

function isPrivateKebabCase(string) {
  return startsWith(string, '_') && isKebabCase(trimStart(string, '_'));
}
