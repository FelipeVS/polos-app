'use strict';

angular
  .module('app.directives')
  .directive('httpPrefix', httpPrefix);

function httpPrefix() {
  var directive = {
    restrict: 'A',
    require: 'ngModel',
    link: linkFunc
  };

  return directive;

  function linkFunc(scope, element, attrs, controller) {
      function ensureHttpPrefix(value) {
          // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
          if(value && !/^(https?):\/\//i.test(value)
             && 'http://'.indexOf(value) !== 0 && 'https://'.indexOf(value) !== 0 ) {
              controller.$setViewValue('http://' + value);
              controller.$render();
              return 'http://' + value;
          }
          else
              return value;
      }
      controller.$formatters.push(ensureHttpPrefix);
      controller.$parsers.splice(0, 0, ensureHttpPrefix);
  }
}
