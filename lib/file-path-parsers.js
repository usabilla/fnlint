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
      .split('/')
      .reject(isRelativePathSegment)
      .concat(parsed.name)
      .value();
  }

};

function isRelativePathSegment(segment) {
  return _.includes(['.', '..'], segment);
}
