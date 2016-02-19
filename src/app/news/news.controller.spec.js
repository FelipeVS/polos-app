/* jshint -W117, -W030 */
describe('NewsController', function() {
    var $controller;

    // Load the module for the news
    beforeEach(module('app.news'));

    // Instantiate the controller and mocks for every test
    beforeEach(inject(function(_$controller_) {
        var $scope = {};
        $controller = _$controller_('NewsController', {$scope: $scope});
    }));

    describe('News controller', function() {

        it ('should be created successully', function() {
            expect($controller).toBeDefined();
        });

        describe('after activate', function() {

            it ('should have at least one news', function() {
                expect($controller.news.length).toBeGreaterThan(0);
            });
        });
    });

});
