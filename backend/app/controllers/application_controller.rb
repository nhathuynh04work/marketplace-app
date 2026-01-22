class ApplicationController < ActionController::API
  include Devise::Controllers::Helpers

  def authenticate_user!
    authenticate_api_v1_user!
  end

  def render_success(message:, data: {})
    render json: {
      success: true,
      message: message,
      data: data
    }, status: :ok
  end

  def render_error(message:, status: :unprocessable_entity, errors: nil)
    render json: {
      success: false,
      message: message,
      errors: errors
    }, status: status
  end
end
