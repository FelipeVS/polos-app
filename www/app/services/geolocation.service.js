(function() {
    'use strict';

    angular
        .module('app.services')
        .service('GeolocationService', geolocationService);

    geolocationService.$inject = ['$rootScope', '$timeout', 'ToastFactory'];

    /* @ngInject */
    function geolocationService($rootScope, $timeout, ToastFactory) {

        var service = {
            start: startWatch,
            stop: stopWatch,
            get: get
        };
        var watchID;

        return service;

        function startWatch() {
        //   console.log('Geolocation monitor initiated')
          if (ionic.Platform.isWebView()){}
          $rootScope.gettingPosition = true;
          watchID = navigator.geolocation.watchPosition(successGeolocation, geolocationError, { maximumAge: 300000, timeout: 10000, enableHighAccuracy: true });
        }
        function stopWatch() {
            navigator.geolocation.clearWatch(watchID)
        }
        function get() {
            // console.log('Getting position');
            navigator.geolocation.getCurrentPosition(successGeolocation, geolocationError, { maximumAge: 300000, timeout: 10000, enableHighAccuracy: true });
        }

        function successGeolocation(position) {
            // console.log('User location found:', position);
            $rootScope.$broadcast('location-found');
            $rootScope.latitude = position.coords.latitude;
            $rootScope.longitude = position.coords.longitude;
            $rootScope.gettingPosition = false;
            // ToastFactory.show('Position Found', 'short', 'bottom');
        }
        function geolocationError(error) {
            console.log('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
            ToastFactory.show('GPS Error', 'short', 'bottom');
            $rootScope.gettingPosition = true;
        }
    }
})();
