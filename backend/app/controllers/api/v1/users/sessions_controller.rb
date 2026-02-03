class Api::V1::Users::SessionsController < ApplicationController
  def create
    user = User.find_by(email: sign_in_params[:email])

    if user&.authenticate(sign_in_params[:password])
      log_in(user)
      render json: { user: UserBlueprint.render_as_hash(user, view: :with_shop) }, status: :ok
    else
      render json: { errors: "Invalid email or password" }, status: :unauthorized
    end
  end

  private

  def sign_in_params
    params.expect(user: [ :email, :password ])
  end
end
