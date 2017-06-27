(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('LoginModalController', LoginModalController);

    LoginModalController.$inject = ['$auth', '$controller', '$localStorage', '$scope', '$state', '$uibModalInstance', 'Flash', 'MilesBoardApi', 'InvitationCodesApi', 'Restangular', 'UsersApi']

    function LoginModalController($auth, $controller, $localStorage, $scope, $state, $uibModalInstance, Flash, MilesBoardApi, InvitationCodesApi, Restangular, UsersApi){
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
            Flash.clear();
            let new_user = {
                first_name: vm.user_info.first_name,
                last_name: vm.user_info.last_name,
                password: vm.user_info.password,
                password_confirmation: vm.user_info.password_confirmation,
                email: vm.user_info.email
            }

            let auth_config = vm.isOwner ? 'team_owner' : 'user';
            if (vm.isOwner) {
                InvitationCodesApi.get(vm.user_info.owner_confirmation_code).then(function (response) {
                    response = response.plain();
                    if (response.email === vm.user_info.email && response.used === false) {
                        vm.user_info.code_id = response.id;
                        $auth.submitRegistration(new_user, { config: auth_config })
                            .then(registrationSuccess, registrationFail);
                    } else {
                        let message = 'There was an error with your code: </br>'
                        if (vm.user_info.email !== response.email) {
                            message += 'email associated with code does not match above'
                        } else if (response.used === true) {
                            message += 'this code was already used'
                        }

                        Flash.create('warning', message, 0, { container: 'regform_flash' }, true);
                    }
                })
            } else {
                $auth.submitRegistration(new_user, { config: auth_config })
                    .then(registrationSuccess, registrationFail);
            }
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

            InvitationCodesApi.put(vm.user_info.code_id, { used: true });
        }

        function registrationFail(resp) {
            let message = 'Whoops... something went wrong while submitting your registration'
            message += MilesBoardApi.errorReader(resp.data);
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