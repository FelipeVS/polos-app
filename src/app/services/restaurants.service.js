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
            getSelected: getSelected
        };
        var restaurants = [];
        var selectedCenter;

        return service;

        function getAll(centerParam) {
            console.log(centerParam);
            // if (!selectedCenter) {
            //     getSelectedCenter();
            // }
            return $http.get(serverUrl + 'restaurants.json')
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

        function getSelected() {
            return restaurants;
        }

        function getSelectedCenter() {
            selectedCenter = CentersService.getCenter();
            return selectedCenter;
        }
    }
})();
