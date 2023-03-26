class User < ApplicationRecord
  # has_secure_password
  devise :database_authenticatable, :registerable #, :recoverable, :rememberable, :validatable
  has_many :user_offers
  has_many :offers, through: :user_offers

  validates :user_name, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :birthdate, presence: true
  validates :gender, presence: true

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    puts "FIND_FOR_DATABASE_AUTHENTICATION-----------------------"
    puts conditions
    if user_name = conditions.delete(:user_name)
      # puts user_name.to_s
      puts "???"
      puts where(conditions.to_h).where(["lower(user_name) = :value", { :value => user_name.downcase }]).first.inspect
      puts "???"
      puts "fin--------------------------"
      # where(conditions.to_h).where(:user_name => user_name).first
      # where(conditions.to_h).where(["lower(user_name) = :value", { :value => self.user_name.downcase }]).first
      # where(conditions.to_h).where(["lower(user_name) = :value", { :value => login.downcase }]).first
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
