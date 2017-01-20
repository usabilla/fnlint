'use strict';

const Linter = require('../lib/linter');
const path = require('path');

describe('Linter', function() {

  function fooMatcher(name) {
    return name === 'foo';
  }

  function getFileName(filePath) {
    return path.parse(filePath).name;
  }

  function getFilePathParts(filePath) {
    const parsed = path.parse(filePath);
    return parsed.dir.split('/').concat(parsed.name);
  }

  describe('#testFilePath', function() {
    it('uses given pathParser and test to match filePath', function() {
      const linter = new Linter({
        pathParser: getFileName,
        matcher: fooMatcher
      });
      expect(linter.filePathTest('foo')).toBe(true);
      expect(linter.filePathTest('foo.png')).toBe(true);
      expect(linter.filePathTest('wibble/foo.png')).toBe(true);
      expect(linter.filePathTest('foo/bar.png')).toBe(false);
    });

    it('path parsers can return multiple strings to test', function() {
      const linter = new Linter({
        pathParser: getFilePathParts,
        matcher: fooMatcher
      });
      expect(linter.filePathTest('foo/foo/foo.png')).toBe(true);
      expect(linter.filePathTest('foo/foo/bar.png')).toBe(false);
    });

    it('if no parser is passed it uses entire path', function() {
      const matcher = jasmine.createSpy('matcher');
      const linter = new Linter({
        matcher: matcher
      });
      linter.filePathTest('foo/bar.png');
      expect(matcher).toHaveBeenCalledWith('foo/bar.png');
    });
  });

  describe('#lint', function() {
    it('lints failing files and returns results object from file linting', function() {
      const linter = new Linter({
        pathParser: getFileName,
        matcher: fooMatcher
      });

      const result = linter.lint(['foo', 'foo', 'bar']);
      expect(result.ok).toBe(false);
      expect(result.passing[0]).toBe('foo');
      expect(result.passing[1]).toBe('foo');
      expect(result.failing).toContain('bar');
    });

    it('lints passing files and returns results object from file linting', function() {
      const linter = new Linter({
        pathParser: getFileName,
        matcher: fooMatcher
      });

      const result = linter.lint(['foo', 'foo', 'foo']);
      expect(result.ok).toBe(true);
      expect(result.passing[0]).toBe('foo');
      expect(result.passing[1]).toBe('foo');
      expect(result.passing[2]).toBe('foo');
      expect(result.failing.length).toBe(0);
    });
  });

});
