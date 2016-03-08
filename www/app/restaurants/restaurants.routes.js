(function() {
    'use strict';

    angular
    .module('app.restaurants')
    .config(routes);

    routes.$inject = ['$stateProvider'];

    function routes($stateProvider) {
        $stateProvider

        .state('tab.restaurants', {
            url: '/restaurants/:centerId',
            views: {
                'tab-restaurants': {
                    templateUrl: 'app/restaurants/restaurants.html',
                    controller: 'RestaurantsController as vm'
                }
            }
        });
    }
})();
