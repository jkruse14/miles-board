(function () {
    'use strict';

    angular
        .module('milesBoard')
        .run(runBlock);

    runBlock.$inject = ['$log', '$auth', '$rootScope', '$localStorage', '$location', '$state', '$http', '$cacheFactory']

    function runBlock($log, $auth, $rootScope, $localStorage, $location, $state, $http, $cacheFactory) {
        $rootScope.$on('$stateChangeError', console.log.bind(console));

        $rootScope.$on('auth:login-success', (ev, user) => {
            $state.go('home');
        });

        $rootScope.$on('auth:invalid', (ev, reason) => {
            $localStorage.$reset();
            console.error('Invalid token', ev);
        });

        $rootScope.$on('auth:session-expired', function (ev, reason) {
            console.error('session-expired', ev, reason[0]);
        });

        $rootScope.$on('auth:validation-success', (ev, user) => {
            if ($location.path() == '') {
                getNextPath();
            }
        });

        $rootScope.$on('auth:login-error', function (ev, reason) {
            console.error('login error:' + reason[0])
            //alert('Login Failed: '+reason);
        });

        $rootScope.$on('auth:validation-error', function (ev, reason) {
            let nextPath = '/login';
            $location.path(nextPath);
            console.error('validation-error', ev, reason);
        });

        function getNextPath() {
            let nextPath = '/home';
            if ($localStorage.user) {
                nextPath = '/home';
                $location.path(nextPath);
            } else {
                nextPath = '/login';
                $location.path(nextPath);
            }
        }
    }

})();
