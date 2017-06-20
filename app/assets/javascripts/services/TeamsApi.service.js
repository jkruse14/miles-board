angular
    .module('milesBoard')
    .factory('TeamsApi', function(Restangular){
        return Restangular.service('teams')
    })