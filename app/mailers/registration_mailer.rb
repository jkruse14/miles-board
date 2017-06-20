class RegistrationMailer < Devise::Mailer

# helper :application # gives access to all helpers defined within `application_helper`.
# include Devise::Controllers::UrlHelpers # Optional. eg. `confirmation_url`
# default template_path: 'devise/mailer' # to make sure that your mailer uses the devise views

def registration_success(user)
    @user = user
    @url = 'http://localhost:8000/#login'
    puts @user.inspect
    mail(to:@user.email, subject:'Miles Board New Account Verification')
end

end
