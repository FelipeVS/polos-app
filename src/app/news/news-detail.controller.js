(function() {
    'use strict';

    angular
    .module('app.news')
    .controller('NewsDetailController', NewsDetailController);

    NewsDetailController.$inject = ['$stateParams', 'NewsService'];

    /* @ngInject */
    function NewsDetailController($stateParams, NewsService) {
        var vm = this;
        activate();

        ////////////////

        function activate() {
            vm.singleNews = NewsService.get($stateParams.newsId);
        }
    }
})();
