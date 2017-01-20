'use strict';

const matchers = require('../lib/matchers');

describe('matchers', function() {

  describe('makeRegexStringTest', function() {
    it('wraps regex in a function', function() {
      var wrapped = matchers.makeRegexStringTest(/foo/);
      expect(wrapped('foo')).toBe(true);
      expect(wrapped('bar')).toBe(false);
    });
    it('it returns false non strings are coerced into a string', function() {
      expect(matchers.makeRegexStringTest(/null/)(null)).toBe(false);
      expect(matchers.makeRegexStringTest(/undefined/)(undefined)).toBe(false);
    });
  });

  describe('pascalcase', function() {
    it('matches file names correctly', function() {
      expect(matchers.pascalcase('PasCalCaseExample')).toBe(true);
      expect(matchers.pascalcase('Pascalcase')).toBe(true);
      expect(matchers.pascalcase('NPSCampaignCell')).toBe(true);
      expect(matchers.pascalcase('FooNPSCampaignCell')).toBe(true);
      expect(matchers.pascalcase('camelCaseExample')).toBe(false);
      expect(matchers.pascalcase('kabab-case-example')).toBe(false);
      expect(matchers.pascalcase('Foo-barBaz_')).toBe(false);
    });
    it('is false for non-string values', function() {
      expect(matchers.pascalcase(null)).toBe(false);
    });
  });

  describe('camelcase', function() {
    it('matches file names correctly', function() {
      expect(matchers.camelcase('camelCaseExample')).toBe(true);
      expect(matchers.camelcase('foobar')).toBe(true);
      expect(matchers.camelcase('PasCalCaseExample')).toBe(false);
      expect(matchers.camelcase('kabab-case-example')).toBe(false);
      expect(matchers.camelcase('_fooBarBaz')).toBe(false);
    });
    it('is false for non-string values', function() {
      expect(matchers.camelcase(null)).toBe(false);
    });
  });

  describe('kebabcase', function() {
    it('matches file names correctly', function() {
      expect(matchers.kebabcase('kabab-case-example')).toBe(true);
      expect(matchers.kebabcase('foobarbaz')).toBe(true);
      expect(matchers.kebabcase('PasCalCaseExample')).toBe(false);
      expect(matchers.kebabcase('camelCaseExample')).toBe(false);
      expect(matchers.kebabcase('Foo-bar-Baz')).toBe(false);
      expect(matchers.kebabcase('foO_bar-Baz')).toBe(false);
      expect(matchers.kebabcase('_does-not-match')).toBe(false);
      expect(matchers.kebabcase('does-not-match_')).toBe(false);
      expect(matchers.kebabcase('i-does-match')).toBe(true);
    });
    it('is false for non-string values', function() {
      expect(matchers.kebabcase(null)).toBe(false);
    });
  });

});
