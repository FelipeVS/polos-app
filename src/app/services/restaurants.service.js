(function() {
    'use strict';

    angular
        .module('app.services')
        .service('RestaurantsService', RestaurantsService);

    RestaurantsService.$inject = ['$http', '$q', 'serverUrl', 'CentersService'];

    /* @ngInject */
    function RestaurantsService($http, $q, serverUrl, CentersService) {

        var service = {
            getAll: getAll,
            getRestaurants: getRestaurants
        };
        var restaurants = [];
        var selectedCenter;

        return service;

        function getAll() {
            var centerParam = CentersService.getCenter();

            return $http.get(serverUrl + 'restaurants', {
                params: {center: centerParam.title},
            })
              .then(getRestaurantsComplete)
              .catch(getRestaurantsFailed);

            function getRestaurantsComplete(response) {
                restaurants = response.data;
                console.log(restaurants);
                return restaurants;
            }

            function getRestaurantsFailed(error) {
                console.log('XHR Failed for getRestaurants.' + error.data);
            }
        }

        function getRestaurants() {
            return restaurants;
        }

        function getSelectedCenter() {
            selectedCenter = CentersService.getCenter();
            return selectedCenter;
        }
    }
})();
