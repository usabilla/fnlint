'use strict';

module.exports = function () {
  return {
    files: ['lib/**/*.js'],
    tests: ['test/**/*.js'],
    testFramework: 'jasmine',
    env: {
      type: 'node',
      runner: '/Users/piet/.nvm/versions/node/v6.2.2/bin/node'
    }
  };
};
