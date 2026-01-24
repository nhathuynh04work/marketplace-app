class Api::V1::Users::SessionsController < ApplicationController
  def create
    user = User.find_by(email: sign_in_params[:email])

    if user&.authenticate(sign_in_params[:password])
      log_in(user)
      render_success(message: "Logged in successfully", data: { user: user })
    else
      render_error(message: "Invalid email or password", status: :unauthorized)
    end
  end

  private

  def sign_in_params
    params.expect(user: [ :email, :password ])
  end
end
