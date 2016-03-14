(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$rootScope', '$filter', '$timeout', 'mapIcons', 'CentersService', 'RestaurantsService', 'NewsService', 'leafletBoundsHelpers'];

    /* @ngInject */
    function MainController($scope, $rootScope, $filter, $timeout, mapIcons, CentersService, RestaurantsService, NewsService, leafletBoundsHelpers) {
        var vm = this;
        vm.mapCenter = {
            lat: -23.374004,
            lng: -43.890359,
            zoom: 7,
            message: "I'm here!"
        }
        vm.defaults = {
          tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          tileLayerOptions: {
              attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
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
            vm.isLoading = true;

            return CentersService.getAll().then(function(data) {
                vm.centers = data;
                angular.forEach(vm.centers, function(a, ind){
                  vm.centers[ind].icon = mapIcons.center;
                })
                vm.isLoading = false;
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
