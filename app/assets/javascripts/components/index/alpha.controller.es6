(function(){
    'use strict';

    angular
        .module('milesBoard')
        .run()
        .controller('AlphaController', AlphaController);

    AlphaController.$inject = ['$localStorage', '$state', '$rootScope', 'Flash'];

    function AlphaController($localStorage, $state, $rootScope, Flash) {
        let vm = this;

        $rootScope.$on('auth:logout-success', function () {
            $localStorage.$reset();
            $localStorage.user_nav = 'show-login';
            $state.go($state.current, {}, { reload: true });
        });

        $rootScope.$on('auth.validation-error', function () {
            $localStorage.$reset();
            $localStorage.user_nav = 'show-login';
        });
    }
})();