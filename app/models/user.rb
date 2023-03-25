class User < ApplicationRecord
  has_secure_password
  has_many :user_offers
  has_many :offers, through: :user_offers

  def age
    now = Time.now.utc.to_date
    now.year - birthdate.year - (birthdate.past? ? 1 : 0)
  end

  def days_until_birthdate
    birthday = Date.new(Date.today.year, birthdate.month, birthdate.day)
    birthday += 1.year if birthday.past?
    (birthday - Date.today).to_i
  end
end
