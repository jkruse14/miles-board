(function(){
    'use strict';

    angular
        .module('milesBoard')
        .factory('MilesBoardImages', MilesBoardImages)
        
        MilesBoardImages.$inject = [];

        function MilesBoardImages(){

            function getLogo(team_id) {
                //return 'teams/'+team_id+'/mcr-logo-type-1-line.eps';
                return '<%= image_path("/teams/'+team_id+'/logo.svg") %>'
            }

            return {
                road_runner: '<%= image_path("road-runner.jpg") %>',
                getLogo: getLogo
            }
        }
})();