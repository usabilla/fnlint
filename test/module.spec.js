'use strict';

const _ = require('lodash');
const fnlint = require('../lib/module');

const TEST_CONFIG = {
  basePath: './test/_helpers/test-files',
  files: '*.js',
  format: 'kebabcase',
  reporter: false,
};

function expectResults(results) {
  expect(results.ok).toBe(false);
  expect(results.passing.length).toBe(2);
  expect(results.passing).toContain('/test-file-two.js');
  expect(results.passing).toContain('/test-file-one.js');
  expect(results.passing).not.toContain('/testFileThree.js');
  expect(results.failing.length).toBe(1);
  expect(results.failing).toContain('/testFileThree.js');
}

describe('fnlint', function() {
  describe('promise', function() {
    it('lints files using given file basePath, files glob, and matcher', function(done) {
      expect(fnlint.promise(TEST_CONFIG)).toResolve(done, expectResults);
    });

    it('lints directories when configured', function(done) {
      const config = _.defaults({
        files: '**/*.js',
        format: 'kebabcase',
        directories: true,
      }, TEST_CONFIG);
      expect(fnlint.promise(config)).toResolve(done, function(results) {
        expect(results.ok).toBe(false);
        expect(results.failing).toContain('/testFileThree.js');
        expect(results.failing).toContain('/dirOne/test-file-four.js');
      });
    });

    it('does not include directories when glob pattern is **/*', function(done) {
      const config = _.defaults({
        files: '**/*',
        format: 'kebabcase',
        directories: true,
      }, TEST_CONFIG);
      expect(fnlint.promise(config)).toResolve(done, function(results) {
        expect(results.ok).toBe(false);
        expect(results.failing).not.toContain('/dirOne');
      });
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
