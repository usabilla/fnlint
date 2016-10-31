const Immutable = require('immutable');

const LintPackage = Immutable.Record({
  src: '',
  files: new Immutable.List(),
  matcherName: '',
  matcherDescription: '',
  matcher: null,
  passing: new Immutable.List(),
  failing: new Immutable.List()
}, 'LintPackage');

module.exports = LintPackage;
