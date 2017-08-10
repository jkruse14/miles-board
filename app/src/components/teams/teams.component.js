import template from './_teams.html'

(function(){
    'use strict';

    angular
        .module('milesBoard')
        .component('teams', {
            templateUrl: template,
            controller: 'TeamsController',
            bindings: {
                team: '<'
        }
    });
})();