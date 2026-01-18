class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  # what to do after successful login
  def respond_with(resource, _opts = {})
    render_success(message: "Logged in successfully", data: { user: resource })
  end

  # what to do after successful logout
  def respond_to_on_destroy
    if current_user
      render_success(message: "Logged out successfully")
    else
      render_error(message: "Couldn't find an active session", status: :unauthorized)
    end
  end
end
