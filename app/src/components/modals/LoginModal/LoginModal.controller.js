import loginForm from '../../login/_loginForm.html';
import regForm from '../../login/_registerForm.html';
import resetPwForm from '../../login/_resetPassword.html';
import updatePwForm from '../../login/_updatePassword.html';
import resendConfForm from '../../login/_resendConfirmationEmail.html'; 

(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('LoginModalController', LoginModalController);

    LoginModalController.$inject = ['$state', '$localStorage', '$uibModal', '$uibModalInstance', '$window', 'Flash', 'LoginFactory', 'MilesBoardApi']

    function LoginModalController($state, $localStorage, $uibModal, $uibModalInstance, $window, Flash, LoginFactory, MilesBoardApi){
        let vm = this;

        vm.$onInit = onInit;
        vm.setTab = setTab;
        vm.handleSubmitClick = handleSubmitClick;
        vm.handleCancel = handleCancel;
        vm.resetFocusedField = resetFocusedField;
        vm.setFocusedField = setFocusedField;

        function onInit() {
            vm.inModal = true;
            vm.submitting = false;
            vm.loginForm = loginForm;
            vm.regForm = regForm;
            vm.resendConfForm = resendConfForm;
            vm.resetPwForm = resetPwForm;
            vm.updatePwForm = updatePwForm;

            resetFocusedField();
            resetUserInfo();

        }

        function handleSubmitClick() {
            vm.submitting = true;
            switch (vm.tab) {
                case 0:
                    LoginFactory.handleLogin(vm.user_info, loginSuccess, loginFail);
                    break;
                case 1:
                    LoginFactory.handleSubmitRegistration(vm.user_info, vm.isOwner, registrationSuccess, registrationFail);
                    break;
                case 2:
                    LoginFactory.resendEmailConfirmation(vm.user_info);
                    break;
                case 3:
                    LoginFactory.resetPassword(user_info);
                    break;
                default:
                    handleLogin();
                    break;
            }
        }

        function setTab(index) {
            Flash.clear();
            vm.tab = index;
            vm.user_info = {
                first_name: '',
                last_name: '',
                password: '',
                password_confirmation: '',
                email: vm.user_info.email
            };
        }

        function loginSuccess(resp) {
            MilesBoardApi.UsersApi.get(resp.id).then(function (response) {
                $localStorage.user = response.user;
                $localStorage.user.team_ids = [];
                for (let i = 0; i < $localStorage.user.teams.length; i++) {
                    $localStorage.user.team_ids.push($localStorage.user.teams[i].id);
                }
                vm.submitting = false;
                $uibModalInstance.close();
            });
            $state.go('user', { userId: resp.id }, { reload: true });
            $window.location.reload();
        }

        function loginFail(reason) {
            
            Flash.create('danger', 'Login Error: '+reason.errors, 0, { container: 'loginModal_flash' }, true);
        }

        function handleCancel() {
            $uibModalInstance.close('cancel');
        }

        function registrationSuccess(resp) {
            let email = vm.user_info.email
            let message = 'Success!<br /> A confirmation email has been sent to ' + vm.user_info.email;
            let container = 'regform_flash';
            if (vm.tab === 2) {
                container = 'resendform_flash'
            }
            Flash.create('success', message, 5000, { container: container });
            vm.registered = true;
            vm.submitting = false;

            if(vm.user_info.code_id){
                Restangular.all('invitation_codes').customPUT({ code: vm.user_info.owner_confirmation_code, used: true });
            }
        }

        function registrationFail(resp) {
            let message = 'Whoops... something went wrong while submitting your registration'
            message += MilesBoardApi.errorReader(resp.data);
            Flash.create('danger', message, 0, { container: 'index_flash' }, true);
            vm.submitting = false;
        }

        function setFocusedField(form, field) {
            vm.focused_field = LoginFactory.setFocusedField(form, field, vm.focused_field);
        }

        function resetFocusedField() {
            vm.focused_field = LoginFactory.resetFocusedField();
        }

        function resetUserInfo(email) {
            email !== undefined ? email : '';

            vm.user_info = {
                first_name: '',
                last_name: '',
                password: '',
                password_confirmation: '',
                email: email
            };
        }
    }

})();