class JsonWebToken
  SECRET_KEY = Rails.application.credentials.secret_key_base.to_s

  def self.encode(payload, exp = nil)
    # Allow environment variable to override default expiration time
    # Useful for testing with short-lived tokens
    exp ||= if ENV['JWT_EXPIRATION_SECONDS'].present?
              ENV['JWT_EXPIRATION_SECONDS'].to_i.seconds.from_now
            else
              24.hours.from_now
            end

    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new decoded
  rescue JWT::DecodeError, JWT::ExpiredSignature, JWT::VerificationError, JWT::InvalidJtiError => e
    Rails.logger.error "JWT decode error: #{e.class} - #{e.message}"
    nil
  end
end
