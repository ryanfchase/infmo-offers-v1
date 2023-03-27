class Offer < ApplicationRecord
  has_many :user_offers
  has_many :users, through: :user_offers, as: :users_offered

  def eligible?(user)
    return false if user.nil?
    (target_gender == user.gender || target_gender == 'any') &&
    (user.age.between?(target_age_min, target_age_max))
  end
end
