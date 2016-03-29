(function() {
    'use strict';

    angular
    .module('app.services')
    .factory('NewsService', newsService);

    newsService.$inject = ['$http', '$q', '$rootScope', '$cordovaToast', 'LoadingFactory', 'serverUrl', 'CentersService'];

    // Some fake testing data
    var news = [];

    /* @ngInject */
    function newsService($http, $q, $rootScope, $cordovaToast, LoadingFactory, serverUrl, CentersService) {
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
            LoadingFactory.show(null, $rootScope.messages.loading, true);
            var selectedCenter = CentersService.getCenter();
            // DEVELOPMENT
            return $http.get(serverUrl + 'news', {
                params: {center: selectedCenter.title.valor},
            })
            // return $http.get(serverUrl + 'polos/' + selectedCenter.id + '/noticias/index.json')
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
            // DEVELOPMENT
            return selectedNews;

            // var selectedCenter = CentersService.getCenter();
            // return $http.get(serverUrl + 'polos/' + selectedCenter.id + '/noticias/' + selectedNews.id + '/show.json')
            //   .then(getNewsComplete)
            //   .catch(getNewsFailed);
        }

        function getNewsComplete(response) {
            news = response.data;
            console.log("NEWS:", news);
            if (news.length === 0 ) {
              $rootScope.hasNews = false;
              $cordovaToast.showShortBottom($rootScope.messages.error_no_news);
            } else {
              $rootScope.hasNews = true;
            }
            return news;
        }

        function getNewsFailed(error) {
            console.log('XHR Failed for getNews.' + error.data);
            $cordovaToast.showLongTop($rootScope.messages.error_operation);
        }
    }
})();
