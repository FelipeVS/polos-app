(function() {
    'use strict';

    angular
    .module('app.news')
    .controller('NewsController', NewsController);

    NewsController.$inject = ['NewsService', 'CentersService'];

    /* @ngInject */
    function NewsController(NewsService, CentersService) {
        var vm = this;
        vm.newsDetail = newsDetail;

        activate();

        ////////////////

        function activate() {
            vm.center = CentersService.getCenter();
            vm.news = NewsService.getNews();
        }

        function newsDetail(news) {
            NewsService.saveSelected(news);
        }

    }
})();
