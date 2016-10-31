#!/bin/bash
set -ex

coverage_dir=${CIRCLE_TEST_REPORTS-_test-results}/coverage

istanbul cover jasmine JASMINE_CONFIG_PATH=jasmine.json --dir $coverage_dir
eslint .
./scripts/lint-filenames.js

if [ ! -z $CI ]; then
  cat $coverage_dir/lcov.info | ./node_modules/coveralls/bin/coveralls.js
fi
