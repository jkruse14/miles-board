(function(){
    'use strict';

    angular
        .module('milesBoard')
        .controller('HeaderController',HeaderController);
    
    HeaderController.$inject = ['$auth','$document','$localStorage','$rootScope','$state','$uibModal'];

    function HeaderController($auth, $document, $localStorage, $rootScope, $state, $uibModal) {
        let vm = this;
        
        vm.showLoginLink = $localStorage.user ? false : true;
        let user_id = vm.showLoginLink ? null : $localStorage.user.id;

        vm.site_nav = [
            { uiSref: 'home', display: 'Home', icon: 'fa-road' },
            { uiSref: 'teams', display: 'Teams', icon:'fa-group' },
        ];


        vm.user_nav = [
            { uiSref: 'user({userId: '+user_id+'})', display: 'Profile', show: !vm.showLoginLink, icon: 'fa-user-circle-o' },
            { click: vm.showLoginModal, display:'Login', show:vm.showLoginLink, icon: 'fa-sign-in'},
            { click: vm.logout, display: 'Logout', show: !vm.showLoginLink, icon: 'fa-sign-out' }
        ]

        vm.showLoginModal = showLoginModal;
        vm.logout = logout;

        $rootScope.$on('auth:login-success', function(){
            vm.showLoginLink = false;
        });

        $rootScope.$on('auth:logout-success', function () {
            vm.showLoginLink = true;
        });

        function profileClick() {
            $state.go('users',user_id)
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
                        vm.showLoginLink = true;
                        $state.go('home');
                    },
                    function(resp){
                        $localStorage.$reset();
                        $state.go('home');
                        vm.showLoginLink = true;
                        console.error(resp);
                    });
        }
    }
})();