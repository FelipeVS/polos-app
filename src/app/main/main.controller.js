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

        ////////////////

        function activate() {
            console.log(URL);
            return CentersService.all().then(function(data) {
                console.log(data);
                vm.centers = data;
                return vm.centers;
            });
        }
    }
})();
