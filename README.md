# fnlint
Lint file name formatting.

[![CircleCI branch](https://img.shields.io/circleci/project/github/usabilla/fnlint/master.svg?style=flat-square)](https://circleci.com/gh/usabilla/fnlint/tree/master) [![Coveralls branch](https://img.shields.io/coveralls/usabilla/fnlint/master.svg?style=flat-square)](https://coveralls.io/github/usabilla/fnlint?branch=master) [![npm](https://img.shields.io/npm/v/fnlint.svg?style=flat-square)](https://www.npmjs.com/package/fnlint)

## Installation

With npm:

```
npm i fnlint --save
```

With yarn:

```
yarn add fnlint 
```

## Usage

### Command Line

Create a config file (an object exporting `.js` file or `.json`) with your fnlint configuration. See Options below. Then call `fnlint` referencing the config file:

```bash
fnlint --config fnlint.json
```

### Module

#### `fnlint(options: {}, callback: Function(error: Error, results: {})) => Void`
- run linter on given options
- callback is called once linting completes

#### `fnlint.sync(options: {}) => results: {}`
- synchronous version

#### `fnlint.promise(options: {}) => Promise(results: {})`
- promise version

#### Results

- **`ok`** Boolean pass value. `true` if all files pass. 
- **`passing`** Array of passing file paths. 
- **`failing`** Array of failing file paths.

#### Example

```js
fnlint({
  basePath: './lib',
  files: '**/*.js',
  format: 'kebabcase'
}, (err, results) => {
  assert.ifError(err);
  if (!results.ok) {
    process.exit(1);
  }
});
````

### Options

- **`basePath`** Base path for files to lint.
- **`files`** Glob string for files to lint relative to base path.
- **`format`** File name format.
- **`reporter`** (optional) Set to false to turn off console reporter.
- **`directories`** (optional) Set to true to lint full path including directories.

#### Available Formats
* `kebabcase`
* `camelcase`
* `pascalcase`

## Contributing

Don't be shy! Submit issues (or better yet PRs) if you see anything that could be better. If you're submitting code that contains patches or features please try to include unit tests. Thanks!

### Commit Messages
Please use the [angular changelog convention](https://github.com/conventional-changelog/conventional-changelog-angular/blob/master/convention.md) for your commit messages.

## License

MIT : http://opensource.org/licenses/MIT

## TODO
- [ ] Custom file path parsers
- [ ] Custom matchers
- [x] CLI
