(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('LoginModalController', LoginModalController);

    LoginModalController.$inject = ['$auth','$controller', '$localStorage', '$scope','$state','$uibModalInstance', 'UsersApi']

    function LoginModalController($auth, $controller, $localStorage, $scope, $state, $uibModalInstance, UsersApi){
        let vm = this;
        angular.extend(vm, $controller('LoginController', { $scope: $scope }));

        vm.handleSubmitClick = handleSubmitClick;
        vm.handleLogin = handleLogin;
        vm.handleCancel = handleCancel;

        function handleSubmitClick() {
            switch (vm.tab) {
                case 0:
                    vm.handleLogin();
                    break;
                case 1:
                    vm.handleSubmitRegistration();
                    break;
                default:
                    vm.handleLogin();
                    break;
            }
        }

        function handleLogin() {
            $auth.submitLogin(vm.user_info)
                .then(loginSuccess, vm.loginFail)
        }

        function loginSuccess(resp) {
            UsersApi.get(resp.id).then(function (response) {
                $localStorage.user = response.user;
                handleCancel();
            });
            $state.go('user', { userId: resp.id })
        }

        function handleCancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }

})();