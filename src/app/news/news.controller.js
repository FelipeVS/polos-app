(function() {
    'use strict';

    angular
    .module('app.news')
    .controller('NewsController', NewsController);

    NewsController.$inject = ['NewsService'];

    /* @ngInject */
    function NewsController(NewsService) {
        var vm = this;
        vm.remove = remove;

        activate();

        ////////////////

        function activate() {
            return NewsService.all().then(function(data) {
                vm.news = data;
                return vm.news;
            });
        }

        function remove(news) {
            NewsService.remove(news);
        }

    }
})();
