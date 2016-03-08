/* jshint -W117, -W030 */
describe('NewsDetailController', function() {
    var $controller;

    // Load the module for the news
    beforeEach(module('app.news'));

    // Instantiate the controller and mocks for every test
    beforeEach(inject(function(_$controller_, _$stateParams_) {
        var $scope = {};
        $controller = _$controller_('NewsDetailController', {$scope: $scope});
        $stateParams = _$stateParams_;
        $stateParams.newsId = 1;
    }));

    describe('News-Detail controller', function() {

        it ('should be created successully', function() {
            expect($controller).toBeDefined();
        });

        describe('after activate', function() {

            it('should have the News with Max loaded', function() {
                var singleNews = {
                    name: 'Max Lynx'
                };

                expect($controller.news.name).toEqual(singleNews.name);
            });
        });
    });

});
