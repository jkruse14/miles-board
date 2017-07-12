// (function() {
//     'use strict';

//     angular
//         .module('milesBoard')
//         .config(envConfig);

//     EnvironmentConfig.$inject = ['envServiceProvider'];

//     function EnvironmentConfig(envServiceProvider) {
//         envServiceProvider.config({
//             domains: {
//                 development: ['localhost'],
//                 production: ['miles-board.herokuapp.com']
//             },
//             vars: {
//                 development: {
//                     apiUrl: 'http://localhost:8000'
//                 },
//                 production: {
//                     apiUrl: 'https://miles-board.herokuapp.com'
//                 },
//             }
//         })

//         envServiceProvider.check();
//     }
// })();