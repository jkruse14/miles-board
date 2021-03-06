import loginForm from './_loginForm.html';
import regForm from './_registerForm.html';
import resetPwForm from './_resetPassword.html';
import updatePwForm from './_updatePassword.html';
import resendConfForm from './_resendConfirmationEmail.html';

(function() {
    'use strict';

    angular
        .module('milesBoard')
        .run()
        .controller('LoginController', LoginController);
    
    LoginController.$inject = ['$rootScope','$state','$localStorage','$window', 'Flash','LoginFactory', 'MilesBoardApi'];

function LoginController($rootScope, $state, $localStorage, $window, Flash, LoginFactory, MilesBoardApi) {
        let vm = this;

        let PW_CONF_MSG = {
            MATCH: {text: 'They match!', className: 'pwMatch'},
            NO_MATCH: {text: 'Your passwords do not match...', className: 'pwNoMatch'}
        }

        vm.$onInit = onInit;
        vm.setTab = setTab;
        vm.handleSubmitClick = handleSubmitClick;
        vm.resetFocusedField = resetFocusedField;
        vm.setFocusedField = setFocusedField;
        vm.updatePassword = updatePassword;

        function onInit(){
            //redirect home if already logged in
            if($localStorage.user) {
                $state.go('home');
            }

            vm.inModal = false;
            vm.submitting = false;
            vm.registered = false;

            vm.loginForm = loginForm;
            vm.regForm = regForm;
            vm.resetPwForm = resetPwForm;
            vm.resendConfForm = resendConfForm;
            vm.updatePwForm = updatePwForm;

            resetUserInfo()

            vm.tab = 0;
            vm.isOwner = false;

            if($state.params['reset_token']) {
                setTab(4)
                vm.hideAllTabs = true;
                let message = "Please complete the below to reset your password"
                Flash.create('info', message, 0, {container: 'login_flash'}, false);
            }

            vm.focused_field = LoginFactory.resetFocusedField();
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
                    LoginFactory.handleLogin();
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

        function setFocusedField(form, field) {
            vm.focused_field = LoginFactory.setFocusedField(form, field, vm.focused_field);
        }

        function resetFocusedField() {
            vm.focused_field = LoginFactory.resetFocusedField();
        }

        function loginSuccess(resp) {
            MilesBoardApi.UsersApi.get(resp.id).then(function(response) {
                $localStorage.user = response.user;
                $localStorage.user.team_ids = [];
                for(let i = 0; i < $localStorage.user.teams.length; i++) {
                    $localStorage.user.team_ids.push($localStorage.user.teams[i].id);
                }
                vm.submitting = false;
                $rootScope.$broadcast('auth:user-loaded', response.user.id)
                $state.go('user', { userId: resp.id }, { reload: true });
            });
        }

        function updatePassword() {
            LoginFactory.updatePassword(vm.user_info, loginSuccess, loginFail);
        }

        function loginFail(resp) {
            Flash.create('danger', 'Login Error: '+resp.errors, 0, {container: 'login_flash'}, true)
        }

        function registrationSuccess(resp) {
            let email = vm.user_info.email
            let message = 'Success!<br /> A confirmation email has been sent to ' + vm.user_info.email;
            let container = 'regform_flash';
            if(vm.tab === 2) {
                container = 'resendform_flash'
            }
            Flash.create('success', message, 0, {container: container}, true);
            vm.registered = true;
            vm.submitting = false;

            InvitationCodesApi.put(vm.user_info.code_id, {used: true});
        }

        function registrationFail(resp) {
            let message = 'Whoops... something went wrong while submitting your registration'
            message += MilesBoardApi.errorReader(resp.data);
            Flash.create('danger', message, 0, { container: 'regform_flash' }, true);
            vm.submitting = false;
        }

    }
})();