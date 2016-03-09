(function() {
    'use strict';

    angular
    .module('app.services')
    .factory('CentersService', centersService);

    centersService.$inject = ['$http', '$q', '$rootScope', '$cordovaToast', 'serverUrl'];

    var centers = [];

    /* @ngInject */
    function centersService($http, $q, $rootScope, $cordovaToast, serverUrl) {
        var service = {
            getAll: getAll,
            saveCenter: saveCenter,
            getCenter: getCenter
        };
        var center;

        return service;

        ////////////////

        function getAll() {
            return $http.get(serverUrl + 'centers')
              .then(getCentersComplete)
              .catch(getCentersFailed);

            function getCentersComplete(response) {
                centers = response.data;
                if (centers === 0 ) {
                  $cordovaToast.showLongBottom($rootScope.messages.error_operation);
                }
                return centers;
            }

            function getCentersFailed(error) {
                console.log('XHR Failed for getCenters.' + error.data);
                $cordovaToast.showLongBottom($rootScope.messages.error_operation);
            }
        }

        function saveCenter (selected) {
            console.log('Saving center to later:', selected);
            center = selected;
        }

        function getCenter () {
            console.log('Getting center');
            return center;
        }

    }
})();
