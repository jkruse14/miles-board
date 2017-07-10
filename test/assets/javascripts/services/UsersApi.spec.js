describe('UsersApi', function(){
    let UsersApi;

    var userList = [
        {
            id: '1',
            first_name: 'Justin',
            last_name: 'Kruse'
        },
        {
            id: '2',
            first_name: 'Ashley',
            last_name: 'Whipps'
        },
        {
            id: '3',
            first_name: 'Jeff',
            last_name: 'Metzdorf'
        },
        {
            id: '4',
            first_name: 'Bekah',
            last_name: 'Metzdorf'
        }
    ];

    beforeEach(angular.mock.module('milesBoard'));

    //before each test, set our injected Users factory (_Users_) to our local users variable
    beforeEach(inject(function(_UsersApi_){
        UsersApi = _UsersApi_;
    }));

    //simple test to verify users factory exists
    it('should exist', function(){
        expect(UsersApi).toBeDefined();
    });
});