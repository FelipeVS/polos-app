(function() {
    'use strict';

    angular
        .module('app.services')
        .service('ToastFactory', ToastFactory);

    ToastFactory.$inject = ['$cordovaToast'];

    /* @ngInject */
    function ToastFactory($cordovaToast) {

        var service = {
          show: show
        };

        return service;

        function show(message, duration, position) {
            if (!message) {
              message = "Unknown error";
            }

            if (!ionic.Platform.isWebView()) {
              console.log(message)
            } else {
              $cordovaToast.show(message, duration, position)
            }
        }
    }
})();
