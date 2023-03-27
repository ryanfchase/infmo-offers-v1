class Api::V1::UserOffersController < ApplicationController
  def create
    # First validate that the offer exists
    offer = Offer.find_by(id: params[:id])
    if offer.nil?
      render json: { errors: 'Offer not found' }, status: :not_found
      return
    end

    # Then validate that the user can claim the offer
    unless offer.eligible?(current_api_v1_user)
      render json: { errors: 'User not eligible' }, status: :unauthorized
      return
    end

    # Then attempt to create the user offer
    user_offer = 
    current_api_v1_user .user_offers.build(:offer_id => offer.id)
    if current_api_v1_user.save
      render json: { message: "Offer claimed successfully.", offer: OfferSerializer.new(offer) }, status: :created
    else
      render json: user_offer.errors, status: :unprocessable_entity
    end
  end
end
