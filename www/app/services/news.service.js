(function() {
    'use strict';

    angular
    .module('app.services')
    .factory('NewsService', newsService);

    newsService.$inject = ['$http', '$q', '$rootScope', 'ToastFactory', 'LoadingFactory', 'serverUrl', 'CentersService'];

    // Some fake testing data
    var news = [];

    /* @ngInject */
    function newsService($http, $q, $rootScope, ToastFactory, LoadingFactory, serverUrl, CentersService) {
        var service = {
            getAll: getAll,
            getNews: getNews,
            saveSelected: saveSelected,
            getSelected: getSelected
        };
        var news = [];
        var selectedNews = {};

        return service;

        ////////////////

        function getAll() {
            var selectedCenter = CentersService.getCenter();

            return $http.get(serverUrl + 'polos/' + selectedCenter.id + '/noticias/index.json')
              .then(getNewsComplete)
              .catch(getNewsFailed);
        }

        function getNews() {
            return news;
        }

        function saveSelected(x) {
            selectedNews = x;
        }

        function getSelected() {
            return selectedNews;
        }

        function getNewsComplete(response) {
            news = response.data;
            console.log("NEWS:", news);
            if (news.length === 0 ) {
              $rootScope.hasNews = false;
            //   ToastFactory.show($rootScope.messages.error_no_news, 'short', 'bottom');
              return null;
            } else {
              $rootScope.hasNews = true;
            }
            return news;
        }

        function getNewsFailed(error) {
            console.log('XHR Failed for getNews.' + error.data);
            ToastFactory.show($rootScope.messages.error_operation, 'long', 'bottom');
        }
    }
})();
