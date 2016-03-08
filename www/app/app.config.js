(function() {
    'use strict';

    angular
    .module('app')
    .config(configure);

    configure.$inject = ['$translateProvider'];

    function configure ($translateProvider) {

        // ANGULAR-TRANSLATE
        $translateProvider.useStaticFilesLoader({
          prefix: 'translation/',
          suffix: '.json'
        });
        $translateProvider.registerAvailableLanguageKeys([
          'en',
          'pt-BR',
          'es'
        ], {
          'en_*': 'en',
          'pt_*': 'pt-BR',
          'es_*': 'es'
        });
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.determinePreferredLanguage();
        $translateProvider.fallbackLanguage('pt-BR');
    }
})();
