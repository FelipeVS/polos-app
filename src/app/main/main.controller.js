(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'CentersService', 'RestaurantsService', 'NewsService'];

    /* @ngInject */
    function MainController($scope, CentersService, RestaurantsService, NewsService) {
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
    }
})();
