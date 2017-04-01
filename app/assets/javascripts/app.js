angular.module('myApp', [
    'ui.router',
    'templates',
])
.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: "components/home/_home.html",
                controller: 'MainController',

            })
    }]);