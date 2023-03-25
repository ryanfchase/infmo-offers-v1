class OfferSerializer < ActiveModel::Serializer
  attributes :id, :description, :target_age_min, :target_age_max, :target_gender
end
