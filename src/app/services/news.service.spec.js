/* jshint -W117, -W030 */
describe('NewsService', function() {
    var NewsService;
    beforeEach(module('app.chats'));

    beforeEach(inject(function (_NewsService_) {
        NewsService = _NewsService_;
    }));

    it('should be available', inject(function(NewsService) {
        expect(NewsService).toBeDefined();
    }));

    it('returns 5 chats', inject(function(NewsService) {
        expect(NewsService.all().length).toEqual(5);
    }));

    it('has 4 chats when removing the first', inject(function(NewsService) {
        var firstChat = NewsService.get(0);
        NewsService.remove(firstChat);

        expect(NewsService.all().length).toEqual(4);
    }));

    it('has Max as chat name with id 1', inject(function(NewsService) {
        var oneChat = {
            name: 'Max Lynx'
        };

        expect(NewsService.get(1).name).toEqual(oneChat.name);
    }));
});
