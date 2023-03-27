class Api::V1::OffersController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false

  def index
    offers = Offer.all.select { |offer| offer.eligible?(current_api_v1_user) }
    render json: {message: "Returning list of eligible offers", offers: offers}, status: :ok
  end
end
