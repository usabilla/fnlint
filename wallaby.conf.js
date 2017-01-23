'use strict';

module.exports = function() {
  return {
    files: ['lib/**/*.js', 'test/_helpers/**/*', './package.json'],
    tests: ['test/**/*.spec.js'],
    testFramework: 'jasmine',
    setup: function() {
      require('./test/_helpers/setup')
    },
    env: {
      type: 'node'
    }
  };
};
