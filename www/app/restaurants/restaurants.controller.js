(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('RestaurantsController', RestaurantsController);

    RestaurantsController.$inject = ['$rootScope', '$cordovaLaunchNavigator', 'CentersService', 'RestaurantsService', '$ionicHistory', '$ionicScrollDelegate'];

    /* @ngInject */
    function RestaurantsController($rootScope, $cordovaLaunchNavigator, CentersService, RestaurantsService, $ionicHistory, $ionicScrollDelegate) {
        var vm = this;

        vm.backToCenters = backToCenters;
        vm.isMoreInfoShown = false;
        vm.showInfo = showInfo;
        vm.toggleGroup = toggleGroup;
        vm.isGroupShown = isGroupShown;
        vm.shownGroup;
        vm.openNavigation = openNavigation;
        vm.goToM4t = openM4t;

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
