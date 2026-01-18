class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  # what to do after successful login
  def respond_with(resource, _opts = {})
    render json: {
      message: "Logged in successfully.",
      user: current_user
    }, status: :ok
  end

  # what to do after successful logout
  def respond_to_on_destroy
    if current_user
      render json: {
        message: "logged out successfully"
      }, status: :ok
    else
      render json: {
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end
