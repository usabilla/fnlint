'use strict';

module.exports = function () {
  return {
    files: ['lib/**/*.js'],
    tests: ['test/**/*.js'],
    testFramework: 'jasmine',
    env: {
      type: 'node',
      runner: 'node'
    }
  };
};
