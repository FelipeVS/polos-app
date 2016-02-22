(function() {
    'use strict';

    angular
    .module('app.services')
    .factory('CentersService', centersService);

    centersService.$inject = ['$http', '$q', 'serverUrl'];

    var centers = [];

    /* @ngInject */
    function centersService($http, $q, serverUrl) {
        var service = {
            getAll: getAll,
            saveCenter: saveCenter,
            getCenter: getCenter
        };
        var center;

        return service;

        ////////////////

        function getAll() {
            return $http.get(serverUrl + 'centers.json')
              .then(getCentersComplete)
              .catch(getCentersFailed);

            function getCentersComplete(response) {
                centers = response.data;
                return centers;
            }

            function getCentersFailed(error) {
                console.log('XHR Failed for getCenters.' + error.data);
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
