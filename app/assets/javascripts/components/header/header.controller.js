(function(){
    'use strict';

    angular
        .module('milesBoard')
        .controller('HeaderController',HeaderController);
    
    HeaderController.$inject = ['$auth', '$document', '$localStorage', '$rootScope', '$scope','$state','$uibModal'];

    function HeaderController($auth, $document, $localStorage, $rootScope, $scope, $state, $uibModal) {
        let vm = this;
        vm.showLoginLink = $localStorage.user ? false : true;
        let user_id = $localStorage.user ? $localStorage.user.id : null;

        vm.site_nav = [
            { uiSref: 'home', display: 'Home', icon: 'fa-road' },
            { uiSref: 'teams', display: 'Teams', icon:'fa-group' },
        ];

        vm.$onInit = onInit;
        vm.$onChanges = onChanges;
        vm.showLoginModal = showLoginModal;
        vm.logout = logout;

        $rootScope.$on('auth:login-success', function(){
            setUserNav();
        });

        $rootScope.$on('auth:logout-success', function () {
            $localStorage.$reset();
            setUserNav();
        });

        $rootScope.$on('auth.validation-success', function(){
            setUserNav()
        });

        $rootScope.$on('auth.validation-error', function () {
            $localStorage.$reset();
            setUserNav();
        });

        function onInit() {
            setUserNav();
        }

        function onChanges() {
            setUserNav();
        }

        function setUserNav() {
            if(vm.user_nav) {
                vm.user_nav.length = 0;
                vm.user_nav = [];
            }
            vm.user_nav = [
                { uiSref: 'user({userId: ' + user_id + '})', display: 'Profile', show: vm.showLoginLink == false, icon: 'fa-user-circle-o' },
                { click: showLoginModal, display: 'Login', show: vm.showLoginLink === true, icon: 'fa-sign-in' },
                { click: logout, display: 'Logout', show: vm.showLoginLink == false, icon: 'fa-sign-out' }
            ];
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
                        setUserNav()
                        $state.go('home');
                    },
                    function(resp){
                        $localStorage.$reset();
                        setUserNav();
                        $state.go('home');
                        console.error(resp);
                    });
        }
    }
})();