(function() {
    'use strict';

    angular
    .module('app.services')
    .factory('NewsService', newsService);

    newsService.$inject = ['$http', '$q', '$rootScope', '$cordovaToast', 'serverUrl', 'CentersService'];

    // Some fake testing data
    var news = [];

    /* @ngInject */
    function newsService($http, $q, $rootScope, $cordovaToast, serverUrl, CentersService) {
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
            var centerParam = CentersService.getCenter();
            return $http.get(serverUrl + 'news', {
                params: {center: centerParam.title.valor},
            })
              .then(getNewsComplete)
              .catch(getNewsFailed);

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

        function getNews() {
            return news;
        }

        function saveSelected(x) {
            selectedNews = x;
        }

        function getSelected() {
            return selectedNews;
        }
    }
})();
