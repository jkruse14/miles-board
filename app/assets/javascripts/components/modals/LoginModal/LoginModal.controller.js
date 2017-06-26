(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('LoginModalController', LoginModalController);

    LoginModalController.$inject = ['$auth','$controller', '$localStorage', '$scope','$state','$uibModalInstance', 'UsersApi']

    function LoginModalController($auth, $controller, $localStorage, $scope, $state, $uibModalInstance, UsersApi){
        let vm = this;
        vm.inModal = true;
        vm.submitting = false;
        
        vm.focused_field = {
            loginForm: {
                email: false,
                password: false
            },
            newMemberForm: {
                email: false,
                first_name: false,
                last_name: false,
                password: false,
                password_confirmation: false
            },
            resendEmailForm: {
                email: false
            }
        };
        angular.extend(vm, $controller('LoginController', { $scope: $scope }));

        resetUserInfo();

        vm.setTab = setTab;
        vm.handleSubmitClick = handleSubmitClick;
        vm.handleLogin = handleLogin;
        vm.handleCancel = handleCancel;
        vm.handleSubmitRegistration = handleSubmitRegistration;
        vm.resetFocusedField = resetFocusedField;
        vm.setFocusedField = setFocusedField;

        function setTab(index) {
            vm.tab = index;
            vm.user_info = {
                first_name: '',
                last_name: '',
                password: '',
                password_confirmation: '',
                email: vm.user_info.email
            };
        }

        function handleSubmitClick() {
            vm.submitting = true;
            switch (vm.tab) {
                case 0:
                    handleLogin();
                    break;
                case 1:
                    handleSubmitRegistration();
                    break;
                case 2:
                    resendEmailConfirmation();
                    break;
                default:
                    handleLogin();
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
                vm.submitting = false;
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
                .then(registraionSuccess, registrationFail);
        }

        function registrationSuccess(resp) {
            let email = vm.user_info.email
            let message = 'Success!<br /> A confirmation email has been sent to ' + vm.user_info.email;
            Flash.create('success', message, 5000, { container: 'regform_flash' });
            vm.submitting = false;
            vm.registered = true;
        }

        function registrationFail(resp) {
            let message = 'Whoops... something went wrong while submitting your registration'
            Flash.create('danger', message, 0, { container: 'regform_flash' }, true);
            vm.submitting = false;
        }

        function resendEmailConfirmation() {
            Restangular.all('users').customGET('resend_confirmation', { email: vm.user_info.email })
                .then(registrationSuccess(resp),
                function (resp) {
                    let message = 'Whoops... something went wrong while sending your confirmation email'
                    Flash.create('danger', message, 0, { container: 'regform_flash' }, true);
                    vm.registered = true;
                });
        }

        function setFocusedField(form, field) {
            vm.focused_field[form][field] = true;
        }

        function resetFocusedField() {
            vm.focused_field = {
                loginForm: {
                    email: false,
                    password: false
                },
                newMemberForm: {
                    email: false,
                    first_name: false,
                    last_name: false,
                    password: false,
                    password_confirmation: false
                },
                resendEmailForm: {
                    resend_email: false
                }
            };
        }

        function resetUserInfo() {
            vm.user_info = {
                first_name: '',
                last_name: '',
                password: '',
                password_confirmation: '',
                email: ''
            };
        }
    }

})();