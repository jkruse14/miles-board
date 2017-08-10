(function(){
    'use strict';

    angular
        .module('milesBoard')
        .factory('TeamOwnersApi', TeamOwnersApi);

    TeamOwnersApi.$inject = ['Restangular'];

    function TeamOwnersApi(Restangular) {
        return Restangular.service('team_owners');
    }
})();