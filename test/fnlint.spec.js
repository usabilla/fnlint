const linter = require('../lib/linter');
const fnlint = require('../lib/fnlint');
const proxyquire = require('proxyquire');
const glob = require('glob');

const TEST_FILES = './test/test-files/*.js';

describe('fnlint', () => {
  let lintResults = {pass: true};
  let expectedLintArgs = [
    { src: TEST_FILES, files: glob.sync(TEST_FILES), matcherName: 'camelcase' }
  ];

  beforeEach(function() {
    spyOn(linter, 'lint').and.returnValue(lintResults);
  });

  it('invokes lint with fetched file names', function(done) {
    fnlint({[TEST_FILES]: 'camelcase'}, () => {
      expect(linter.lint).toHaveBeenCalledWith(expectedLintArgs);
      done();
    });
  });

  it('returns results of lint via callback', function(done) {
    fnlint({[TEST_FILES]: 'camelcase'}, (err, results) => {
      expect(results).toBe(lintResults);
      done();
    });
  });

  it('returns async errors and does not give report', function(done) {
    let globError = new Error('glob error');
    let globMock = jasmine.createSpy('glob').and.callFake((pattern, callback) => {
      callback(globError);
    });
    let fnlintGlobMocked = proxyquire('../lib/fnlint', {
      glob: globMock
    });
    fnlintGlobMocked({'foo': 'camelcase'}, (err) => {
      expect(err).toBe(globError);
      done();
    })
  });

  it('invokes the default reporter with the linting results', function() {

  });

  describe('sync', () => {
    it('lints synchronously', function() {
      var results = fnlint.sync({[TEST_FILES]: 'camelcase'});
      expect(linter.lint).toHaveBeenCalledWith(expectedLintArgs);
      expect(results).toBe(lintResults);
    });
  });

});
