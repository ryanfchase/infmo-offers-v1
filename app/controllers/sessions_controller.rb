class SessionsController < ApplicationController::API

  def new
    @user = User.new
  end

  def create
    @user = User.find_by(user_name: params[:user_name])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render json: { status: 'success', message: "Welcome back, #{params[:user_name]}!"}, status: :created
    else
      render json: { status: 'error', errors: 'Invalid username or password' }, status: :unauthorized
    end
  end

  def destroy
    session[:user_id] = nil
    render json: { status: 'success', message: 'Logged out' }, status: :ok
  end

end
