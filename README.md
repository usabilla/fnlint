# file-name-linter [![CircleCI branch](https://img.shields.io/circleci/project/github/usabilla/file-name-linter/master.svg?style=flat-square)](https://circleci.com/gh/usabilla/file-name-linter/tree/master) [![Coveralls branch](https://img.shields.io/coveralls/usabilla/file-name-linter/master.svg?style=flat-square)](https://coveralls.io/github/usabilla/file-name-linter?branch=master)
Lint file name formatting.

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
