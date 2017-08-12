import template from './_header.html'
(function(){
    'use strict';

    angular
    .module('milesBoard')
    .component('milesHeader',{
        templateUrl: template,
        controller: 'HeaderController',
        controllerAs: 'vm'
    });

})();
