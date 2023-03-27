class User < ApplicationRecord
  # has_secure_password
  # devise :database_authenticatable, :registerable
  devise :database_authenticatable, :registerable, :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist #, :api,

  has_many :user_offers
  has_many :offers, through: :user_offers

  validates :user_name, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :birthdate, presence: true
  validates :gender, presence: true

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if user_name = conditions.delete(:user_name)
      where(conditions.to_h).where(["lower(user_name) = :value", { :value => user_name.downcase }]).first
    else
      where(conditions.to_h).first
    end
  end

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
