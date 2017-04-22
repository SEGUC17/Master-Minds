# angular-assert-q-constructor [![Build Status](https://travis-ci.org/bendrucker/angular-assert-q-constructor.svg?branch=master)](https://travis-ci.org/bendrucker/angular-assert-q-constructor)
Make sure $q is a constructor (1.3+). Throw if it isn't.

## Installing

```sh
$ npm install angular-assert-q-constructor
```

## Usage

```js
angular
  .module('myApp', [])
  .run(function (assertQConstructor) {
    assertQConstructor()
  })
```

## API

#### `assertQConstructor(message)` -> `undefined`

If `$q` is a function, this is a noop. Otherwise (i.e. Angular <1.3) it will throw the `message`.

##### message

Type: `string`  
Default: `'$q is not a function'`
