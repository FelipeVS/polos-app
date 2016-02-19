(function() {
    'use strict';

    angular
    .module('app.restaurants')
    .controller('RestaurantsController', RestaurantsController);

    RestaurantsController.$inject = [];

    /* @ngInject */
    function RestaurantsController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
        }
    }
})();
