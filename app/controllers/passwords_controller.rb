class PasswordsController < Devise::PasswordsController
  before_action :set_user_by_token, only: [:update]
  skip_after_action :update_auth_header, only: %i(create edit)

  # this action is responsible for generating password reset tokens and
  # sending emails
  def create
    return render_create_error_missing_email unless resource_params[:email]

    # give redirect value from resource_params priority
    @redirect_url = resource_params[:redirect_url]
    # fall back to default value if provided
    @redirect_url ||= DeviseTokenAuth.default_password_reset_url

    return render_create_error_missing_redirect_url unless @redirect_url

    # if whitelist is set, validate redirect_url against whitelist
    if DeviseTokenAuth.redirect_whitelist
      unless DeviseTokenAuth::Url.whitelisted?(@redirect_url)
        return render_create_error_not_allowed_redirect_url
      end
    end

    # honor devise configuration for case_insensitive_keys
    @email = if resource_class.case_insensitive_keys.include?(:email)
               resource_params[:email].downcase
             else
               resource_params[:email]
             end

    q = "uid = ? AND provider='email'"

    # fix for mysql default case insensitivity
    if ActiveRecord::Base.connection.adapter_name.downcase.starts_with? 'mysql'
      q = "BINARY uid = ? AND provider='email'"
    end

    @resource = resource_class.where(q, @email).first

    @errors = nil
    @error_status = 400

    if @resource
      yield @resource if block_given?
      @resource.send_reset_password_instructions(email: @email,
                                                 provider: 'email',
                                                 redirect_url: @redirect_url,
                                                 client_config: resource_params[:config_name])

      if @resource.errors.empty?
        render(json: { message: 'password reset email sent' }, status: :OK) && return
      else
        @errors = @resource.errors
      end
    else
      @errors = [I18n.t('devise_token_auth.passwords.user_not_found', email: @email)]
      @error_status = 404
    end

    return render_create_error if @errors
  end

  # GET /resource/password/edit?reset_password_token=abcdef
  def edit
    self.resource = resource_class.new
    set_minimum_password_length
    resource.reset_password_token = params[:reset_password_token]
    # after_sending_reset_password_instructions_path_for(self.resource, params[:reset_password_token])
    redirect_to params[:redirect_url]
  end

  # PUT /resource/password
  def update
    self.resource = resource_class.reset_password_by_token(resource_params)#User.find_by_email(resource_params[:email])
    
    yield resource if block_given?
    puts resource.errors.inspect
    if resource.errors.messages.empty?
      resource.unlock_access! if unlockable?(resource)
      if Devise.sign_in_after_reset_password
        flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
        set_flash_message!(:notice, flash_message)
        sign_in(resource_name, resource)
      else
        set_flash_message!(:notice, :updated_not_active)
      end
      render json: resource, status: 200 && return
    else
      set_minimum_password_length
      render json: resource && return
    end
  end

  protected
  # def after_sending_reset_password_instructions_path_for(resource_name, token)
  #   puts resource_name.inspect
  #   #Devise.sign_in_after_reset_password ? 'http://localhost:8000/#!/login' : 'http://localhost:8000/#!/login'
  #   redirect_to 'http://localhost:8000/#!/login?reset_token='
  # end

  def after_resetting_password_path_for(resource) 
    redirect_to root_path + '#!/users/' + resource.id.to_s
  end

  def resource_params
    params.permit(:email, :password, :password_confirmation, :current_password, :reset_password_token, :redirect_url, :config)
  end
end
