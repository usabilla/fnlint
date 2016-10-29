const util = require('../lib/util');

describe('util', () => {

  describe('getFileName', () => {
    it('gets file name from filePath', function() {
      expect(util.getFileName('foo/bar/baz-qux.js')).toBe('baz-qux');
      expect(util.getFileName('foo/bar/baz-qux.js')).toBe('baz-qux');
    });
    it('gets file name from multi-period extensions', function() {
      expect(util.getFileName('foo/bar/baz-qux.unit.spec.js')).toBe('baz-qux');
    });
    it('gets file name for extenstionless files', function() {
      expect(util.getFileName('foo/bar/baz-qux')).toBe('baz-qux');
    });
    it('gets file name for folderless files', function() {
      expect(util.getFileName('baz-qux.js')).toBe('baz-qux');
    });
    it('gets file name for folderless and extentionless files', function() {
      expect(util.getFileName('baz-qux')).toBe('baz-qux');
    });
    it('returns an empty string for non-string values', function() {
      expect(util.getFileName(null)).toBe('');
    });
  });

  describe('getFileExtension', () => {
    it('gets the file extension', function() {
      expect(util.getFileExtension('foo/bar/WibbleWobble.ts')).toBe('ts');
      expect(util.getFileExtension('foo/bar/WibbleWobble.unit.spec.ts')).toBe('unit.spec.ts');
    });
    it('returns empty string when there is no extension', function() {
      expect(util.getFileExtension('foo/bar/WibbleWobble')).toBe('');
    });
    it('returns an empty string for non-string values', function() {
      expect(util.getFileExtension(null)).toBe('');
    });
  });

  describe('makeRegexStringTest', () => {
    it('wraps regex in a function', function() {
      var wrapped = util.makeRegexStringTest(/foo/);
      expect(wrapped('foo')).toBe(true);
      expect(wrapped('bar')).toBe(false);
    });
    it('it returns false non strings are coerced into a string', function() {
      expect(util.makeRegexStringTest(/null/)(null)).toBe(false);
      expect(util.makeRegexStringTest(/undefined/)(undefined)).toBe(false);
    });
  });

  describe('isPascalCase', () => {
    it('matches file names correctly', function() {
      expect(util.isPascalCase('PasCalCaseExample')).toBe(true);
      expect(util.isPascalCase('Pascalcase')).toBe(true);
      expect(util.isPascalCase('NPSCampaignCell')).toBe(true);
      expect(util.isPascalCase('FooNPSCampaignCell')).toBe(true);
      expect(util.isPascalCase('camelCaseExample')).toBe(false);
      expect(util.isPascalCase('kabab-case-example')).toBe(false);
      expect(util.isPascalCase('Foo-barBaz_')).toBe(false);
    });
    it('is false for non-string values', function() {
      expect(util.isPascalCase(null)).toBe(false);
    });
  });

  describe('isCamelCase', () => {
    it('matches file names correctly', function() {
      expect(util.isCamelCase('camelCaseExample')).toBe(true);
      expect(util.isCamelCase('foobar')).toBe(true);
      expect(util.isCamelCase('PasCalCaseExample')).toBe(false);
      expect(util.isCamelCase('kabab-case-example')).toBe(false);
      expect(util.isCamelCase('_fooBarBaz')).toBe(false);
    });
    it('is false for non-string values', function() {
      expect(util.isCamelCase(null)).toBe(false);
    });
  });

  describe('isKebabCase', () => {
    it('matches file names correctly', function() {
      expect(util.isKebabCase('kabab-case-example')).toBe(true);
      expect(util.isKebabCase('foobarbaz')).toBe(true);
      expect(util.isKebabCase('PasCalCaseExample')).toBe(false);
      expect(util.isKebabCase('camelCaseExample')).toBe(false);
      expect(util.isKebabCase('Foo-bar-Baz')).toBe(false);
      expect(util.isKebabCase('foO_bar-Baz')).toBe(false);
      expect(util.isKebabCase('_does-not-match')).toBe(false);
      expect(util.isKebabCase('does-not-match_')).toBe(false);
      expect(util.isKebabCase('i-does-match')).toBe(true);
    });
    it('is false for non-string values', function() {
      expect(util.isKebabCase(null)).toBe(false);
    });
  });

  describe('isPrivateKebabCase', () => {
    it('matches file names correctly', function() {
      expect(util.isPrivateKebabCase('_this-matches')).toBe(true);
      expect(util.isPrivateKebabCase('this-does-not-match')).toBe(false);
    });
    it('is false for non-string values', function() {
      expect(util.isPrivateKebabCase(null)).toBe(false);
    });
  });

});
