(function() {
    'use strict';

    angular
        .module('milesBoard')
        .factory('settingsFactory', settings)

        settings.$inject = [];

        function settings() {
            return {
                noImageUrl: ''
            }
        }
})();