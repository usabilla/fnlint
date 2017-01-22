#!/usr/bin/env node
'use strict';

const assert = require('assert');
const fnlint = require('../index');
const path = require('path');

const config = {
  basePath: path.join(__dirname, '../lib'),
  files: '**/*',
  format: 'kebabcase',
  directories: true
};

fnlint(config, (err, results) => {
  assert.ifError(err);
  if (!results.ok) {
    process.exit(1);
  }
});
