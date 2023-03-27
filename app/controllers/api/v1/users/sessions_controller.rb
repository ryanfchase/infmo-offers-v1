# frozen_string_literal: true

class Api::V1::Users::SessionsController < Devise::SessionsController
  before_action :configure_sign_in_params, only: [:create]
  respond_to :json

  def respond_with(resource, _opts = {})
    puts "RESPOND_WITH--------------------------------"
    puts "resource: #{UserSerializer.new(resource).as_json}"
    puts "options: #{_opts.inspect.to_s}"
    render json: {
      status: { code: 200, message: 'Signed in successfully.' },
      data: UserSerializer.new(resource).as_json
    }, status: :ok
    puts "--------------------------------"
  end

  def respond_to_on_destroy
    if current_api_v1_user
      render json: {
        status: { code: 200, message: 'Signed out successfully.' }
    }, status: :ok
    else
      render json: {
        status: { code: 401, message: "Couldn't find an active session to log out." }
      }, status: :unauthorized
    end
  end


  # GET /resource/sign_in
  # def new
  #   super
  #   puts "NEW-----------------------"
  #   puts "params: #{params}"
  #   self.resource = User.find_for_database_authentication(user_name: params[:user][:user_name])
  #   puts "--------------------------"
  # end

  def new
  end

  # POST /resource/sign_in
  def create
    # puts "CREATE-----------------------"
    # puts "params: #{params}"
    self.resource = User.find_for_database_authentication(user_name: params[:user][:user_name])
    # puts "resource: #{self.resource.inspect}"
    # puts "password: #{self.resource.encrypted_password}"
    # puts "password from params: #{params[:user][:encrypted_password]}"
    # puts "matches password?: #{self.resource.valid_password?(params[:user][:encrypted_password])}"
    # either do this
    # super

    # or do this
    # sign_in(resource_name, resource)
    # yield resource if block_given?
    # respond_with resource, status: :created
    # puts "create--------------------------"

    # OR do this
    sign_in(resource_name, resource)
    puts "resource: #{resource.inspect}"
    puts "resource_name: #{resource_name.inspect}"
    # puts "resource_class: #{resource_class.inspect}"
    # puts "resource.errors: #{resource.errors.inspect}"
    # puts "resource.errors.full_messages: #{resource.errors.full_messages.inspect}"
    # puts "current_user: #{current_user.inspect}"
    puts "current_api_v1_user: #{current_api_v1_user.inspect}"
    @user = current_api_v1_user
    puts "@user: #{@user.inspect}"
    puts "@user.nil?: #{@user.nil?}"
    puts "signed_in?: #{signed_in?}"

    yield resource if block_given?
    respond_with resource, status: :created
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # TODO - work in progress
  def configure_sign_in_params
    puts "CONFIGURE_SIGN_IN_PARAMS-----------------------"
    added_attrs = [:user_name, :encrypted_password, :remember_me]
    devise_parameter_sanitizer.permit :sign_in, keys:  [:user_name, :encrypted_password]
    puts "--------------------------"
  end

  def respond_to_on_failure(_warden_options)
    puts "RESPOND_TO_ON_FAILURE-----------------------"
    puts "params: #{params}"
    puts "--------------------------"
    render json: {
      status: { code: 401, message: "Couldn't find an active session to log out." }
    }, status: :unauthorized
  end

  # permits params correctly - but not working
  # def sign_in_params
  #   params.require(:user).permit(:user_name, :encrypted_password)
  # end
end
