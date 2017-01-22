'use strict';

const _ = require('lodash');
const Result = require('./result-model');

class Linter {
  constructor(options) {
    options = options || {};
    this.matcher = options.matcher;
    this.pathParser = options.pathParser || _.identity;

    _.bindAll(this, ['filePathTest', 'lint']);
  }

  lint(filePaths) {
    const results = _.groupBy(filePaths, _.flow(this.filePathTest, Result.getResultKey));
    return new Result(results);
  }

  filePathTest(filePath) {
    const segments = _.compact([].concat(this.pathParser(filePath)));
    return assertAllSegmentsPassing(segments, this.matcher);
  }

}

function assertAllSegmentsPassing(segments, matcher) {
  return !_.find(segments, _.negate(_.unary(matcher)));
}


module.exports = Linter;
