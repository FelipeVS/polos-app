(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('RestaurantsController', RestaurantsController);

    RestaurantsController.$inject = ['$rootScope', '$scope','$state', '$filter', '$timeout', '$cordovaLaunchNavigator', 'mapIcons', 'CentersService', 'RestaurantsService', '$ionicHistory', '$ionicScrollDelegate', 'LoadingFactory'];

    /* @ngInject */
    function RestaurantsController($rootScope, $scope, $state, $filter, $timeout, $cordovaLaunchNavigator, mapIcons, CentersService, RestaurantsService, $ionicHistory, $ionicScrollDelegate, LoadingFactory) {
        var vm = this;

        vm.backToCenters = backToCenters;
        vm.isMoreInfoShown = false;
        vm.showInfo = showInfo;
        vm.toggleGroup = toggleGroup;
        vm.isGroupShown = isGroupShown;
        vm.shownGroup;
        vm.openNavigation = openNavigation;
        vm.goToM4t = openM4t;
        vm.markers = [];
        vm.reorder = reorder;

        vm.defaults = {
          tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          tileLayerOptions: {
              attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
        }

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
            vm.center = CentersService.getCenter();

            vm.mapCenter = {
                lat: vm.center.lat,
                lng: vm.center.lng,
                zoom: 14
            }
            vm.restaurants = RestaurantsService.getRestaurants();
            angular.forEach(vm.restaurants, function(a, ind){
              var restaurant = {
                lat: parseFloat(vm.restaurants[ind].address.lat),
                lng: parseFloat(vm.restaurants[ind].address.lng),
                message: vm.restaurants[ind].name
              };
              restaurant.icon = mapIcons.restaurant;
              vm.markers[ind] = restaurant;
            })

            //Add user marker
            vm.markers.push({
                lat: $rootScope.latitude,
                lng: $rootScope.longitude,
                icon: mapIcons.user,
                message: "I'm here!"
            })
            console.log('Markers', vm.markers);
            LoadingFactory.hide();LoadingFactory.hide();
        }

        function backToCenters() {
            // $ionicHistory.goBack();
            $state.transitionTo('main')
        }

        function reorder(key) {
            $rootScope.$emit('lazyImg:refresh');

            if (key==='name') {
                if (!vm.nameOrderUp) {
                  vm.nameOrderUp = true;
                } else {
                  vm.nameOrderUp = false;
                }
            } else if (key==='distance') {
                if (!vm.distanceOrderUp) {
                  vm.distanceOrderUp = true;
                } else {
                  vm.distanceOrderUp = false;
                }
            }

            vm.orderSelected = key;

            vm.mixing = true;
            vm.order = key;
            vm.reverse = (vm.order === key) ? !vm.reverse : false;
            vm.restaurants = $filter('orderBy')(vm.restaurants, key, vm.reverse);
            $timeout(function() {
              vm.mixing = false;
            },500)
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

        function openNavigation(lat, lng) {
            console.log('This will open the external navigation app')
            $cordovaLaunchNavigator.navigate([lat,lng]).then(function() {
              console.log("Navigator launched");
            }, function (err) {
              console.error(err);
            });
        }

        function openM4t() {
            if ( ionic.Platform.isAndroid() ) {

              navigator.startApp.check("com.menufortourist", function(message) {
                  navigator.startApp.start("com.menufortourist", openAppSuccess, openAppError);
              }, function(error) {
                  console.log('Not Installed');
                  $rootScope.openBrowser('https://play.google.com/store/apps/details?id=com.menufortourist');
              });

            } else if (ionic.Platform.isIOS()) {

              navigator.startApp.check("menufortourist://", function(message) {
                  navigator.startApp.start("menufortourist://", function(message) {
                      console.log(message);
                  },
                  function(error) {
                      console.log(error);
                  });
              },
              function(error) {
                  console.log('Not Installed');
                  $rootScope.openBrowser('https://itunes.apple.com/br/app/menu-for-tourist/id922644257');
              });

            } else if (!ionic.Platform.isWebview()){
              $rootScope.openBrowser('http://www.menufortourist.com')
            }

            function openAppSuccess(message) {
              console.log(message); // => OK
            }
            function openAppError(error) {
              console.log(error);
            }
        }
    }
})();
