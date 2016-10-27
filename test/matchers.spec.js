const Matchers = require('../src/matchers');

describe('Matchers', () => {

    it('isPascalCase', () => {
      expect(Matchers.isPascalCase('PasCalCaseExample')).toBe(true);
      expect(Matchers.isPascalCase('Pascalcase')).toBe(true);
      expect(Matchers.isPascalCase('NPSCampaignCell')).toBe(true);
      expect(Matchers.isPascalCase('FooNPSCampaignCell')).toBe(true);
      expect(Matchers.isPascalCase('camelCaseExample')).toBe(false);
      expect(Matchers.isPascalCase('kabab-case-example')).toBe(false);
      expect(Matchers.isPascalCase('Foo-barBaz_')).toBe(false);
    });

    it('isCamelCase', () => {
      expect(Matchers.isCamelCase('camelCaseExample')).toBe(true);
      expect(Matchers.isCamelCase('foobar')).toBe(true);
      expect(Matchers.isCamelCase('PasCalCaseExample')).toBe(false);
      expect(Matchers.isCamelCase('kabab-case-example')).toBe(false);
      expect(Matchers.isCamelCase('_fooBarBaz')).toBe(false);
    });

    it('isKebabCase', () => {
      expect(Matchers.isKebabCase('kabab-case-example')).toBe(true);
      expect(Matchers.isKebabCase('foobarbaz')).toBe(true);
      expect(Matchers.isKebabCase('PasCalCaseExample')).toBe(false);
      expect(Matchers.isKebabCase('camelCaseExample')).toBe(false);
      expect(Matchers.isKebabCase('Foo-bar-Baz')).toBe(false);
      expect(Matchers.isKebabCase('foO_bar-Baz')).toBe(false);
      expect(Matchers.isKebabCase('_does-not-match')).toBe(false);
      expect(Matchers.isKebabCase('does-not-match_')).toBe(false);
      expect(Matchers.isKebabCase('i-does-match')).toBe(true);
    });

    it('isPrivateKebabCase', () => {
      expect(Matchers.isPrivateKebabCase('_this-matches')).toBe(true);
      expect(Matchers.isPrivateKebabCase('this-does-not-match')).toBe(false);
    });

    it('getFileName', () => {
      expect(Matchers.getFileName('src/projects/ubWeb/feedback/components/summary-pane/SummaryPane.ts')).toBe('SummaryPane');
      expect(Matchers.getFileName('src/projects/ubWeb/feedback/components/summary-pane/test/SummaryPane.unit.spec.ts')).toBe('SummaryPane');
    });

    it('getFileExtension', () => {
      expect(Matchers.getFileExtension('foo/bar/WibbleWobble.ts')).toBe('ts');
      expect(Matchers.getFileExtension('foo/bar/WibbleWobble.unit.spec.ts')).toBe('unit.spec.ts');
    });

});
