(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('RestaurantsController', RestaurantsController);

    RestaurantsController.$inject = ['CentersService', 'RestaurantsService', 'PopoverService', '$ionicHistory', '$ionicScrollDelegate'];

    /* @ngInject */
    function RestaurantsController(CentersService, RestaurantsService, PopoverService, $ionicHistory, $ionicScrollDelegate) {
        var vm = this;

        vm.backToCenters = backToCenters;
        vm.openLanguageList = openLanguageList;
        vm.isMoreInfoShown = false;
        vm.showInfo = showInfo;
        vm.toggleGroup = toggleGroup;
        vm.isGroupShown = isGroupShown;
        vm.shownGroup;

        activate();

        ////////////////

        function activate() {
            vm.center = CentersService.getCenter();
            vm.mapCenter = {
                lat: vm.center.lat,
                lng: vm.center.lng,
                zoom: 8
            }
            vm.restaurants = RestaurantsService.getRestaurants();
        }

        function backToCenters() {
            $ionicHistory.goBack();
        }

        function openLanguageList($event) {
            console.log('This will open a popover')
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
