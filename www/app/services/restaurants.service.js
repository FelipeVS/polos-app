(function() {
    'use strict';

    angular
        .module('app.services')
        .service('RestaurantsService', RestaurantsService);

    RestaurantsService.$inject = ['$http', '$q', '$rootScope', '$cordovaToast', 'LoadingFactory', 'serverUrl', 'CentersService'];

    /* @ngInject */
    function RestaurantsService($http, $q, $rootScope, $cordovaToast, LoadingFactory, serverUrl, CentersService) {

        var service = {
            getAll: getAll,
            getRestaurants: getRestaurants
        };
        var restaurants = [];
        var selectedCenter;

        return service;

        function getAll() {
            LoadingFactory.show(null, $rootScope.messages.loading, true);
            var selectedCenter = CentersService.getCenter();
            // DEVELOPMENT
            return $http.get(serverUrl + 'restaurants', {
                params: {center: selectedCenter.title.valor},
            })
            // return $http.get(serverUrl + 'polos/' + selectedCenter.id + '/restaurantes/index.json')
              .then(getRestaurantsComplete)
              .catch(getRestaurantsFailed);

            function getRestaurantsComplete(response) {
                restaurants = response.data;
                console.log("RESTAURANTS: ", restaurants);
                if (restaurants.length ===0 ) {
                  $cordovaToast.showShortBottom($rootScope.messages.error_no_restaurants);
                }
                return restaurants;
            }

            function getRestaurantsFailed(error) {
                console.log('XHR Failed for getRestaurants.' + error.data);
                $cordovaToast.showLongBottom($rootScope.messages.error_operation);
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
