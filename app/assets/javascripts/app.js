(function(){
    'use strict';

    angular.module('milesBoard', [
        'restangular',
        'ui.router',
        'templates',
        'ui.bootstrap',
        'ng-token-auth',
        'ngStorage'
    ]).config(authConfig);

     authConfig.$inject = ['$authProvider'];

    /** @ngInject */
    function authConfig($authProvider) {
        $authProvider.configure(
            //[{
              //  'default': {
                {    apiUrl: 'http://localhost:8000',
                    emailRegistrationPath: '/users',
                    validateOnPageLoad: true,
                    confirmationSuccessUrl: 'http://localhost:8080/#/users/31',
                }
            //     ,
            //     'user': {
            //         apiUrl: 'http://localhost:8000',
            //         emailRegistrationPath: '/users',
            //         validateOnPageLoad: true,
            //     }
            // }]
        );
    }
})();