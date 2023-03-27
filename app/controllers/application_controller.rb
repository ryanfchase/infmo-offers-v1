class ApplicationController < ActionController::API
  # before_action :configure_permitted_parameters, if: :devise_controller?

  # def configure_permitted_parameters 
  #   puts "CONFIGURE_SIGN_IN_PARAMS-----------------------"
  #   added_attrs = [:user_name, :encrypted_password, :remember_me]
  #   devise_parameter_sanitizer.permit :sign_in, keys:  [:user_name, :encrypted_password]
  #   puts "--------------------------"
  # end
end
