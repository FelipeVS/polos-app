(function() {
    'use strict';

    angular
    .module('app.news')
    .config(routes);

    routes.$inject = ['$stateProvider'];

    function routes($stateProvider) {
        $stateProvider

        .state('tab.news', {
            url: '/news',
            cache: false,
            views: {
                'tab-news': {
                    templateUrl: 'app/news/news.html',
                    controller: 'NewsController as vm'
                }
            }
        })
        .state('tab.news-detail', {
            url: '/news/:newsId',
            views: {
                'tab-news': {
                    templateUrl: 'app/news/news-detail.html',
                    controller: 'NewsDetailController as vm'
                }
            }
        });
    }
})();
