(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('LoginController', LoginController);
    
    LoginController.$inject = ['$auth', '$localStorage', '$scope', '$state', 'Restangular', 'UsersApi'];

    function LoginController($auth, $localStorage, $scope, $state, Restangular, UsersApi) {
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
        vm.registraionSuccess = registraionSuccess;
        vm.registrationFail = registrationFail;
        vm.resendEmailConfirmation = resendEmailConfirmation;

        function onInit(){
            vm.user_info = {
                first_name: '',
                last_name: '',
                password: '',
                password_confirmation: '',
                email: ''
            };

            vm.tab = 0;
            vm.isOwner = false;
        }

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
            switch(vm.tab) {
                case 0:
                    handleLogin();
                    break;
                case 1:
                    handleSubmitRegistration();
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
            });
            $state.go('user',{userId: resp.id})
        }

        function loginFail(resp) {

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

            $auth.submitRegistration(new_user, {config: auth_config})
                .then(vm.registraionSuccess, vm.registrationFail);
        }

        function registraionSuccess(resp) {

        }

        function registrationFail(resp) {

        }

        function resendEmailConfirmation() {
           Restangular.all('users').customGET('resend_confirmation',{email: vm.user_info.email})
        }
    }

})();