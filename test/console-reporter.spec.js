'use strict';

const consoleReporter = require('../lib/console-reporter');

describe('consoleReporter', function() {
  beforeEach(function() {
    spyOn(console, 'log');
    spyOn(console, 'error');
    this.report = consoleReporter('foomatcher');
  });

  it('reports success message when results are a pass', function() {
    this.report({
      ok: true,
      passing: ['foo', 'bar'],
      failing: []
    });
    const log = console.log.calls.mostRecent().args[0];
    expect(log).toContain('fnlint foomatcher pass');
  });

  it('reports failure message when results fail', function() {
    this.report({
      ok: false,
      passing: [],
      failing: ['foo', 'bar']
    });
    const error = console.error.calls.allArgs()[0][0];
    expect(error).toContain('failed linting');
  });
});
