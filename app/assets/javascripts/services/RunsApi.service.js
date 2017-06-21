(function(){
    'use strict';

    angular
        .module('milesBoard')
        .factory('RunsApi', RunsApi);

    RunsApi.$inject = ['Restangular'];

    function RunsApi(Restangular) {
        return Restangular.service('runs')
    }
})();