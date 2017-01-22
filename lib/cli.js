#!/usr/bin/env node
'use strict';

const program = require('commander');
const fnlint = require('./module');
const assert = require('assert');
const path = require('path');

program
  .option('-c --config [configPath]', 'Path to a config file')
  .parse(process.argv);

const config = require(path.resolve(program.config));

fnlint(config, function(err, results) {
  assert.ifError(err);
  if (!results.ok) {
    process.exit(1);
  }
});
