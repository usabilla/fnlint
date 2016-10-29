# file-name-linter
Lint file name formatting

## Usage (NOT ALL IMPLEMENTED)

```js
const fnlint = require('fnlint');

fnlint('src/**/*.js', 'pascalcase');
fnlint('src/**/*.ts', 'camelcase');
fnlint('src/**/*.scss', 'kebabcase');
fnlint('src/**/*.html', 'snakecase');
```

### Custom matchers
```js
fnlint('src/**/*.unit.js', /custom regex/);
fnlint('src/**/*.unit.js', (string) => {
  /* custom matcher */
});
fnlint.addMatcher('matcher name 1', (string) => {
  /* custom matcher */
});
fnlint.addMatcher('matcher name 2', /custom regex/);
fnlint('src/**/*.foo.bar', 'matcher name 1');
fnlint('src/**/*.baz.qux', 'matcher name 2');
```

### Bulk linting
```js
fnlint({
  'src/**/*.js': 'camelcase',
  'src/**/*.scss': 'kebabcase'
}, {
  reporter: false
});
```

### Custom reporters
```js
fnlint.useReporter((results) => {
  /* custom reporting here */
  return 'foo bar';
});
fnlint('src/**/*.js', 'camelCase');
// => 'foo bar'

fnlint.useReporter(fnlint.reporters.console)
```
