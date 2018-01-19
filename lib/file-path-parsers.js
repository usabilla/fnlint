'use strict';

const _ = require('lodash');
const path = require('path');

module.exports = {

  fileNameParser(filePath) {
    return path.parse(filePath).name;
  },

  fullPathParser(filePath) {
    const parsed = path.parse(filePath);
    return _.chain(path.normalize(parsed.dir))
      .trim('/')
      .split('/')
      .reject(isRelativePathSegment)
      .concat(parsed.name)
      .value();
  },

  fileExtensionParser(filePath) {
    const name = path.parse(filePath).name;
    return path.parse(name).ext;
  }

};

function isRelativePathSegment(segment) {
  return _.includes(['.', '..'], segment);
}
