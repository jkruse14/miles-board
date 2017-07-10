describe('UssersApi', function () {
    let TeamApi;

    beforeEach(angular.mock.module('milesBoard'));

    //before each test, set our injected Users factory (_Users_) to our local users variable
    beforeEach(inject(function (_TeamsApi_) {
        TeamsApi = _TeamsApi_;
    }));

    //simple test to verify users factory exists
    it('should exist', function () {
        expect(TeamsApi).toBeDefined();
    });
});