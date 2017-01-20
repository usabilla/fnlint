'use strict';

const _ = require('lodash');

class Result {
  constructor(result) {
    this.passing = result.passing || [];
    this.failing = result.failing || [];
    this.ok = _.isEmpty(result.failing);
  }

  static getResultKey(pass) {
    return pass ? 'passing' : 'failing';
  }
}

module.exports = Result;
