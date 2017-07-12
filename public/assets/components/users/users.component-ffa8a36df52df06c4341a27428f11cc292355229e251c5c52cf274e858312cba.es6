(function(){
    'use strict';
    angular
        .module('milesBoard')
        .component('users', {
            templateUrl: '',
            controller: 'UsersController',
            controllerAs: 'vm',
            bindings: {
                user:'<'
            }
        });
})();