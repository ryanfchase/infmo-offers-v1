# frozen_string_literal: true

class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]
  respond_to :json

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: { message: 'Signed up successfully.' },
        # data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
        data: UserSerializer.new(resource).as_json
      }, status: :ok
    else
      render json: {
        status: { message: "User not created successfully: #{resource.errors.full_messages.to_sentence}." }
      }, status: :unprocessable_entity
    end
  end

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    build_resource(sign_up_params)
    puts "REG::CREATE-----------------------"
    # puts "params: #{params}"
    puts "sign_up_params: #{sign_up_params}"
    puts "################################"
    puts "resource: #{resource.inspect}"
    resource.save
    puts "resource.errors: #{resource.errors.full_messages.to_sentence}"
    sign_up(resource_name, resource) if resource.persisted?

    respond_with resource
    puts "REG::CREATE::FIN-----------------------"
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:user, keys: [:user_name, :password, :first_name, :last_name, :birthdate, :gender])
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end

  # private

  def sign_up_params
    params.require(:user).permit(:user_name, :first_name, :last_name, :birthdate, :gender, :password)
  end
end