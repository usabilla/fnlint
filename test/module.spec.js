'use strict';

const fnlint = require('../lib/module');

const TEST_CONFIG = {
  basePath: './test/_helpers/test-files',
  files: '*.js',
  format: 'kebabcase',
  reporter: false
};

function expectResults(results) {
  expect(results.ok).toBe(false);
  expect(results.passing).toContain('/test-file-two.js');
  expect(results.passing).toContain('/test-file-one.js');
  expect(results.passing).not.toContain('/testFileThree.js');
  expect(results.failing).toContain('/testFileThree.js');
}

describe('fnlint', function() {

  describe('promise', function() {
    it('lints files using given file basePath, files glob, and matcher', function(done) {
      expect(fnlint.promise(TEST_CONFIG)).toResolve(done, expectResults);
    });
  });

  describe('async', function() {
    it('lints files using given file basePath, files glob, and matcher', function(done) {
      fnlint(TEST_CONFIG, (err, results) => {
        if (err) {
          return done.fail(err);
        }
        expectResults(results);
        done();
      });
    });
  });

  describe('sync', function() {
    it('lints files using given file basePath, files glob, and matcher', function() {
      const results = fnlint.sync(TEST_CONFIG);
      expectResults(results);
    });
  });

});
