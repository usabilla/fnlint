const _ = require('lodash');
const linter = require('../../lib/services/linter');
const matchers = require('../../lib/services/matchers');
const LintPackage = require('../../lib/models/lint-package.js');

describe('linter', () => {

  describe('::lint', () => {

    beforeEach(function() {
      this.testMatcherA = {
        name: 'a',
        description: 'begins with a',
        matcher: _.partialRight(_.startsWith, 'a')
      };
      matchers.addMatcher(this.testMatcherA.name, this.testMatcherA.description, this.testMatcherA.matcher);
      this.testMatcherB = {
        name: 'b',
        description: 'begins with b',
        matcher: _.partialRight(_.startsWith, 'b')
      };
      matchers.addMatcher(this.testMatcherB.name, this.testMatcherB.description, this.testMatcherB.matcher);
      this.passingFilesA = ['abc.js', 'abcd.js', 'abcde.js'];
      this.passingFilesB = ['bcd.js', 'bcde.js'];
      this.testLintPackageA = LintPackage({
        src: 'a/*.js',
        matcherName: this.testMatcherA.name,
        files: this.passingFilesA.concat(this.passingFilesB)
      });
      this.testLintPackageB = LintPackage({
        src: 'b/*.js',
          matcherName: this.testMatcherB.name,
          files: this.passingFilesA.concat(this.passingFilesB)
      });
    });

    afterEach(() => matchers.resetMatchers());

    it('returns a report on multiple file groups', function() {
      var report = linter.lint([
        this.testLintPackageA,
        this.testLintPackageB
      ]);

      let testReportA = report[0];
      expect(testReportA.src).toBe(this.testLintPackageA.src);
      expect(testReportA.files).toBe(this.testLintPackageA.files);
      expect(testReportA.matcherName).toBe(this.testLintPackageA.matcherName);
      expect(testReportA.matcherDescription).toBe(this.testMatcherA.description);
      expect(testReportA.passing.toJS()).toEqual(this.passingFilesA);
      expect(testReportA.failing.toJS()).toEqual(this.passingFilesB);

      let testReportB = report[1];
      expect(testReportB.src).toBe(this.testLintPackageB.src);
      expect(testReportB.files).toBe(this.testLintPackageB.files);
      expect(testReportB.matcherName).toBe(this.testLintPackageB.matcherName);
      expect(testReportB.matcherDescription).toBe(this.testMatcherB.description);
      expect(testReportB.passing.toJS()).toEqual(this.passingFilesB);
      expect(testReportB.failing.toJS()).toEqual(this.passingFilesA);

    });
  });

});
