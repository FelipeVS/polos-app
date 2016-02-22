(function() {
    'use strict';

    angular
    .module('app')
    .config(configure);

    configure.$inject = ['$translateProvider'];

    function configure ($translateProvider) {
        // Add your configuration here
        $translateProvider.translations('en', {
            MainTitle: 'Hello',
        });
        $translateProvider.translations('pt-BR', {
            MainTitle: 'Hallo',
        });
        $translateProvider.translations('es', {
            MainTitle: 'Hallo',
        });
        $translateProvider.preferredLanguage('en');
    }
})();
