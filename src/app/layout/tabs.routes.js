(function() {
    'use strict';

    angular
    .module('app.tabs')
    .config(routes);

    routes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routes($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'app/layout/tabs.html'
        });
    }

})();
