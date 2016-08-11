(function() {
    'use strict';

    angular
    .module('app')
    .run(runBlock);

    runBlock.$inject = ['$rootScope', '$ionicPlatform', '$ionicPopover', '$translate', '$cordovaSQLite', 'NetworkMonitor', 'GeolocationService'];

    function runBlock($rootScope, $ionicPlatform, $ionicPopover, $translate, $cordovaSQLite, NetworkMonitor, GeolocationService) {

        $rootScope.getTranslation = function(object, locale, clear) {
            if (object === null || object.traducoes === null) {
                return;
            }
            var translation = object.text;
            for (var i = 0; i < object.traducoes.length; i++) {
                if (object.traducoes[i].locale.toUpperCase() == locale.toUpperCase()) {
                    translation = object.traducoes[i].text;
                }
            }
            if (clear) {
                return translation.replace(/\./g,'');
            }
            return translation;
        };

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

          startNetworkMonitor();
          startGeolocation();
          generateLanguagePopover();

          // Open external links in system browser
          openBrowser();
        }

        function getTranslations() {
          $rootScope.$on('$translateChangeSuccess', function () {
            $rootScope.selectedLanguage = $translate.use();
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

        function startNetworkMonitor() {
          NetworkMonitor.start();
        }
        function startGeolocation() {
          GeolocationService.start();
        }

        function generateLanguagePopover() {
          // .fromTemplateUrl() method
          $ionicPopover.fromTemplateUrl('app/layout/popovers/languages.html', {
              scope: $rootScope,
              animation: 'slide-in-up'
          }).then(function(popover) {
              $rootScope.langPopover = popover;
          });
          $rootScope.openLanguage = function($event) {
              $rootScope.langPopover.show($event);
              $rootScope.langPopover.exists = true;
          };
          $rootScope.closeLanguagePopover = function() {
              $rootScope.langPopover.hide();
              $rootScope.langPopover.exists = false;
          };
          $rootScope.changeLanguage = function(langKey) {
              $translate.use(langKey);
              $rootScope.closeLanguagePopover();
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
