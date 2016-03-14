(function() {
    'use strict';

    angular
        .module('app.services')
        .service('NetworkMonitor', NetworkMonitor);

    NetworkMonitor.$inject = ['$rootScope', '$cordovaToast'];

    /* @ngInject */
    function NetworkMonitor($rootScope, $cordovaToast) {

        var service = {
            start: startWatch,
            stop: stopWatch,
            isOnline: isOnline
        };
        var status;

        return service;

        function startWatch() {
          console.log('Network monitor initiated')
          if (ionic.Platform.isWebView()){
            $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
              console.log("went online");
              $rootScope.offline = false;
              status = false;
              $cordovaToast.showLongBottom($rootScope.messages.online);
            });
            $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
              console.log("went offline");
              $rootScope.offline = true;
              status = true;
              $cordovaToast.showLongBottom($rootScope.messages.offline);
            });
          } else {
            window.addEventListener("online", function(e) {
              console.log("went online");
              $rootScope.offline = false;
              status = false;
              $cordovaToast.showLongBottom($rootScope.messages.online);
            }, false);
            window.addEventListener("offline", function(e) {
              console.log("went offline");
              $rootScope.offline = true;
              status = true;
              $cordovaToast.showLongBottom($rootScope.messages.offline);
            }, false);
          }
        }
        function stopWatch() {
        }
        function isOnline() {
            return status
        }
    }
})();
