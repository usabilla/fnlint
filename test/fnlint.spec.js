const linter = require('../lib/services/linter');
const fnlint = require('../lib/fnlint');
const proxyquire = require('proxyquire');
const glob = require('glob');
const LintPackage = require('../lib/models/lint-package.js');

const TEST_FILES = './test/test-files/*.js';

describe('fnlint', () => {
  let lintResults = {pass: true};
  let expectedLintPackage = LintPackage({ src: TEST_FILES, files: glob.sync(TEST_FILES), matcherName: 'camelcase'});

  beforeEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100;
    spyOn(linter, 'lint').and.returnValue(lintResults);
  });

  it('invokes lint with fetched file names', function(done) {
    fnlint({[TEST_FILES]: 'camelcase'}, () => {
      let lintPackages = linter.lint.calls.mostRecent().args[0];
      expect(expectedLintPackage.toJS()).toEqual(lintPackages[0].toJS());
      done();
    });
  });

  it('returns results of lint via callback', function(done) {
    fnlint({[TEST_FILES]: 'camelcase'}, (err, results) => {
      expect(results).toBe(lintResults);
      done();
    });
  });

  it('returns async errors', function(done) {
    let globError = new Error('glob error');
    let globPromiseMock = jasmine.createSpy('globPromise').and.returnValue(Promise.reject(globError));
    let fnlintGlobMocked = proxyquire('../lib/fnlint', {
      './util/glob': { promise: globPromiseMock }
    });
    fnlintGlobMocked({'foo': 'camelcase'}, (err) => {
      expect(err).toBe(globError);
      done();
    })
  });

  describe('sync', () => {
    it('lints synchronously', function() {
      var results = fnlint.sync({[TEST_FILES]: 'camelcase'});
      let lintPackages = linter.lint.calls.mostRecent().args[0];
      expect(expectedLintPackage.toJS()).toEqual(lintPackages[0].toJS());
      expect(results).toBe(lintResults);
    });
  });

  describe('promise', () => {
    it('lints and returns a promise', function(done) {
      fnlint.promise({[TEST_FILES]: 'camelcase'})
        .then((results) => {
          let lintPackages = linter.lint.calls.mostRecent().args[0];
          expect(expectedLintPackage.toJS()).toEqual(lintPackages[0].toJS());
          expect(results).toBe(lintResults);
          done();
        })
        .catch(done.fail);
    });
  });

});
