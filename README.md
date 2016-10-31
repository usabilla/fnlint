# file-name-linter
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
fnlint('src/**/*.unit.js', /custom regex/);
fnlint('src/**/*.unit.js', (string) => {
  /* custom matcher */
});
```

## TODO
- [ ] Custom reporters
- [ ] Single lint package call signature e.g. `fnlint('src/**/*.js', 'pascalcase');`
- [ ] Case insensitive matcher name
