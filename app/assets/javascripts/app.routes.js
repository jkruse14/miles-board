(function() {
    'use strict';

    angular
        .module('milesBoard')
        .config(RouterConfig)

    RouterConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    /** @ngInject */
    function RouterConfig($stateProvider, $urlRouterProvider) {

                var alphaState = {
                    name: 'index',
                    url: '/',
                    templateUrl: 'components/index/_index.html',
                    controller: 'AlphaController as vm',
                    resolve: {
                        auth: function ($auth) {
                            return $auth.validateUser();
                        }
                    }
                }

                var homeState = {
                    name: 'index.home',
                    url: '/home',
                    templateUrl: 'components/home/_home.html',
                    controller: 'MainController',
                }

                var loginState = {
                    name: 'login',
                    url: '/login',
                    templateUrl: 'components/login/_login.html',
                    controller: 'LoginController as vm'
                }

                var teamState = {
                    name: 'team',
                    url: '/teams/:team_id',
                    templateUrl: 'components/teams/_teams.html',
                    controller: 'TeamsController as vm',
                    resolve: {
                        team: function (TeamsApi, $stateParams) {
                            return TeamsApi.get($stateParams.team_id);
                        }
                    }
                }

                var userState = {
                    name: 'user',
                    url: '/users/:userId',
                    templateUrl: 'components/users/_users.html',
                    controller: 'UsersController as vm',
                    resolve: {
                        user: function (UsersApi, $stateParams) {
                            return UsersApi.service.get($stateParams.userId);
                        }
                    }
                }

                $stateProvider.state(alphaState);
                $stateProvider.state(homeState);
                $stateProvider.state(loginState);
                $stateProvider.state(teamState);
                $stateProvider.state(userState);
            }

})();