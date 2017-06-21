(function() {
    'use strict';

    angular
        .module('milesBoard')
        .factory('TeamMemberListsApi', TeamMemberApi)

        TeamMemberApi.$incject = ['Restangular'];

        function TeamMemberApi(Restangular) {
            return Restangular.service('team_member_lists')
        }
})();