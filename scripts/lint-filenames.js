#!/usr/bin/env node
'use strict';

const _ = require('lodash');
const fnlint = require('../lib/fnlint');


fnlint({
  '{lib,test}/!(test-files)/**/*': 'kebabcase'
}, (err, results) => {
  if (_.flatten(_.map(results, 'failing')).length > 0) {
    process.exit(1);
  }
});
