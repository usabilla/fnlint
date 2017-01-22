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

### API

#### `fnlint(options: {}, callback: Function(error: Error, results: {})) => Void`
- run linter on given options
- callback is called once linting completes

#### `fnlint.sync(options: {}) => results: {}`
- synchronous version

#### `fnlint.promise(options: {}) => Promise(results: {})`
- promise version

### Options

- **`basePath`** Base path for files to lint.
- **`files`** Glob string for files to lint relative to base path.
- **`format`** File name format.
- **`reporter`** (optional) Set to false to turn off console reporter.
- **`directories`** (optional) Set to true to lint full path including directories.

### Results

- **`ok`** Boolean pass value. `true` if all files pass. 
- **`passing`** Array of passing file paths. 
- **`failing`** Array of failing file paths.

### Examples

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


## TODO
- [ ] Custom matchers
- [ ] CLI
