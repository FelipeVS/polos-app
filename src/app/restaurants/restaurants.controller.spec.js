/* jshint -W117, -W030 */
describe('RestaurantsController', function() {
    var $controller;

    // Load the module for the restaurants
    beforeEach(module('app.restaurants'));

    // Instantiate the controller and mocks for every test
    beforeEach(inject(function(_$controller_) {
        var $scope = {};
        $controller = _$controller_('RestaurantsController', {$scope: $scope});
    }));

    describe('Restaurants controller', function() {

        it ('should be created successully', function() {
            expect($controller).toBeDefined();
        });
    });

});
