class UserSerializer < ActiveModel::Serializer
  attributes :id, :user_name, :first_name, :last_name, :birthdate, :gender, :age, :days_to_birthday
  has_many :offers, serializer: OfferSerializer, as: :claimed_offers

  def age
    object.age
  end

  def days_to_birthday
    object.days_to_birthday
  end
end
