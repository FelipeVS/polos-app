(function() {
    'use strict';

    angular
        .module('app.services')
        .service('RestaurantsService', RestaurantsService);

    RestaurantsService.$inject = ['$http', '$q', '$rootScope', 'ToastFactory', 'LoadingFactory', 'serverUrl', 'CentersService'];

    /* @ngInject */
    function RestaurantsService($http, $q, $rootScope, ToastFactory, LoadingFactory, serverUrl, CentersService) {

        var service = {
            getAll: getAll,
            getRestaurants: getRestaurants
        };
        var restaurants = [];
        var selectedCenter;

        return service;

        function getAll() {
            var selectedCenter = CentersService.getCenter();

            return $http.get(serverUrl + 'polos/' + selectedCenter.id + '/restaurantes/index.json', {
              params: {lat: $rootScope.latitude, lng: $rootScope.longitude},
            })
              .then(getRestaurantsComplete)
              .catch(getRestaurantsFailed);

            function getRestaurantsComplete(response) {
                restaurants = response.data;
                console.log("RESTAURANTS: ", restaurants);
                if (restaurants.length ===0 ) {
                  ToastFactory.show($rootScope.messages.error_no_restaurants, 'short', 'bottom');
                }
                LoadingFactory.hide();
                return restaurants;
            }

            function getRestaurantsFailed(error) {
                console.log('XHR Failed for getRestaurants.' + error.data);
                ToastFactory.show($rootScope.messages.error_no_restaurants, 'long', 'bottom');
                LoadingFactory.hide();
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
