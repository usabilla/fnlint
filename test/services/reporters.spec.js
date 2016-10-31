'use strict';

/* eslint-disable no-console */
const _ = require('lodash');
const reporters = require('../../lib/services/reporters');
const LintPackage = require('../../lib/models/lint-package');

describe('reporters', () => {

  describe('consoleReporter', () => {
    const consoleReporter = reporters.consoleReporter;
    beforeEach(function() {
      spyOn(consoleReporter, 'log');
      this.mostRecentLog = function() {
        return _.get(consoleReporter.log.calls.mostRecent(), 'args.0');
      }
    });

    describe('main reporter function', () => {
      beforeEach(function() {
        this.reportA = LintPackage({src: 'a', files: ['b', 'c', 'd', 'e', 'f'], failing: ['b', 'c'], passing: ['d', 'e', 'f']});
        this.reportB = LintPackage({src: 'b', files: ['c', 'd', 'e'], failing: ['c'], passing: ['d', 'e']});
        this.reports = [this.reportA, this.reportB];
      });

      it('triggers group reporting for each lint group', function() {
        spyOn(consoleReporter, 'groupReporter');
        consoleReporter(this.reports);
        expect(consoleReporter.groupReporter.calls.count()).toBe(2);
        expect(consoleReporter.groupReporter.calls.argsFor(0)).toEqual([this.reportA]);
        expect(consoleReporter.groupReporter.calls.argsFor(1)).toEqual([this.reportB]);
      });

      it('it reports the number failing and passing files', function() {
        consoleReporter(this.reports);
        expect(this.mostRecentLog()).toContain('8 files');
        expect(this.mostRecentLog()).toContain('3 failing');
      });

    });

    describe('::groupReporter', () => {
      beforeEach(function() {
        this.groupResults = LintPackage({
          src: '*.js',
          matcherDescription: 'camel case',
          files: [],
          passing: [],
          failing: []
        });
      });

      describe('when there are failing tests', () => {
        beforeEach(function() {
          let files = ['bar-baz.js', 'baz-qux.js'];
          this.groupResults = this.groupResults.set('files', files);
          this.groupResults = this.groupResults.set('failing', files);
        });

        it('logs a header with failing tests for given test', function() {
          consoleReporter.groupReporter(this.groupResults);
          expect(this.mostRecentLog()).toContain('*.js');
          expect(this.mostRecentLog()).toContain('camel case');
          expect(this.mostRecentLog()).toContain('baz-qux.js');
          expect(this.mostRecentLog()).toContain('bar-baz.js');
        });
      });

      it('when there are no files for a lintPackage it reports a warning', function() {
        consoleReporter.groupReporter(this.groupResults);
        expect(this.mostRecentLog()).toContain('warning: *.js did not match any files');
      });

    });

  });

});
