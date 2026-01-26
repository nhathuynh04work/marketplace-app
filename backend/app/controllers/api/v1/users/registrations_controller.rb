class Api::V1::Users::RegistrationsController < ApplicationController
  def create
    user = User.new(sign_up_params)

    if user.save
      log_in(user)
      data = { user: UserBlueprint.render_as_hash(user, view: :with_shop) }
      render_success(message: "Signed up successfully", data: data)
    else
      render_error(
        message: "User couldn't be created successfully.",
        errors: user.errors.as_json
      )
    end
  end

  private
  def sign_up_params
    params.expect(user: [ :email, :password ])
  end
end
