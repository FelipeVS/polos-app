(function() {
    'use strict';

    angular
    .module('app.services')
    .factory('NewsService', newsService);

    newsService.$inject = ['$http', '$q'];

    // Some fake testing data
    var news = [];

    /* @ngInject */
    function newsService($http, $q) {
        var service = {
            all: all,
            remove: remove,
            get: get
        };
        return service;

        ////////////////

        function all() {
            return $http.get('../../fakeData/news.json')
              .then(getNewsComplete)
              .catch(getNewsFailed);

            function getNewsComplete(response) {
                news = response.data;
                return news;
            }

            function getNewsFailed(error) {
                console.log('XHR Failed for getNews.' + error.data);
            }
        }

        function remove(news) {
            news.splice(news.indexOf(news), 1);
        }

        function get(newsId) {
            for (var i = 0; i < news.length; i++) {
                if (parseInt(news[i].id) === parseInt(newsId)) {
                    return news[i];
                }
            }
            return null;
        }
    }
})();
