class ConfirmationsController < Devise::ConfirmationsController
    # GET /resource/confirmation?confirmation_token=abcdef
    def show
        self.resource = resource_class.confirm_by_token(params[:confirmation_token])
        yield resource if block_given?

        if resource.errors.messages.empty?
            set_flash_message!(:notice, :confirmed)
            #respond_with_navigational(resource){ redirect_to after_confirmation_path_for(resource_name, resource) }
            if signed_in?(resource_name)
                #signed_in_root_path(root_path)
                redirect_to root_path + '#!/users/' + resource.id.to_s
            else
                redirect_to root_path + '#!/login'
            end
        else
            respond_with_navigational(resource.errors, status: :unprocessable_entity){ render :new }
        end
    end

    protected

        # The path used after resending confirmation instructions.
        def after_resending_confirmation_instructions_path_for(resource_name)
            new_session_path(root_path)
        end

        # The path used after confirmation.
        def after_confirmation_path_for(resource_name, resource)
            if signed_in?(resource_name)
                signed_in_root_path(resource)
            else
                new_session_path(resource_name)
            end
        end
end
