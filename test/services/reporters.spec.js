/* eslint-disable no-console */
const _ = require('lodash');
const reporters = require('../../lib/services/reporters');

describe('reporters', () => {

  describe('consoleReporter', () => {
    const consoleReporter = reporters.consoleReporter;
    beforeEach(function() {
      spyOn(console, 'log');
      this.mostRecentLog = function() {
        return _.get(console.log.calls.mostRecent(), 'args.0');
      }
    });

    describe('main reporter function', () => {
      beforeEach(function() {
        this.reportA = {src: 'a', failing: ['b','c']};
        this.reportB = {src: 'b', failing: ['c']};
        this.reports = [this.reportA, this.reportB];
      });

      it('triggers group reporting for each lint group', function() {
        spyOn(consoleReporter, 'groupReporter');
        consoleReporter(this.reports);
        expect(consoleReporter.groupReporter.calls.count()).toBe(2);
        expect(consoleReporter.groupReporter.calls.argsFor(0)).toEqual([this.reportA]);
        expect(consoleReporter.groupReporter.calls.argsFor(1)).toEqual([this.reportB]);
      });

      it('it reports the total number of failing files', function() {
        consoleReporter(this.reports);
        expect(this.mostRecentLog()).toContain('3 failing files');
      });
    });

    describe('::groupReporter', () => {
      beforeEach(function() {
        this.groupResults = {
          src: '*.js',
          matcherDescription: 'camel case',
          passing: [],
          failing: []
        };
      });

      describe('when there are failing tests', () => {
        beforeEach(function() {
          this.groupResults.failing = [
            'bar-baz.js',
            'baz-qux.js'
          ];
        });

        it('returns the number of failing files', function() {
          expect(consoleReporter.groupReporter(this.groupResults)).toBe(2);
        });

        it('logs a header with failing tests for given test', function() {
          consoleReporter.groupReporter(this.groupResults);
          expect(this.mostRecentLog()).toContain('*.js');
          expect(this.mostRecentLog()).toContain('camel case');
          expect(this.mostRecentLog()).toContain('baz-qux.js');
          expect(this.mostRecentLog()).toContain('bar-baz.js');
        });
      });

      describe('when no tests are failing', () => {
        it('reports nothing', function() {
          consoleReporter.groupReporter(this.groupResults);
          expect(console.log).not.toHaveBeenCalled();
        });

        it('returns 0', function() {
          expect(consoleReporter.groupReporter(this.groupResults)).toBe(0);
        });
      });

    });

  });

});
