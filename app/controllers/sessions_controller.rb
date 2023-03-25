class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.find_by(user_name: params[:user_name])
    if @user && @user.authenticate(params[:password])
      sign_in @user
      render json: { status: 'success', message: "Welcome back, #{params[:user_name]}!"}, status: :created
    else
      render json: { status: 'error', errors: 'Invalid username or password' }, status: :unauthorized
    end
  end

  def destroy
    sign_out
    render json: { status: 'success', message: 'Logged out' }, status: :ok
  end

end
