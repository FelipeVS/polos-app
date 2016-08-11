(function() {
    'use strict';

    angular
    .module('app.services')
    .factory('CentersService', centersService);

    centersService.$inject = ['$http', '$q', '$rootScope', 'ToastFactory', 'serverUrl'];

    var centers = [];

    /* @ngInject */
    function centersService($http, $q, $rootScope, ToastFactory, serverUrl) {
        var service = {
            getAll: getAll,
            saveCenter: saveCenter,
            getCenter: getCenter
        };
        var center;

        return service;

        ////////////////

        function getAll() {
            return $http.get(serverUrl + 'polos/index.json')
              .then(getCentersComplete)
              .catch(getCentersFailed);

            function getCentersComplete(response) {
                centers = response.data;
                if (centers === 0 ) {
                  ToastFactory.show($rootScope.messages.error_operation, 'short', 'bottom');
                }
                return centers;
            }

            function getCentersFailed(error) {
                console.log('XHR Failed for getCenters.' + error.data);
                ToastFactory.show($rootScope.messages.error_operation, 'long', 'bottom');
            }
        }

        function saveCenter (selected) {
            console.log('Saving center to later:', selected);
            center = selected;
        }

        function getCenter () {
            return center;
        }

    }
})();
