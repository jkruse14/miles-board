angular
    .module('milesBoard')
    .factory('RunsApi', function (Restangular) {
        return Restangular.service('runs')
    })