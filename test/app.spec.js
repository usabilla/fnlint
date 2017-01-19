const App = require('../lib/app');

describe('App', function() {
  beforeEach(function() {
    this.app = new App();
  });

  describe('#foo', function() {
    it('returns foo', function() {
      expect(this.app.foo()).toBe('foo');
    });
  });

});
