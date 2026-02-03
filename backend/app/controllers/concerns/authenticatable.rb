module Authenticatable
  extend ActiveSupport::Concern

  included do
    helper_method :current_user if defined?(helper_method)
  end

  private

  def current_user
    return @current_user if defined?(@current_user)

    header = request.headers["Authorization"]
    return @current_user = nil unless header.present?

    token = header.split(" ").last

    begin
      decoded = JsonWebToken.decode(token)
      if decoded.nil?
        Rails.logger.warn "Failed to decode token: #{token}"
        return @current_user = nil
      end
      @current_user = User.find_by(id: decoded[:user_id])
    rescue StandardError => e
      Rails.logger.error "Authentication error: #{e.class} - #{e.message}"
      @current_user = nil
    end

    @current_user
  end

  def authenticate_user!
    unless current_user
      render_error(message: "Unauthorized access", status: :unauthorized)
    end
  end

  def log_in(user)
    token = JsonWebToken.encode(user_id: user.id)
    response.headers["Authorization"] = "Bearer #{token}"
  end
end
