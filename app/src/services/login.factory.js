(function(){
    'use strict'

    angular
        .module('milesBoard')
        .factory('LoginFactory', LoginFactory);

    LoginFactory.$inject = ['$auth', '$localStorage', '$state', '$window', 'Flash', 
                            'InvitationCodesApi', 'Restangular', 'UsersApi']

    function LoginFactory($auth, $localStorage, $state, $window, Flash, 
                          InvitationCodesApi, Restangular, UsersApi) {
        let self = this;

        self.PW_CONF_MSG = {
            MATCH: { text: 'They match!', className: 'pwMatch' },
            NO_MATCH: { text: 'Your passwords do not match...', className: 'pwNoMatch' }
        }

        self.templateUrls = {
            loginForm: "'components/login/_loginForm.html'",
            registerForm: "'components/login/_registerForm.html'",
            resentConfirmationEmail: "'components/login/_resentConfirmationEmail.html'",
            resetPassword: "'components/login/_resetPassword.html'",
        }

        self.handleLogin = handleLogin;
        self.handleSubmitRegistration = handleSubmitRegistration;
        self.resendEmailConfirmation = resendEmailConfirmation;
        self.resetFocusedField = resetFocusedField;
        self.setFocusedField = setFocusedField;
        self.resetPassword = resetPassword;
        self.updatePassword = updatePassword;

        

        function handleLogin(user_info, success, fail) {
            Flash.clear();
            $auth.submitLogin(user_info)
                .then(success, fail);
        }

        function handleSubmitRegistration(user_info, isOwner, registrationSuccess, registrationFail) {
            Flash.clear();
            let new_user = {
                first_name: user_info.first_name,
                last_name: user_info.last_name,
                password: user_info.reg_password,
                password_confirmation: user_info.password_confirmation,
                email: user_info.reg_email
            }

            let auth_config = isOwner ? 'team_owner' : 'user';
            if (isOwner) {
                InvitationCodesApi.get(user_info.owner_confirmation_code).then(function (response) {
                    response = response.plain();
                    if (response.email === user_info.email && response.used === false) {
                        user_info.code_id = response.id;
                        $auth.submitRegistration(new_user, { config: auth_config })
                            .then(registrationSuccess, registrationFail);
                    } else {
                        let message = 'There was an error with your code: </br>'
                        if (user_info.email !== response.email) {
                            message += 'email associated with code does not match above'
                        } else if (response.used === true) {
                            message += 'this code was already used'
                        }

                        Flash.create('warning', message, 0, { container: 'index_flash' }, true);
                    }
                })
            } else {
                $auth.submitRegistration(new_user, { config: auth_config })
                    .then(registrationSuccess, registrationFail);
            }
        }

        function resendEmailConfirmation(user_info) {
            Restangular.all('users').customGET('resend_confirmation', { email: user_info.resend_email })
                .then(registrationSuccess(resp),
                function (resp) {
                    let message = 'Whoops... something went wrong while sending your confirmation email'
                    Flash.create('danger', message, 0, { container: 'regform_flash' }, true);
                    vm.registered = true;
                });
        }

        function resetUserInfo(email) {
            email !== undefined ? email : '';
            
            return  {
                        first_name: '',
                        last_name: '',
                        password: '',
                        password_confirmation: '',
                        email: email
                    };
        }

        function setFocusedField(form, field, fields) {
            fields[form][field] = true;
            return fields;
        }

        function resetFocusedField() {
            return {
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
            let u = { email: user.reset_email }
            $auth.requestPasswordReset(u)
                .then(function (resp) {
                    let message = "Success!<br />An email has been sent to reset your password"
                    Flash.create('success', message, 0, { container: 'profile_flash' }, true)
                })
                .catch(function (resp) {
                    // handle error response
                    MilesBoardApi.errorReader(error);
                });
        }

        function updatePassword(user_info, loginSuccess, loginFail) {
            Flash.clear();
            let message = 'Updating...'
            Flash.create('info', message, 0, { container: 'reset_form' }, true)
            $auth.updatePassword({
                password: user_info.update_password,
                password_confirmation: user_info.password_confirmation,
                email: user_info.update_email,
                reset_password_token: $state.params['reset_token']
            })
                .then(function (resp) {
                    // handle success response
                    Flash.clear();
                    $auth.submitLogin(user_info)
                        .then(loginSuccess, loginFail)
                })
                .catch(function (resp) {
                    // handle error response
                    Flash.clear();
                    let message = "Whoops... There seems to have been an error updating your password. <br />Please try again or request a new email to be sent";
                    Flash.create('danger', message, 0, { container: 'reset_form' }, true)
                });
        }

        return self;
    }
})()