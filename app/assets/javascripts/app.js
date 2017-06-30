(function(){
    'use strict';

    angular
        .module('milesBoard', [
            'environment',
            'restangular',
            'ui.router',
            'templates',
            'ngAnimate',
            'ui.bootstrap',
            'ng-token-auth',
            'ngStorage',
            'ngFlash'
        ])
        .config(EnvironmentConfig)
        .config(authConfig)
        .config(ApiConfig)
        .run();

    authConfig.$inject = ['$authProvider','envServiceProvider'];

    /** @ngInject */
    function authConfig($authProvider,envServiceProvider) {
        let url = envServiceProvider.is('development') ? 'http://localhost:8000' : 'https://miles-board.herokuapp.com';
        
        $authProvider.configure([{
               'default': {
                    apiUrl: url,
                    emailRegistrationPath: '/users',
                    confirmationSuccessUrl: window.location.href,
                    validateOnPageLoad: false,
                    passwordResetSuccessUrl: url+'/#!/login'
                }},
                {'user': {
                    apiUrl: url,
                    emailRegistrationPath: '/users',
                    confirmationSuccessUrl: window.location.href,
                    validateOnPageLoad: false,
                    passwordResetSuccessUrl: url+'/#!/login'
                }},
                {'team_owner' : {
                    apiUrl: url,
                    emailRegistrationPath: '/team_owners',
                    confirmationSuccessUrl: window.location.href,
                    validateOnPageLoad: false,
                    passwordResetSuccessUrl: url+'/#!/login'
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

    ApiConfig.$inject = ['RestangularProvider'];

    function ApiConfig(RestangularProvider) {
        // RestangularProvider.setBaseUrl('/api');
    }
})();