(function(){
    'use strict';

    angular
        .module('milesBoard', [
            'environment',
            'restangular',
            'ui.router',
            'templates',
            'ui.bootstrap',
            'ng-token-auth',
            'ngStorage',
            'ngFlash'
        ])
        .config(EnvironmentConfig)
        .config(authConfig);

    authConfig.$inject = ['$authProvider','envServiceProvider'];

    /** @ngInject */
    function authConfig($authProvider,envServiceProvider) {
        let url = envServiceProvider.is('development') ? 'http://localhost:8000' : 'https://miles-board.herokuapp.com';
        
        $authProvider.configure([{
               'default': {
                    apiUrl: url,
                    emailRegistrationPath: '/users',
                    confirmationSuccessUrl: window.location.href,
                    validateOnPageLoad: true,
                }},
                {'user': {
                    apiUrl: url,
                    emailRegistrationPath: '/users',
                    confirmationSuccessUrl: window.location.href,
                    validateOnPageLoad: true,
                }},
                {'team_owner' : {
                    apiUrl: url,
                    emailRegistrationPath: '/team_owners',
                    confirmationSuccessUrl: window.location.href,
                    validateOnPageLoad: true,
                }
            }]
        );
        console.log('is dev: ', envServiceProvider.is('development'))
    }

    EnvironmentConfig.$inject = ['envServiceProvider'];

    /** @ngInject */
    function EnvironmentConfig(envServiceProvider) {
        envServiceProvider.config({
            domains: {
                development: ['localhost'],
                production: ['miles-board.herokuapp.com']
            },
            vars: {
                development: {
                    apiUrl: 'http://localhost:8000'
                },
                production: {
                    apiUrl: 'https://miles-board.herokuapp.com'
                },
            }
        });

        envServiceProvider.check();
    }
})();