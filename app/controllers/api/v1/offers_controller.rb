class Api::V1::OffersController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false
  # before_action :authenticate_api_v1_user!, only: [:index, :show] # no sessions lead to Authentication header not being passed on redirect

  def index
    # puts "current_api_v1_user: #{current_api_v1_user.inspect}"
    # puts "current_user: #{current_api_v1_user.inspect}"
    # puts "token: #{request.headers['Authorization']}"
    # puts "params: #{params}"
    # puts "getUserFromToken: #{get_user_from_token.inspect}"
    offers = Offer.all.select { |offer| offer.eligible?(current_api_v1_user) }
    render json: {message: "Returning list of eligible offers", offers: offers}, status: :ok
  end

  def show
    offer = Offer.find_by(id: params[:id])
    if offer.nil?
      render json: { errors: 'Offer not found' }, status: :not_found
      return
    end
    render json: offer, status: :ok
  end
end
