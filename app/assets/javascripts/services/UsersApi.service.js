angular
    .module('milesBoard')
    .factory('UsersApi', function (Restangular) {
        let self = this;
        self.service = Restangular.service('users');

        self.getUserTeams = getUserTeams;

        function getUserTeams(userId) {
            //self.service.customGET
        }

        return self;
    })