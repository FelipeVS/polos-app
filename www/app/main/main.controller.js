(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$rootScope', '$filter', '$timeout', 'CentersService', 'RestaurantsService', 'NewsService'];

    /* @ngInject */
    function MainController($scope, $rootScope, $filter, $timeout, CentersService, RestaurantsService, NewsService) {
        var vm = this;
        vm.mapCenter = {
            lat: -23.374004,
            lng: -43.890359,
            zoom: 7
        }
        vm.events = {
            map: {
              enable: ['locationfound'],
              logic: 'emit'
            }
        }
        vm.saveCenter = saveCenter;
        vm.reorder = reorder;
        vm.mixing = false;

        $scope.$on('leafletDirectiveMap.locationfound', function(event){
            vm.eventDetected = "LocationFound";
        });

        activate();

        ////////////////

        function activate() {
            return CentersService.getAll().then(function(data) {
                vm.centers = data;
            });
        }

        function saveCenter(center) {
            CentersService.saveCenter(center);
        }

        function reorder(key) {
            vm.mixing = true;
            vm.order = key;
            vm.reverse = (vm.order === key) ? !vm.reverse : false;
            vm.centers = $filter('orderBy')(vm.centers, key, vm.reverse);
            $timeout(function() {
              vm.mixing = false;
            },500)
        }
    }
})();
