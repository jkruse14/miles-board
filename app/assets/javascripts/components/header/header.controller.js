(function(){
    'use strict';

    angular
        .module('milesBoard')
        .controller('HeaderController',HeaderController);
    
    HeaderController.$inject = ['$auth', '$document', '$localStorage', '$rootScope', '$scope','$state','$uibModal', '$window'];

    function HeaderController($auth, $document, $localStorage, $rootScope, $scope, $state, $uibModal, $window) {
        let vm = this;

        

        vm.site_nav = [
            { uiSref: 'home', display: 'Home', icon: 'fa-road' },
            { uiSref: 'teams', display: 'Teams', icon:'fa-group' },
        ];

        vm.$onInit = onInit;
        vm.showLoginModal = showLoginModal;
        vm.logout = logout;

        $rootScope.$on('auth:login-success', function () {
            $localStorage.user_nav = 'show-logout';
            vm.showLogoutLink = true;
            vm.user_id = $localStorage.user ? $localStorage.user.id : null;
        });

        $rootScope.$on('auth.validation-success', function () {
            vm.user_id = $localStorage.user.id
        });

        function onInit() {
            vm.showLogoutLink = $localStorage.user ? true : false;
            
            vm.user_id = $localStorage.user ? $localStorage.user.id : null;
        }

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
                        $state.go('home')
                        $window.location.reload();
                    },
                    function(resp){
                        $localStorage.$reset();
                        $state.go('home', {}, { reload: true });
                        $window.location.reload();
                        console.error(resp);
                    });
        }
    }
})();