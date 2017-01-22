#!/bin/bash
set -ex

node_version=$(node -e "console.log(require('./package.json').engines.node.replace('>=', ''))")

coverage_dir=${CIRCLE_TEST_REPORTS-_test-results}/coverage

/opt/circleci/nodejs/v$node_version/bin/node node_modules/.bin/istanbul cover node_modules/.bin/jasmine JASMINE_CONFIG_PATH=jasmine.json --dir $coverage_dir

# publish coverage to coveralls if in $CI environment
if [ ! -z $CI ]; then
  cat $coverage_dir/lcov.info | ./node_modules/coveralls/bin/coveralls.js
fi
