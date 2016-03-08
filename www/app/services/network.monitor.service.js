(function() {
    'use strict';

    angular
        .module('app.services')
        .service('NetworkMonitor', NetworkMonitor);

    NetworkMonitor.$inject = ['$rootScope'];

    /* @ngInject */
    function NetworkMonitor($rootScope) {

        var service = {
            start: startWatch,
            stop: stopWatch
        };
        return service;

        function startWatch() {
          console.log('Network monitor initiated')
          if(ionic.Platform.isWebView()){
            $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
              console.log("went online");
            });
            $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
              console.log("went offline");
            });
          }
          else {
            window.addEventListener("online", function(e) {
              console.log("went online");
            }, false);
            window.addEventListener("offline", function(e) {
              console.log("went offline");
            }, false);
          }
        }
        function stopWatch() {
          
        }
    }
})();
