const fnlint = require('./lib/fnlint');


fnlint({
  'lib/**/*.js': 'pascalcase',
  'test/**/*.js': 'pascalcase'
});
