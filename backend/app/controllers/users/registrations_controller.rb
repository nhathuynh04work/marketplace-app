class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  # override to disable storing session when logging in after sign up
  def create
    build_resource(sign_up_params)

    resource.save

    if resource.persisted?
      if resource.active_for_authentication?
        # disable using session store
        sign_in(resource_name, resource, store: false)

        respond_with resource, location: after_sign_up_path_for(resource)
      else
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
  end

  private

  def respond_with(resource, _opts = {})
    if resource.persisted? # check if user has been saved successfully
      render json: {
        message: "Signed up successfully.",
        user: resource
      }, status: :ok
    else
      render json: {
        message: "User couldn't be created successfully.",
        errors: resource.errors.full_messages.to_sentence
      }, status: :unprocessable_entity
    end
  end
end
