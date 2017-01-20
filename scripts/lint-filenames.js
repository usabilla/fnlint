#!/usr/bin/env node
'use strict';

const assert = require('assert');
const fnlint = require('../index');
const path = require('path');

fnlint({basePath: path.join(__dirname, '../lib'), files: '**/*', format: 'kebabcase'}, (err, results) => {
  assert.ifError(err);
  if (!results.ok) {
    process.exit(1);
  }
});
