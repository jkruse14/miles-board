(function () {
    'use strict';

    angular
        .module('milesBoard')
        .config(authConfig);

    authConfig.$inject = ['$authProvider'];

    /** @ngInject */
    function authConfig($authProvider) {
        $authProvider.configure(
            [{
                'default': {
                    apiUrl: 'http://localhost:8000',
                    emailRegistrationPath: '/users',
                    validateOnPageLoad: true,
                },
                'user': {
                    apiUrl: 'http://localhost:8000',
                    emailRegistrationPath: '/users',
                    validateOnPageLoad: true,
                },
                'team_owner': {
                    apiUrl: 'http://localhost:8000',
                    emailRegistrationPath: '/team_owners',
                    validateOnPageLoad: true,
                }
            }]
        );
    }

})();
