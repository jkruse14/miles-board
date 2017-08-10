import mainTmpl from './components/main/_main.html';
import homeTmpl from './components/home/_home.html';
import teamsTmpl from './components/teams/_teams.html';
import teamTmpl from './components/teams/_team.html';
import userTmpl from './components/users/_users.html'

(function() {
     'use strict';

    angular
        .module('milesBoard')
        .config(RouterConfig);

    RouterConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    /** @ngInject */
    function RouterConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/', '/home');
        var alphaState = {
            name: 'index',
            abstract:true,
            url: '/',
            templateUrl: mainTmpl,
            controller: 'AlphaController as vm',
        };

        var homeState = {
            name: 'home',
            url: '/home',
            templateUrl: homeTmpl,
            controller: 'MainController',
        };

        var loginState = {
            name: 'login',
            url: '/login?reset_token',
            template: 'components/login/_login.html',
            controller: 'LoginController as vm'
        };

        var teamsState = {
            name: 'teams',
            url: '/teams',
            templateUrl: teamsTmpl,
            controller: 'TeamsController as vm',
            resolve: {
                team: [function(){ return [] }],
                teams: ['TeamsApi', '$stateParams', function (TeamsApi, $stateParams) {
                    return TeamsApi.get('');
                }]
            }
        }

        var teamState = {
            name: 'team',
            url: '/teams/{team_id}',
            templateUrl: teamTmpl,
            controller: 'TeamsController as vm',
            resolve: {
                team: ['TeamsApi', '$stateParams', function (TeamsApi, $stateParams) {
                    return TeamsApi.get($stateParams.team_id);
                }],
                teams: ['TeamsApi', '$stateParams', function (TeamsApi, $stateParams) {
                    return TeamsApi.get('');
                }]
            }
        };

        var userState = {
            name: 'user',
            url: '/users/{userId}?reset',
            templateUrl: userTmpl,
            controller: 'UsersController as vm',
            resolve: {
                user: ['UsersApi', '$stateParams', function (UsersApi, $stateParams) {
                    return UsersApi.get($stateParams.userId);
                }],
                owner: ['TeamOwnersApi', '$stateParams', function (TeamOwnersApi, $stateParams) {
                    return TeamOwnersApi.get($stateParams.userId);
                }],
                auth: ['$auth',function($auth) {
                    return $auth.validateUser();
                }]
            }
        };

        $stateProvider.state(alphaState);
        $stateProvider.state(homeState);
        $stateProvider.state(loginState);
        $stateProvider.state(teamsState);
        $stateProvider.state(teamState);
        $stateProvider.state(userState);
    }

})();