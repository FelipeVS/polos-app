(function() {
    'use strict';

    angular
    .module('app.news')
    .controller('NewsDetailController', NewsDetailController);

    NewsDetailController.$inject = ['$rootScope', '$stateParams', 'NewsService'];

    /* @ngInject */
    function NewsDetailController($rootScope, $stateParams, NewsService) {
        var vm = this;
        vm.updateSlide = updateSlide;

        activate();

        ////////////////

        function activate() {
            vm.singleNews = NewsService.getSelected();
            $rootScope.$emit('lazyImg:refresh');
        }

        function updateSlide(index) {
            $rootScope.$emit('lazyImg:refresh');
        }
    }
})();
