class OffersController < ApplicationController::API
  before_action :require_user, only: [:index, :show]

  def index
    offers = Offer.all.select { |offer| offer.eligible?(current_user) }
    render json: offers, status: :ok
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
