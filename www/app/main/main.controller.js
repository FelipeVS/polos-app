(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$rootScope', '$ionicPopup', '$filter', '$timeout', '$location', '$ionicScrollDelegate', 'mapIcons', 'CentersService', 'RestaurantsService', 'NewsService', 'LoadingFactory', 'GeolocationService', 'NetworkMonitor', 'leafletBoundsHelpers'];

    /* @ngInject */
    function MainController($scope, $rootScope, $ionicPopup, $filter, $timeout, $location, $ionicScrollDelegate, mapIcons, CentersService, RestaurantsService, NewsService, LoadingFactory, GeolocationService, NetworkMonitor, leafletBoundsHelpers) {
        var vm = this;

        vm.saveCenter = saveCenter; //save center to later
        vm.reorder = reorder; // reorder funcion
        vm.isLoading = true; // control 'spinning' animation
        vm.mixing = false; // control 'bouncing' animation during reorder
        vm.markers = []; // hold map markers
        vm.reloadPopup = showReloadPopup; // show reload when server cant be reached
        vm.isOnline = NetworkMonitor.isOnline(); // how connectivity status

        // Store map specifics
        vm.mapCenter = {
            lat: $rootScope.latitude ? $rootScope.latitude : -22.8,
            lng: $rootScope.longitude ? $rootScope.longitude : -43.5,
            zoom: 9,
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
              enable: ['locationfound', 'click'],
              logic: 'emit'
            },
            markers: {
                enable: ['click'],
                logic: 'emit'
            }
        }
        // Map events
        $scope.$on('leafletDirectiveMarker.centersMap.click', function(e, args) {
           angular.forEach(vm.centers, function (center, index) {
               center.selected = false;
           })
           if (vm.centers[args.model.index]) vm.centers[args.model.index]['selected'] = true;
           $location.hash('center'+(args.model.index));
           $ionicScrollDelegate.anchorScroll(true);
       });
        $scope.$on('leafletDirectiveMap.centersMap.click', function(e, args) {
            angular.forEach(vm.centers, function (center, index) {
                center.selected = false;
            })
        });
        $scope.$on('location-found', function(event, args) {
            angular.forEach(vm.markers, function (a, ind) {
                if (a.message === "I'm here!") {
                    a.lat = $rootScope.latitude;
                    a.lng = $rootScope.longitude;
                }
            })
        });

        activate();

        ////////////////

        function activate() {
            return CentersService.getAll().then(function(data) {
                vm.centers = data;
                angular.forEach(vm.centers, function(a, ind){
                    a['selected'] = false;
                    if(a.address) {
                        if (ind === 15) console.log(a);
                        var marker = {
                            "lat" : (a.address && a.address.lat) ? parseFloat(a.address.lat) : null,
                            "lng" : (a.address && a.address.lng) ? parseFloat(a.address.lng) : null,
                            "message" : (a.name ? a.name : null) + (a.address ? " - " + a.address.city : null),
                            "index" : ind,
                            "icon" : mapIcons.center
                        }
                        vm.markers.push(marker)
                    }
                })
                if (!vm.centers || vm.centers.length === 0 ) {
                  showReloadPopup();
                }
                //Add user marker
                vm.markers.push({
                    lat: $rootScope.latitude,
                    lng: $rootScope.longitude,
                    icon: mapIcons.user,
                    message: "I'm here!"
                })
                vm.isLoading = false; // stop spinning and show content
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
