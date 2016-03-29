(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('RestaurantsController', RestaurantsController);

    RestaurantsController.$inject = ['$rootScope', '$state', '$cordovaLaunchNavigator', 'mapIcons', 'CentersService', 'RestaurantsService', '$ionicHistory', '$ionicScrollDelegate', 'LoadingFactory'];

    /* @ngInject */
    function RestaurantsController($rootScope, $state, $cordovaLaunchNavigator, mapIcons, CentersService, RestaurantsService, $ionicHistory, $ionicScrollDelegate, LoadingFactory) {
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
        vm.defaults = {
          tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          tileLayerOptions: {
              attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
        }

        activate();

        ////////////////

        function activate() {
            vm.center = CentersService.getCenter();
            // vm.markers[0] = vm.center;
            // vm.markers[0].icon = mapIcons.center;
            vm.mapCenter = {
                lat: vm.center.lat,
                lng: vm.center.lng,
                zoom: 14
            }
            vm.restaurants = RestaurantsService.getRestaurants();
            angular.forEach(vm.restaurants, function(a, ind){
              var restaurant = vm.restaurants[ind];
              restaurant.icon = mapIcons.restaurant;
              vm.markers[ind] = restaurant;
            })
            LoadingFactory.hide();LoadingFactory.hide();
        }

        function backToCenters() {
            // $ionicHistory.goBack();
            $state.transitionTo('main')
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
            $cordovaLaunchNavigator.navigate([lat,lng], null).then(function() {
              console.log("Navigator launched");
            }, function (err) {
              console.error(err);
            });
        }

        function openM4t() {
            navigator.startApp.check("com.menufortourist", function(message) { /* success */
                navigator.startApp.start("com.menufortourist", openAppSuccess, openAppError);
            }, function(error) {
                console.log('Not Installed');
                if (ionic.Platform.isIOS()) {
                  $rootScope.openBrowser('https://itunes.apple.com/br/app/menu-for-tourist/id922644257');
                } else if (ionic.Platform.isAndroid()){
                  $rootScope.openBrowser('https://play.google.com/store/apps/details?id=com.menufortourist');
                } else {
                  $rootScope.openBrowser('http://www.menufortourist.com')
                }
            });

            function openAppSuccess(message) {
              console.log(message); // => OK
            }
            function openAppError(error) {
              console.log(error);
            }
        }
    }
})();
