(function() {
    'use strict';

    angular
    .module('app.services')
    .factory('CentersService', centersService);

    centersService.$inject = ['$http', '$q'];

    var centers = [];

    /* @ngInject */
    function centersService($http, $q) {
        var service = {
            all: all,
            remove: remove,
            get: get
        };
        return service;

        ////////////////

        function all() {
            return $http.get(URL + 'centers.json')
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

        function remove(centers) {
            centers.splice(centers.indexOf(centers), 1);
        }

        function get(centersId) {
            for (var i = 0; i < centers.length; i++) {
                if (parseInt(centers[i].id) === parseInt(centersId)) {
                    return centers[i];
                }
            }
            return null;
        }
    }
})();
