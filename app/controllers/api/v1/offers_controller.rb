class Api::V1::OffersController < ApplicationController
  def index
    if user_signed_in?
      offers = Offer.all.select { |offer| offer.eligible?(current_user) }
      render json: offers, status: :ok
    else
      render json: Offer.all, each_serializer: OfferSerializer, status: :ok
    end
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
