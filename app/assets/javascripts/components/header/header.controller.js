(function(){
    'use strict';

    angular
        .module('milesBoard')
        .controller('HeaderController',HeaderController);
    
    HeaderController.$inject = ['$auth','$document','$localStorage','$rootScope','$state','$uibModal'];

    function HeaderController($auth, $document, $localStorage, $rootScope, $state, $uibModal) {
        let ctrl = this;
        
        ctrl.showLoginLink = $localStorage.user ? false : true;
        
        ctrl.nav = [
            { uiSref: 'home', display: 'Home' },
            { uiSref: 'teams', display: 'Teams' },
        ];

        ctrl.showLoginModal = showLoginModal;
        ctrl.logout = logout;

        $rootScope.$on('auth:login-success', function(){
            ctrl.showLoginLink = false;
        });

        $rootScope.$on('auth:logout-success', function () {
            ctrl.showLoginLink = true;
        });

        function showLoginModal(parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.page-container ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/modals/LoginModal/_loginModal.html',
                controller: 'LoginModalController',
                controllerAs: 'vm',
                size: 'lg',
                appendTo: parentElem,
                // resolve: {
                //     items: function () {
                //         return vm.items;
                //     }
                // }
            });

            modalInstance.result.then(function (result) {
                
            })
        };

        function logout() {
            $auth.signOut()
                .then(
                    function(resp){
                        $localStorage.$reset();
                        ctrl.showLoginLink = true;
                        $state.go('home');
                    },
                    function(resp){
                        $localStorage.$reset();
                        $state.go('home');
                        ctrl.showLoginLink = true;
                        console.error(resp);
                    });
        }
    }
})();