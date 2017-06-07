angular.module('milesBoard', [
    'restangular',
    'ui.router',
    'templates',
    
])
.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        var homeState = {
            name: 'home',
            url: '/home',
            templateUrl: 'components/home/_home.html',
            controller: 'MainController',
        }

        var boardState = {
            name:'board',
            url: '/teams/:teamId',
            templateUrl: 'components/teams/_teams.html',
            controller: 'TeamsController as vm',
            resolve: {
                team: function (TeamsApi, $stateParams) {
                        return TeamsApi.get($stateParams.teamId);
                }
            }
        }

        // w/o state param team id, show users' teams
        var teamsState = {
            name: 'user',
            url: '/users/:userId',
            templateUrl: 'components/users/_users.html',
            controller: 'UsersController as vm',
            //component: 'teams',
            resolve: {
                user: function (UsersApi, $stateParams) {
                    return UsersApi.service.get($stateParams.userId);
                }
            }
        }

        $stateProvider.state(homeState);
        $stateProvider.state(boardState);
        $stateProvider.state(teamsState);
    }]);