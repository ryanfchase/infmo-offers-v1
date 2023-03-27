# frozen_string_literal: true

class Api::V1::Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
  respond_to :json

  def respond_with(resource, _opts = {})
    render json: {
      message: 'Signed in successfully.',
      data: current_api_v1_user
    }, status: :ok
  end

  def respond_to_on_destroy
    if current_api_v1_user
      render json: { code: 200, message: 'Signed out successfully.' }, status: :ok
    else
      render json: { message: "Couldn't find an active session to log out." }, status: :unauthorized
    end
  end


  def new
  end

  # POST /resource/sign_in
  def create
    self.resource = User.find_for_database_authentication(user_name: params[:user][:user_name])
    sign_in(resource_name, resource)
    user = current_api_v1_user
    yield resource if block_given?
    respond_with resource, status: :created
  end

  private
  # permits params correctly - but not working
  def sign_in_params
    params.require(:user).permit(:user_name, :password)
  end
end