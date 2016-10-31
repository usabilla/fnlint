'use strict';

const _ = require('lodash');
require('colors');

function consoleReporter(reports) {
  _.map(reports, _.unary(consoleReporter.groupReporter));
  let failCount = _.flatten(_.map(reports, 'failing')).length;
  let fileCount = _.flatten(_.map(reports, 'files')).length;
  let reportMessage = `\nfnlint: ${fileCount} files, ${failCount} failing.`;
  consoleReporter.log(reportMessage[failCount ? 'red' : 'green']);
}

consoleReporter.groupReporter = function groupReporter(report) {
  if (_.get(report, 'files.length', 0) === 0) {
    consoleReporter.log(`fnlint warning: ${report.src} did not match any files`.yellow);
  }
  if (_.get(report, 'failing.length', 0) === 0) {
    return;
  }
  let header = `\n${report.src}: ${report.matcherDescription}`.underline;
  let failingFiles = _.map(report.failing, 'cyan');
  consoleReporter.log(_.concat(header, failingFiles).join('\n'));
};

consoleReporter.log = function log(message) {
  console.log(message); //eslint-disable-line no-console
};


module.exports = {
  consoleReporter
};
