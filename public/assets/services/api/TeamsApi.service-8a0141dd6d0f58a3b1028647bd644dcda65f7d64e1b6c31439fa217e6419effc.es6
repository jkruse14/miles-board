(function(){
    'use strict';

    angular
        .module('milesBoard')
        .factory('TeamsApi', TeamsApi);

    TeamsApi.$inject = ['Restangular'];

    function TeamsApi(Restangular) {
        return Restangular.service('teams');
    }
})();
