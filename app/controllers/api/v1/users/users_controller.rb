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
end
