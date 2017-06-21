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
            'ngStorage'
        ])
    //     .config(EnvironmentConfig)
    //     .config(authConfig);

    // authConfig.$inject = ['$authProvider'];

    // /** @ngInject */
    // function authConfig($authProvider) {
    //     $authProvider.configure(
    //         [{
    //             'default': {
    //                 apiUrl: 'http://localhost:8000',
    //                 emailRegistrationPath: '/users',
    //                 validateOnPageLoad: true,
    //             },
    //             'user': {
    //                 apiUrl: 'http://localhost:8000',
    //                 emailRegistrationPath: '/users',
    //                 validateOnPageLoad: true,
    //             },
    //             'team_owner': {
    //                 apiUrl: 'http://localhost:8000',
    //                 emailRegistrationPath: '/team_owners',
    //                 validateOnPageLoad: true,
    //             }
    //         }]
    //     );
    // }

    // EnvironmentConfig.$inject = ['envServiceProvider'];

    // /** @ngInject */
    // function EnvironmentConfig(envServiceProvider) {
    //     envServiceProvider.config({
    //         domains: {
    //             development: ['localhost'],
    //             production: ['miles-board.herokuapp.com']
    //         },
    //         vars: {
    //             development: {
    //                 apiUrl: 'http://localhost:8000'
    //             },
    //             production: {
    //                 apiUrl: 'https://miles-board.herokuapp.com'
    //             },
    //         }
    //     })

    //     envServiceProvider.check();
    // }
})();