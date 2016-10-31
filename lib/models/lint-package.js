'use strict';

const Immutable = require('immutable');

const LintPackage = Immutable.Record({
  src: '',
  files: [],
  matcherName: '',
  matcherDescription: '',
  matcher: null,
  passing: [],
  failing: []
}, 'LintPackage');

module.exports = LintPackage;
