const optionsParser = require('../../lib/util/optionsParser');

describe('optionsParser', () => {

  describe('passing an object of src/matcher pairs', () => {

    let options = {
      'foo/*.js': 'foo',
      'bar/*.js': 'bar',
    };

    it('parses pairs into LintPackages', function() {
      var parsedOptions = optionsParser(options);
      expect(parsedOptions.lintPackages[0].src).toBe('foo/*.js');
      expect(parsedOptions.lintPackages[0].matcherName).toBe('foo');
      expect(parsedOptions.lintPackages[1].src).toBe('bar/*.js');
      expect(parsedOptions.lintPackages[1].matcherName).toBe('bar');
    });
  });

});
