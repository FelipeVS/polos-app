(function() {
    'use strict';

    angular
    .module('app')
    .run(runBlock);

    runBlock.$inject = ['$rootScope', '$ionicPlatform', '$ionicPopover', '$translate', '$cordovaSQLite'];

    function runBlock($rootScope, $ionicPlatform, $ionicPopover, $translate, $cordovaSQLite) {
        $ionicPlatform.ready(activate);



        function activate() {
          // Hide the accessory bar by default (remove this to show the accessory bar
          // above the keyboard for form inputs)
          if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(true);
          }

          if (window.StatusBar) {
              // org.apache.cordova.statusbar required
              StatusBar.styleLightContent();
          }
          if (window.sqlitePlugin) {
              initiateSQLite();
          }
          if (ionic.Platform.isWebView()) {
          }

          generateLanguagePopover();
        }

        function initiateSQLite() {
            var db = $cordovaSQLite.openDB({name: "config.db", location: 2}, successcb, errorcb);
        }

        function successcb() {
          console.log('Succsess');
        }
        function errorcb() {
          console.log('Error!');
        }

        function generateLanguagePopover() {
          // .fromTemplateUrl() method
          $ionicPopover.fromTemplateUrl('app/layout/popovers/languages.html', {
              scope: $rootScope,
              animation: 'slide-in-up'
          }).then(function(popover) {
              $rootScope.popover = popover;
          });
          $rootScope.openPopover = function($event) {
              $rootScope.popover.show($event);
              $rootScope.popover.exists = true;
          };
          $rootScope.closePopover = function() {
              $rootScope.popover.hide();
              $rootScope.popover.exists = false;
          };
          $rootScope.changeLanguage = function(langKey) {
              $translate.use(langKey);
              $rootScope.closePopover();
          };
        }
    }
})();
