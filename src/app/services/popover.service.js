(function() {
    'use strict';

    angular
    .module('app.services')
    .factory('PopoverService', PopoverService);

    PopoverService.$inject = ['$ionicPopover', '$rootScope'];

    /* @ngInject */
    function PopoverService($ionicPopover, $rootScope) {
        var init = function(tpl, $scope) {
            var promise;
            $scope = $scope || $rootScope.$new();
            promise = $ionicPopover.fromTemplateUrl(tpl, {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(popover) {
                $scope.popover = popover;
                return popover;
            });
            $scope.openPopover = function($event) {
                $scope.popover.show($event);
            };
            $scope.closePopover = function() {
                $scope.popover.hide();
            };
            $scope.$on('$destroy', function() {
                $scope.popover.remove();
            });
            return promise;
        };
        return {
            init: init
        };
    }
})();
