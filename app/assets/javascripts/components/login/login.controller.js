(function() {
    'use strict';

    angular
        .module('milesBoard')
        .run()
        .controller('LoginController', LoginController);
    
    LoginController.$inject = ['$auth', '$localStorage', '$scope', '$state', '$window', 'Flash', 'InvitationCodesApi', 'Restangular', 'UsersApi'];

    function LoginController($auth, $localStorage, $scope, $state, $window, Flash, InvitationCodesApi, Restangular, UsersApi) {
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
        vm.resetPassword = resetPassword;
        vm.updatePassword = updatePassword;

        function onInit(){
            vm.inModal = false;
            vm.submitting = false;
            vm.registered = false;
            resetUserInfo()

            vm.tab = 0;
            vm.isOwner = false;

            if($state.params['reset_token']) {
                vm.setTab(4)
                vm.hideAllTabs = true;
                let message = "Please complete the below to reset your password"
                Flash.create('info', message, 0, {container: 'login_flash'}, false);
            }

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
                case 3: 
                    resetPassword(user_info);
                    break;
                default:
                    handleLogin();
                    break;
            } 
        }

        function handleLogin() {
            
            $auth.submitLogin(vm.user_info)
                .then(vm.loginSuccess, vm.loginFail);
        }

        function loginSuccess(resp) {
            UsersApi.get(resp.id).then(function(response) {
                $localStorage.user = response.user;
                vm.submitting = false;
            });
            $state.go('user',{userId: resp.id, reset: true})
            $window.location.reload();
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
            if(vm.isOwner) {
                InvitationCodesApi.get(vm.user_info.owner_confirmation_code).then(function (response){
                    response = response.plain();
                    if(response.email === vm.user_info.email && response.used === false) {
                        vm.user_info.code_id = response.id;
                        $auth.submitRegistration(new_user, { config: auth_config })
                            .then(vm.registrationSuccess, vm.registrationFail);
                    } else {
                        let message = 'There was an error with your code: </br>'
                        if(vm.user_info.email !== response.email) {
                            message += 'email associated with code does not match above'
                        } else if( response.used === true) {
                            message += 'this code was already used'
                        }

                        Flash.message('warning',message,0,{container:'regform_flash'}, true);
                    }
                })
            } else {
                $auth.submitRegistration(new_user, {config: auth_config})
                    .then(vm.registrationSuccess, vm.registrationFail);
            }
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
                },
                resetPasswordForm: {
                    email: false
                },
                updatePasswordForm: {
                    email: false,
                    password: false,
                    password_confirmation: false                    
                }
            };
        }

        function resetPassword(user) {
            Flash.clear();
            let u = {email: user.email}
            $auth.requestPasswordReset(u)
                .then(function (resp) {
                    let message = "Success!<br />An email has been sent to reset your password"
                    Flash.create('success', message, 0, { container: 'profile_flash' }, true)
                })
                .catch(function (resp) {
                    // handle error response
                    MilesBoardImages.errorReader(error);
                });
        }

        function updatePassword() {
            Flash.clear();
            let message = 'Updating...'
            Flash.create('info', message, 0, {container: 'reset_form'}, true)
            $auth.updatePassword({ password: vm.user_info.password, 
                                   password_confirmation: vm.user_info.password_confirmation,
                                   email: vm.user_info.email,
                                   reset_password_token: $state.params['reset_token']})
                .then(function (resp) {
                    // handle success response
                    Flash.clear();
                    $auth.submitLogin(vm.user_info)
                        .then(vm.loginSuccess, vm.loginFail)
                })
                .catch(function (resp) {
                    // handle error response
                    Flash.clear();
                    let message = "Whoops... There seems to have been an error updating your password. <br />Please try again or request a new email to be sent";
                    Flash.create('danger',message, 0, {container: 'reset_form'}, true)
                });
        }
    }
})();