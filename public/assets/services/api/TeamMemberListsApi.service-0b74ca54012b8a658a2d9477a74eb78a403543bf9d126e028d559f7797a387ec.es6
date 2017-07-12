(function() {
    'use strict';

    angular
        .module('milesBoard')
        .factory('TeamMemberListsApi', TeamMemberListsApi);

    TeamMemberListsApi.$inject = ['Restangular'];

    function TeamMemberListsApi(Restangular) {
            return Restangular.service('team_member_lists');
        }
})();