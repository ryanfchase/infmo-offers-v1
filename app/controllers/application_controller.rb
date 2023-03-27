class ApplicationController < ActionController::API
  def get_user_from_token
    jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last,
      Rails.application.credentials.devise[:jwt_secret_key]).first
    user_id = jwt_payload['sub']
    user = User.find(user_id.to_s)
  end
end
