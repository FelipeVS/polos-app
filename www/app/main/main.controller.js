(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$rootScope', '$filter', '$timeout', 'CentersService', 'RestaurantsService', 'NewsService', 'leafletBoundsHelpers'];

    /* @ngInject */
    function MainController($scope, $rootScope, $filter, $timeout, CentersService, RestaurantsService, NewsService, leafletBoundsHelpers) {
        var vm = this;
        var icon = {
            iconUrl: 'images/icon/centers.png',
            // shadowUrl: 'images/icon/flag-shadow.png',
            iconSize:     [32, 32],
            shadowSize:   [32, 32],
            iconAnchor:   [16, 16],
            // shadowAnchor: [6, 0]
        };
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
            return CentersService.getAll().then(function(data) {
                vm.centers = data;
                var coordinates = [];
                var bLat, bLng, sLat, sLng;

                angular.forEach(vm.centers, function(a, ind){
                  vm.centers[ind].icon = icon;

                  if (!bLat) {
                    bLat = vm.centers[ind].lat;
                  } else if (bLat > vm.centers[ind].lat) {
                    bLat = vm.centers[ind].lat;
                  }
                  if (!sLat) {
                    sLat = vm.centers[ind].lat;
                  } else if (bLat < vm.centers[ind].lat) {
                    sLat = vm.centers[ind].lat;
                  }
                  if (!bLng) {
                    bLng = vm.centers[ind].lng;
                  } else if (bLng > vm.centers[ind].lng) {
                    bLng = vm.centers[ind].lng;
                  }
                  if (!sLng) {
                    sLng = vm.centers[ind].lng;
                  } else if (sLng < vm.centers[ind].lng) {
                    sLng = vm.centers[ind].lng;
                  }

                })
                angular.extend(vm.defaults, {
                  bounds : leafletBoundsHelpers.createBoundsFromArray([
                    [ bLat, bLng ],
                    [ sLat, sLng ]
                  ])
                } )
                console.log(vm.defaults)
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
