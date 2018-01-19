'use strict';

const _ = require('lodash');
const fnlint = require('../lib/module');

const TEST_CONFIG = {
  basePath: './test/_helpers/test-files',
  files: '*.js',
  format: 'kebabcase',
  reporter: false
};

const EXT_TEST_CONFIG = {
  basePath: './test/_helpers/extension-test-files',
  files: '*.js',
  extensions: true,
  format: 'extension',
  extensionName: 'config',
  reporter: false
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

function expectExtensionResults(results) {
  expect(results.ok).toBe(false);
  expect(results.passing.length).toBe(2);
  expect(results.passing).toContain('/a.config.js');
  expect(results.passing).toContain('/b.config.js');
  expect(results.passing).not.toContain('/index.js');
  expect(results.failing.length).toBe(1);
  expect(results.failing).toContain('/index.js');
}

describe('fnlint', function() {
  describe('promise', function() {
    it('lints files using given file basePath, files glob, and matcher', function(done) {
      expect(fnlint.promise(TEST_CONFIG)).toResolve(done, expectResults);
    });

    it('Extension - lints files using given file basePath, files glob, and matcher', function(done) {
      expect(fnlint.promise(EXT_TEST_CONFIG)).toResolve(done, expectExtensionResults);
    });

    it('lints directories when configured', function(done) {
      const config = _.defaults({
        files: '**/*.js',
        format: 'kebabcase',
        directories: true
      }, TEST_CONFIG);
      expect(fnlint.promise(config)).toResolve(done, function(results) {
        expect(results.ok).toBe(false);
        expect(results.failing).toContain('/testFileThree.js');
        expect(results.failing).toContain('/dirOne/test-file-four.js');
      });
    });

    it('Extension - lints directories when configured', function(done) {
      const config = _.defaults({
        files: '**/*.js',
        format: 'extension',
        extensions: true,
        extensionName: 'test'
      }, EXT_TEST_CONFIG);
      expect(fnlint.promise(config)).toResolve(done, function(results) {
        expect(results.ok).toBe(false);
        expect(results.failing).toContain('/a.config.js');
        expect(results.failing).toContain('/b.config.js');
        expect(results.failing).toContain('/index.js');
        expect(results.failing).toContain('/sampleDir/c.config.js');
        expect(results.failing).toContain('/sampleDir/index.js');
      });
    });

    it('does not include directories when glob pattern is **/*', function(done) {
      const config = _.defaults({
        files: '**/*',
        format: 'kebabcase',
        directories: true
      }, TEST_CONFIG);
      expect(fnlint.promise(config)).toResolve(done, function(results) {
        expect(results.ok).toBe(false);
        expect(results.failing).not.toContain('/dirOne');
      });
    });

    it('Extension - does not include directories when glob pattern is **/*', function(done) {
      const config = _.defaults({
        files: '**/*',
        format: 'extension',
        extensions: true,
        extensionName: 'test'
      }, EXT_TEST_CONFIG);
      expect(fnlint.promise(config)).toResolve(done, function(results) {
        expect(results.ok).toBe(false);
        expect(results.failing).not.toContain('/sampleDir');
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
