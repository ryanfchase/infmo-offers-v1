class Api::V1::Users::UsersController < ApplicationController
  # before_action :authenticate_user!, only: [:me]
  before_action :authenticate_api_v1_user!, only: [:me]

  def me
    user = get_user_from_token
    if @user.nil?
      render json: { errors: 'User not logged in' }, status: :unauthorized
      return
    end
    render json: @user, serializer: UserSerializer
  end
  private
  def get_user_from_token
    # jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, Rails.application.secrets.secret_key_base).first # copilot suggested...
    jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last,
      Rails.application.credentials.devise[:jwt_secret_key]).first
    user_id = jwt_payload['sub']
    user = User.find(user_id.to_s)
  end
end
