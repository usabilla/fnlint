#!/usr/bin/env node
/* eslint no-console: 0 */
'use strict';

const program = require('commander');
const fnlint = require('./module');
const assert = require('assert');
const path = require('path');
require('colors');

program
  .version(require('../package.json').version)
  .option('-c --config [configPath]', 'Path to a config file')
  .parse(process.argv);

if (!program.config) {
  console.log('  --config is required.'.red);
  program.outputHelp();
  process.exit();
}

let config;

try {
  config = require(path.resolve(program.config));
} catch (e) {
  console.error(e.message.red);
  process.exit(1);
}

fnlint(config, function(err, results) {
  assert.ifError(err);
  if (!results.ok) {
    process.exit(1);
  }
});
