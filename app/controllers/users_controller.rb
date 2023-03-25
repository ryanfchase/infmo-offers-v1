class UsersController < ApplicationController

  def show
    if current_user.nil?
      render json: { errors: 'User not logged in' }, status: :unauthorized
      return
    end
    render json: @user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in @user
      render json: { status: 'success', message: "Welcome to the site, #{user_params[:first_name]}!"}, status: :created
    else
      render json: { status: 'error', errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:user_name, :first_name, :last_name, :birthdate, :gender, :password, :password_confirmation)

end
