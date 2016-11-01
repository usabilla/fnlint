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

### Examples

```js
fnlint({
  'src/**/*.js': 'camelcase',
  'src/**/*.scss': 'kebabcase'
});
````

#### Custom matchers
```js
fnlint({
  'src/**/*.unit.js', /custom regex/,
  'src/**/*.js', (filePath) => { /* custom matching */ }
});
```

## TODO
- [ ] Custom reporters
- [ ] Command line interface
- [ ] Single lint package call signature e.g. `fnlint('src/**/*.js', 'pascalcase');`
- [ ] Case insensitive matcher name
