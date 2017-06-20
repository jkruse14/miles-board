angular
    .module('milesBoard')
    .factory('TeamMemberListsApi', function (Restangular) {
        return Restangular.service('team_member_lists')
    })