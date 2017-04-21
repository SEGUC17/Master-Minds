'use strict'

var angular = require('angular')

module.exports = angular.module('assert-q-constructor', [])
  .factory('assertQConstructor', main)
  .name

main.$inject = ['$q']
function main ($q) {
  return function assertQConstructor (message) {
    if (typeof $q !== 'function') {
      throw new Error(message || '$q is not a function')
    }
  }
}
