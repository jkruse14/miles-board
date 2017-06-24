(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('LoginModalController', LoginModalController);

    LoginModalController.$inject = ['$auth','$controller', '$localStorage', '$scope','$state','$uibModalInstance', 'UsersApi']

    function LoginModalController($auth, $controller, $localStorage, $scope, $state, $uibModalInstance, UsersApi){
        let vm = this;
        angular.extend(vm, $controller('LoginController', { $scope: $scope }));

        vm.user_info = {
            first_name: '',
            last_name: '',
            password: '',
            password_confirmation: '',
            email: ''
        };

        vm.handleSubmitClick = handleSubmitClick;
        vm.handleLogin = handleLogin;
        vm.handleCancel = handleCancel;
        vm.handleSubmitRegistration = handleSubmitRegistration;

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

        function handleSubmitRegistration() {
            let new_user = {
                first_name: vm.user_info.first_name,
                last_name: vm.user_info.last_name,
                password: vm.user_info.password,
                password_confirmation: vm.user_info.password_confirmation,
                email: vm.user_info.email
            }

            let auth_config = vm.isOwner ? 'team_owner' : 'user';

            $auth.submitRegistration(new_user, { config: auth_config })
                .then(vm.registraionSuccess, vm.registrationFail);
        }
    }

})();