class Api::V1::Users::RegistrationsController < ApplicationController
  def create
    user = User.new(sign_up_params)

    if user.save
      log_in(user)
      render json: { user: UserBlueprint.render_as_hash(user, view: :with_shop) }, status: :ok
    else
      render json: { errors: user.errors.as_json }, status: :unprocessable_entity
    end
  end

  private
  def sign_up_params
    params.expect(user: [ :email, :password ])
  end
end
