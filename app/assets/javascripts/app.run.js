(function () {
    'use strict';

    angular
        .module('milesBoard')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $auth, $rootScope, $location, $state, $http,
        $cacheFactory, clientPayment, CacheService, fitsappApi) {
        $http.defaults.cache = CacheService.cacheService;

        $rootScope.$on('auth:login-success', (ev, user) => {
            getNextPath();
        });

        $rootScope.$on('auth:invalid', (ev, reason) => {
            console.error(['Invalid login', ev, reason[0]]);
        });

        $rootScope.$on('auth:session-expired', function (ev, reason) {
            //alert('Login Failed: '+reason);
            console.error(['session-expired', ev, reason[0]]);
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
            console.log(['validation-error', ev, reason]);
            //NO ALERTS! this takes full command of the browser -> bad user experience
            //TODO: use modal service instead
            //alert('Validation Error: '+reason.errors[0]);
        });

        $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
            if (CacheService.exerciseCache && CacheService.exerciseCache.info().size === 0) {
                fitsappApi.exercisesApi.fillExercisesCache();
            }
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
