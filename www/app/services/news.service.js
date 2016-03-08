(function() {
    'use strict';

    angular
    .module('app.services')
    .factory('NewsService', newsService);

    newsService.$inject = ['$http', '$q', 'serverUrl', 'CentersService'];

    // Some fake testing data
    var news = [];

    /* @ngInject */
    function newsService($http, $q, serverUrl, CentersService) {
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
                params: {center: centerParam.title},
            })
              .then(getNewsComplete)
              .catch(getNewsFailed);

            function getNewsComplete(response) {
                news = response.data;
                console.log("NEWS:", news);
                return news;
            }

            function getNewsFailed(error) {
                console.log('XHR Failed for getNews.' + error.data);
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
