(function() {
    'use strict';

    angular
        .module('app.services')
        .service('LoadingFactory', LoadingFactory);

    LoadingFactory.$inject = ['$ionicLoading', '$cordovaSpinnerDialog', '$rootScope'];

    /* @ngInject */
    function LoadingFactory($ionicLoading, $cordovaSpinnerDialog, $rootScope) {

        var service = {
          show: show,
          hide: hide
        };

        return service;

        function show(title, message, callback) {
            if (!title) {
              title = null;
            }
            if (!message) {
              message = null;
            }
            if (!callback) {
              callback = function() {
                console.log('Close loading');
                $cordovaSpinnerDialog.hide();
              }; //defaults to fixed loading
            }

            if (ionic.Platform.isWebView()) {
              $cordovaSpinnerDialog.show(title, message, callback);
            } else {
              $ionicLoading.show({
                      template: '<i class="icon ion-load-a"></i> ' + message,
                      animation: 'fade-in',
                      showBackdrop: true,
                      maxWidth: 200,
                      showDelay: 0
                  });
            }
        }
        function hide() {
          if (ionic.Platform.isWebView()) {
            $cordovaSpinnerDialog.hide();
          } else {
            $ionicLoading.hide();
          }
        }
    }
})();
