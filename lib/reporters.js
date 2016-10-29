const _ = require('lodash');
require('colors');

function consoleReporter(reports) {
  let counts = _.map(reports, _.unary(consoleReporter.groupReporter));
  let failCount = _.reduce(counts, _.add, 0);
  if (failCount === 0) {
    return;
  }
  console.log(`\n${failCount} failing files.`.red);
}

consoleReporter.groupReporter = function groupReporter(report) {
  if (_.get(report, 'failing.length', 0) === 0) {
    return 0;
  }
  let header = `\n${report.src}: ${report.matcherDescription}`.underline;
  let files = _.map(report.failing, 'cyan');
  console.log(_.concat(header, files).join('\n'));
  return files.length;
};

module.exports = {
  consoleReporter
};
