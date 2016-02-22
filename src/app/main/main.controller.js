(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('MainController', MainController);

    MainController.$inject = ['CentersService'];

    /* @ngInject */
    function MainController(CentersService) {
        var vm = this;

        activate();

        vm.saveCenter = saveCenter;

        ////////////////

        function activate() {
            vm.mapCenter = {
                lat: 51.505,
                lng: -0.09,
                zoom: 8
            }
            return CentersService.getAll().then(function(data) {
                vm.centers = data;
            });
        }

        function saveCenter(center) {
            CentersService.saveCenter(center);
        }
    }
})();
