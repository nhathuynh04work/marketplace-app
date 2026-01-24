module Authenticatable
  extend ActiveSupport::Concern

  included do
    attr_reader :current_user
  end

  private

  def authenticate_user
    header = request.headers["Authorization"]
    if header.present?
      token = header.split(" ").last
      decoded = JsonWebToken.decode(token)
      if decoded
        @current_user = User.find_by(id: decoded[:user_id])
      end
    end

    unless @current_user
      render_error(message: "Unauthorized access", status: :unauthorized)
    end
  end

  def log_in(user)
    token = JsonWebToken.encode(user_id: user.id)
    response.headers["Authorization"] = "Bearer #{token}"
  end
end
