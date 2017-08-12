import template from './_main.html'

(function() {
    'use strict';

    angular
        .module('milesBoard')
        .component('main', {
            templateUrl: template,
            controller: 'AlphaController',
            bindings: {

            }
        });

})();