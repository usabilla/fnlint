'use strict';

const Result = require('../lib/result-model');

describe('Result', function() {
  describe('ok', function() {
    it('returns true when there are no failing items', function() {
      const result = new Result({ failing: [] });
      expect(result.ok).toBe(true);
    });

    it('returns false when there are failing items', function() {
      const result = new Result({ failing: ['foo'] });
      expect(result.ok).toBe(false);
    });
  });
});
