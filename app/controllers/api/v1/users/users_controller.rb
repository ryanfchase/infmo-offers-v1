class Api::V1::Users::UsersController < ApplicationController

  def me
    @user = current_api_v1_user
    if @user.nil?
      render json: { errors: 'User not logged in' }, status: :unauthorized
      return
    end
    @user = current_user
    render json: @user, serializer: UserSerializer
  end
end
