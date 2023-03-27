# frozen_string_literal: true

class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]
  respond_to :json

  def respond_with(resource, _opts = {})
    register_success && return if resource.persisted?
    register_failed
  end

  # POST /resource
  def create
    build_resource(sign_up_params)
    resource.save
    sign_up(resource_name, resource) if resource.persisted?
    respond_with resource
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:user, keys: [:user_name, :password, :first_name, :last_name, :birthdate, :gender])
  # end

  private

  def register_success
    render json: {
        message: 'Signed up successfully.',
        user: current_api_v1_user,
    }, status: :ok
  end

  def register_failed
    render json: {
      message: "User not created successfully: #{resource.errors.full_messages.to_sentence}."
    }, status: :unprocessable_entity
  end

  def sign_up_params
    params.require(:user).permit(:user_name, :first_name, :last_name, :birthdate, :gender, :password)
  end
end