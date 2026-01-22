class Api::V1::Users::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    user = User.find_by(email: sign_in_params[:email])

    if user&.valid_password?(sign_in_params[:password])
      sign_in(user, store: false)
      render_success(message: "Logged in successfully", data: { user: user })
    else
      render_error(message: "Invalid email or password", status: :unauthorized)
    end
  end

  private

  def sign_in_params
    params.require(:user).permit(:email, :password)
  end

  def respond_to_on_destroy
    if current_user
      render_success(message: "Logged out successfully")
    else
      render_error(message: "Couldn't find an active session", status: :unauthorized)
    end
  end
end
