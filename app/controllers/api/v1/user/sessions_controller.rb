# frozen_string_literal: true

class Api::V1::User::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
  respond_to :json

  def respond_with(resource, _opts = {})
    render json: {
      status: { code: 200, message: 'Signed in successfully.' },
      data: UserSerializer.new(resource).serializable_hash[:data][:attributes],
      status: :ok
    }
  end

  def respond_to_on_destroy
    if current_user
      render json: {
        status: { code: 200, message: 'Signed out successfully.' }
    }, status: :ok
    else
      render json: {
        status: { code: 401, message: "Couldn't find an active session to log out." }
      }, status: :unauthorized
    end


  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
