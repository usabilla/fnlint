'use strict';

const _ = require('lodash');
const LintPackage = require('../models/lint-package');

module.exports = function optionsParser(options) {
  return {
    lintPackages: _.map(options, (matcherName, src) => {
      return LintPackage({matcherName, src})
    })
  }
};
