(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('LoginController', LoginController);
    
    LoginController.$inject = ['$auth', '$localStorage', '$scope', '$state', 'Flash', 'Restangular', 'UsersApi'];

    function LoginController($auth, $localStorage, $scope, $state, Flash, Restangular, UsersApi) {
        let vm = this;

        let PW_CONF_MSG = {
            MATCH: {text: 'They match!', className: 'pwMatch'},
            NO_MATCH: {text: 'Your passwords do not match...', className: 'pwNoMatch'}
        }

        let loginFormUrl = "'components/login/_loginForm.html'";
        let registerFormUrl = "'components/login/_registerForm.html'";

        vm.tabs = [{title:'Login', 
                    content: '<ng-include src="'+loginFormUrl+'"></ng-include>'}, 
                   {title: 'Register',
                    content:'<ng-include src="'+registerFormUrl+'"></ng-include>'}];

        vm.$onInit = onInit;
        vm.setTab = setTab;
        vm.handleSubmitClick = handleSubmitClick;
        vm.handleLogin = handleLogin;
        vm.handleSubmitRegistration = handleSubmitRegistration;
        vm.loginSuccess = loginSuccess;
        vm.loginFail = loginFail;
        vm.registrationSuccess = registrationSuccess;
        vm.registrationFail = registrationFail;
        vm.resendEmailConfirmation = resendEmailConfirmation;
        vm.resetFocusedField = resetFocusedField;
        vm.setFocusedField = setFocusedField;

        function onInit(){
            vm.inModal = false;
            vm.submitting = false;
            resetUserInfo()

            vm.tab = 0;
            vm.isOwner = false;

            resetFocusedField();
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

        function handleSubmitClick() {
            vm.submitting = true;
            switch(vm.tab) {
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
                .then(vm.loginSuccess, vm.loginFail)
        }

        function loginSuccess(resp) {
            UsersApi.get(resp.id).then(function(response) {
                $localStorage.user = response.user;
                vm.submitting = false;
            });
            $state.go('user',{userId: resp.id})
        }

        function loginFail(resp) {

        }

        function handleSubmitRegistration() {
            Flash.clear();
            let new_user = {
                first_name: vm.user_info.first_name,
                last_name: vm.user_info.last_name,
                password: vm.user_info.password,
                password_confirmation: vm.user_info.password_confirmation,
                email: vm.user_info.email
            }

            let auth_config = vm.isOwner ? 'team_owner' : 'user';

            $auth.submitRegistration(new_user, {config: auth_config})
                .then(vm.registrationSuccess, vm.registrationFail);
        }

        function registrationSuccess(resp) {
            let email = vm.user_info.email
            let message = 'Success!<br /> A confirmation email has been sent to ' + vm.user_info.email;
            let container = 'regform_flash';
            if(vm.tab === 2) {
                container = 'resendform_flash'
            }
            Flash.create('success', message, 5000, {container: container});
            vm.registered = true;
            vm.submitting = false;
        }

        function registrationFail(resp) {
            let message = 'Whoops... something went wrong while submitting your registration'
            Flash.create('danger',message,0,{container: 'regform_flash'}, true);
            vm.submitting = false;
        }

        function resendEmailConfirmation() {
           Restangular.all('users').customGET('resend_confirmation',{email: vm.user_info.email})
            .then(registrationSuccess(resp),
                function(resp){
                    let message = 'Whoops... something went wrong while sending your confirmation email'
                    Flash.create('danger', message, 0, { container: 'regform_flash' }, true);
                    vm.registered = true;
                });
        }

        function resetUserInfo() {
            let email = '';
            if (vm.user_info && vm.user_info.email) {
                email = vm.user_info.email;
            }
            vm.user_info = {
                first_name: '',
                last_name: '',
                password: '',
                password_confirmation: '',
                email: email
            };
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
                    email: false
                }
            };
        }
    }

})();