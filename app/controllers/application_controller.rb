require './app/helpers/sessions_helper'
class ApplicationController < ActionController::API
  include SessionsHelper
end
