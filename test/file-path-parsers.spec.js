'use strict';

const filePathParsers = require('../lib/file-path-parsers');

describe('file-path-parsers', function() {

  describe('fullPathParser', function() {
    it('trims relative path segments', function() {
      const parsed = filePathParsers.fullPathParser('./../foo/bar.png');
      expect(parsed).toContain('foo');
      expect(parsed).toContain('bar');
      expect(parsed).not.toContain('.');
      expect(parsed).not.toContain('..');
    });

    it('normalizes paths', function() {
      const parsed = filePathParsers.fullPathParser('../foo/../bar/baz.png');
      expect(parsed).toContain('bar');
      expect(parsed).toContain('baz');
      expect(parsed).not.toContain('foo');
      expect(parsed).not.toContain('.');
      expect(parsed).not.toContain('..');
    });
  });

});
