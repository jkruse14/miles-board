(function() {
    'use strict';
    
    angular
    .module('milesBoard')
    .factory('UsersApi', UsersApi);

    UsersApi.$inject = ['Restangular'];

    function UsersApi(Restangular) {
        return Restangular.service('users');
    }
})();