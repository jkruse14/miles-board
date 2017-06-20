(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('LoginController', LoginController);
    
    LoginController.$inject = ['$auth', '$localStorage', '$scope', '$state', 'UsersApi'];

    function LoginController($auth, $localStorage, $scope, $state, UsersApi) {
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

        vm.user_info = {
            first_name: '',
            last_name: '',
            password: '',
            password_confirmation: '',
            email: ''
        };

        vm.$onInit = onInit;
        vm.setTab = setTab;
        vm.handleSubmitClick = handleSubmitClick;

        function onInit(){
            vm.tab = 0;
            vm.isOwner = false;
        }

        function setTab(index) {
            vm.tab = index;
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
                .then(loginSuccess, loginFail)
        }

        function loginSuccess(resp) {
            UsersApi.service.get(resp.id).then(function(response) {
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
                .then(registraionSuccess, registrationFail);
        }

        function registraionSuccess(resp) {

        }

        function registrationFail(resp) {

        }

    }

})();