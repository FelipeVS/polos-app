(function() {
    'use strict';

    angular
    .module('app', [
        /* Shared modules */
        'ionic',
        'app.core',

        /* Feature areas */
        'app.tabs',
        'app.main',
        'app.restaurants',
        'app.news',

        'app.services',
        'app.directives'
    ]);
    angular
    .module('app.services', [
      'app.core'
    ]);
    angular
    .module('app.directives', [
      'app.core'
    ]);
})();
