const _ = require('lodash');
const matchers = require('../lib/matchers');

describe('matchers', () => {
  afterEach(() => matchers.resetMatchers());

  describe('::addMatcher', () => {
    describe('argument validation', () => {
      it('throws if name is not a string', function() {
        expect(() => matchers.addMatcher(1, 'foo', _.noop)).toThrowError(/invalid call signature/);
        expect(() => matchers.addMatcher('bar', 'foo', _.noop)).not.toThrowError(/invalid call signature/);
      });
      it('throws if description is not a string', function() {
        expect(() => matchers.addMatcher('foo', null, _.noop)).toThrowError(/invalid call signature/);
        expect(() => matchers.addMatcher('bar', 'foo', _.noop)).not.toThrowError(/invalid call signature/);
      });
      it('throws if matcher is not a function or regex', function() {
        expect(() => matchers.addMatcher('foo', 'bar', null)).toThrowError(/invalid call signature/);
        expect(() => matchers.addMatcher('bar', 'foo', _.noop)).not.toThrowError(/invalid call signature/);
        expect(() => matchers.addMatcher('bar', 'foo', /foo/)).not.toThrowError(/invalid call signature/);
      });
    });

    it('it adds the given matcher to available matchers', () => {
      let name = 'foo';
      let description = 'foo';
      let tester = () => {};
      matchers.addMatcher(name, description, tester);
      let matcher = matchers.getMatcher(name);
      expect(matcher).toBe(tester);
      expect(matchers.getDescription(matcher)).toBe(description);
    });

    it('wraps regex matchers in a function', function() {
      matchers.addMatcher('foo', 'foo', /foo/);
      expect(matchers.getMatcher('foo')('foo')).toBe(true);
      expect(matchers.getMatcher('foo')('bar')).toBe(false);
    });

    it('matcher names must be unique', function() {
      matchers.addMatcher('foo', 'foo', _.noop);
      expect(() => matchers.addMatcher('foo', 'foo', _.noop)).toThrowError(/already exists/);
    });
  });

  describe('getMatcher', () => {
    it('returns matcher with given name', function() {
      let fooMatcher = () => {};
      let barMatcher = () => {};
      matchers.addMatcher('foo', 'bar', fooMatcher);
      matchers.addMatcher('barbaz', 'bar', barMatcher);
      expect(matchers.getMatcher('foo')).toBe(fooMatcher);
      expect(matchers.getMatcher('barbaz')).toBe(barMatcher);
    });
    it('throws if matcher is not available', function() {
      expect(() => matchers.getMatcher('wibble')).toThrowError(/unknown matcher "wibble"/i);
    });
  });

  describe('getMatcherDescription', () => {
    it('returns the given matchers description', function() {
      let desc = matchers.getDescription(matchers.getMatcher('camelcase'));
      expect(desc).toBe('camel case');
    });
  });

  describe('resetMatchers', () => {
    it('resets matchers to defaults', function() {
      matchers.addMatcher('foo', 'foo', _.noop);
      matchers.resetMatchers();
      expect(() => matchers.getMatcher('foo')).toThrowError(/unknown matcher/i);
    });
  });

  describe('makeFileNameMatcher', () => {
    it('returns a function that invokes matcher with file/folder name only', function() {
      let matcher = _.identity;
      let wrappedMatcher = matchers.makeFileNameMatcher(matcher);
      expect(wrappedMatcher('foo/bar/baz')).toBe('baz');
      expect(wrappedMatcher('foo/bar/baz.js')).toBe('baz');
      expect(wrappedMatcher('foo/bar/baz.unit.spec.js')).toBe('baz');
      expect(wrappedMatcher('foobar')).toBe('foobar');
    });
  });

  it('default matchers are installed', () => {
    expect(typeof matchers.getMatcher('camelcase')).toBe('function');
    expect(typeof matchers.getMatcher('pascalcase')).toBe('function');
    expect(typeof matchers.getMatcher('kebabcase')).toBe('function');
    expect(typeof matchers.getMatcher('privatekebabcase')).toBe('function');
  });
});
