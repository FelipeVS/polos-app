(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$rootScope', '$ionicPopup', '$filter', '$timeout', 'mapIcons', 'CentersService', 'RestaurantsService', 'NewsService', 'LoadingFactory', 'GeolocationService', 'leafletBoundsHelpers'];

    /* @ngInject */
    function MainController($scope, $rootScope, $ionicPopup, $filter, $timeout, mapIcons, CentersService, RestaurantsService, NewsService, LoadingFactory, GeolocationService, leafletBoundsHelpers) {
        var vm = this;
        vm.mapCenter = {
            lat: $rootScope.latitude ? $rootScope.latitude : -22.8,
            lng: $rootScope.longitude ? $rootScope.longitude : -43.5,
            zoom: 8,
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
        vm.markers = [];
        vm.reloadPopup = showReloadPopup;

        $scope.$on('leafletDirectiveMap.locationfound', function(e){
            vm.eventDetected = "LocationFound";
        });

        $scope.$on('leafletDirectiveMarker.click', function(e, args) {
           // Args will contain the marker name and other relevant information
           console.log(e, args);
       });

        $scope.$on('location-found', function(event, args) {
            angular.forEach(vm.markers, function (a, ind) {
                if (a.message === "I'm here!") {
                    a.lat= $rootScope.latitude,
                    a.lng= $rootScope.longitude
                }
            })
        });

        activate();

        ////////////////

        function activate() {
            vm.isLoading = true;

            return CentersService.getAll().then(function(data) {
                vm.centers = data;
                angular.forEach(vm.centers, function(a, ind){
                    if (a.address) {
                        vm.centers[ind].lat = parseFloat(a.address.lat);
                        vm.centers[ind].lng = parseFloat(a.address.lng);
                      vm.centers[ind].icon = mapIcons.center;
                      if (a.name) vm.centers[ind].message = a.name + " \n" + a.address.city;
                  }
                })
                vm.isLoading = false;
                if (!vm.centers || vm.centers.length === 0 ) {
                  showReloadPopup();
                }
                vm.markers = vm.centers;

                //Add user marker
                vm.markers.push({
                    lat: $rootScope.latitude,
                    lng: $rootScope.longitude,
                    icon: mapIcons.user,
                    message: "I'm here!"
                })
            });
        }

        function saveCenter(center) {
            LoadingFactory.show(null, $rootScope.messages.loading, true);
            CentersService.saveCenter(center);
        }

        function showReloadPopup() {
          var message = $rootScope.offline ? $filter('translate')('offline') : $filter('translate')('reload');

          var alertPopup = $ionicPopup.alert({
            title: message,
            templateUrl: 'app/layout/popup/reload.html',
            buttons: [
              {
                text: '<i class="icon ion-refresh"></i>',
                type: 'button-energized'
              }
            ]
          });
          alertPopup.then(function(res) {
            activate();
          });
        }

        function reorder(key) {
            $rootScope.$emit('lazyImg:refresh');

            if (!vm.orderUp) {
              vm.orderUp = true;
            } else {
              vm.orderUp = false;
            }

            vm.orderSelected = key;

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
