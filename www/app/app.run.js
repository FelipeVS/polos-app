(function() {
    'use strict';

    angular
    .module('app')
    .run(runBlock);

    runBlock.$inject = ['$rootScope', '$ionicPlatform', '$ionicPopover', '$translate', '$cordovaSQLite'];

    function runBlock($rootScope, $ionicPlatform, $ionicPopover, $translate, $cordovaSQLite) {

        getTranslations();

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
          // Open external links in system browser
          openBrowser();
        }

        function getTranslations() {
          $rootScope.$on('$translateChangeSuccess', function () {
            $translate([
              'error_operation',
              'error_no_restaurants',
              'error_no_news',
              'online',
              'offline',
              'loading'
            ]).then(function (translations) {
              $rootScope.messages = {
                'error_operation' : translations.error_operation,
                'error_no_restaurants' : translations.error_no_restaurants,
                'error_no_news' : translations.error_no_news,
                'online' : translations.online,
                'offline' : translations.offline,
                'loading' : translations.loading
              }
            });
          });
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

        function openBrowser() {
          $rootScope.openBrowser = function(link) {
            if ( ionic.Platform.isIOS() ) {
              window.open(link, '_blank', 'location=yes', 'closebuttoncaption=yes');
            } else {
              window.open(link, '_system', 'location=yes');
            }
          };
        }
    }
})();
