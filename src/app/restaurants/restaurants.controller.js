(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('RestaurantsController', RestaurantsController);

    RestaurantsController.$inject = ['CentersService', 'RestaurantsService', '$ionicHistory', '$ionicScrollDelegate'];

    /* @ngInject */
    function RestaurantsController(CentersService, RestaurantsService, $ionicHistory, $ionicScrollDelegate) {
        var vm = this;

        vm.backToCenters = backToCenters;
        vm.isMoreInfoShown = false;
        vm.showInfo = showInfo;
        vm.toggleGroup = toggleGroup;
        vm.isGroupShown = isGroupShown;
        vm.shownGroup;

        activate();

        ////////////////

        function activate() {
            vm.mapCenter = {
                lat: 51.505,
                lng: -0.09,
                zoom: 8
            }
            vm.center = CentersService.getCenter();
            return RestaurantsService.getAll().then(function(data) {
                vm.restaurants = data;
            }).catch(function(error) {
            });
        }

        function backToCenters() {
            $ionicHistory.goBack();
        }

        function showInfo() {
            if (vm.isMoreInfoShown) {
                vm.isMoreInfoShown = false;
            } else {
                vm.isMoreInfoShown = true;
            }
        }

        function toggleGroup(group) {
            $ionicScrollDelegate.resize()
            if (vm.isGroupShown(group)) {
                vm.shownGroup = null;
            } else {
                vm.shownGroup = group;
            }
        }

        function isGroupShown(group) {
            return vm.shownGroup === group;
        }
    }
})();
