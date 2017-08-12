(function(){
    'use strict';

    angular
        .module('milesBoard')
        .component('teams', {
            templateUrl: 'components/teams/_teams.html',
            controller: 'TeamsController',
            bindings: {
                team: '<'
        }
    });
})();
