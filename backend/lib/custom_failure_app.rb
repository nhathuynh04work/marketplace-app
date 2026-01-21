class CustomFailureApp < Devise::FailureApp
  def respond
    if request.format == :json || request.format == :html
      json_error_response
    else
      super
    end
  end

  def json_error_response
    self.status = 401
    self.content_type = "application/json"

    self.response_body = {
      success: false,
      message: i18n_message,
      errors: nil
    }.to_json
  end
end
