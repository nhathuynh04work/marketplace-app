class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource(sign_up_params)

    resource.save

    if resource.persisted?
      if resource.active_for_authentication?
        # disable using session store
        sign_in(resource_name, resource, store: false)

        render_success(message: "Signed up successfully", data: { user: resource })
      else
        expire_data_after_sign_in!
        render_success(message: "Signed up, but need to confirm email", data: { user: resource })
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      render_error(
        message: "User couldn't be created successfully.",
        errors: resource.errors.as_json,
        status: :unprocessable_entity
      )
    end
  end

  private
end
