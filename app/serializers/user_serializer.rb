class UserSerializer < ActiveModel::Serializer
  attributes :id, :user_name, :first_name, :last_name, :birthdate, :gender, :age, :days_until_birthdate
  has_many :offers, serializer: OfferSerializer, as: :claimed_offers

  def age
    object.age
  end

  def days_until_birthdate
    object.days_until_birthdate
  end
end
