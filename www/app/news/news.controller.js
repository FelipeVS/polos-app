(function() {
    'use strict';

    angular
    .module('app.news')
    .controller('NewsController', NewsController);

    NewsController.$inject = ['$rootScope', '$state', 'NewsService', 'CentersService', 'ToastFactory'];

    /* @ngInject */
    function NewsController($rootScope, $state, NewsService, CentersService, ToastFactory) {
        var vm = this;
        vm.newsDetail = newsDetail;
        vm.backToCenters = backToCenters;

        activate();

        ////////////////

        function activate() {
            vm.center = CentersService.getCenter();
            vm.news = NewsService.getNews();
            if (vm.news.length === 0) ToastFactory.show($rootScope.messages.error_no_news, 'short', 'bottom');
        }

        function newsDetail(news) {
            NewsService.saveSelected(news);
        }

        function backToCenters() {
            // $ionicHistory.goBack();
            $state.transitionTo('main')
        }
    }
})();
