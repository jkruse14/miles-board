# Users Model
class User < ApplicationRecord
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
          
  include DeviseTokenAuth::Concerns::User
  before_save { email.downcase! }

  has_many :team_member_lists
  has_many :teams, through: :team_member_lists
  has_many :runs

  validates :first_name, presence: true, length: { maximum: 50 }
  validates :last_name, presence: true, length: { maximum: 50 }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                                    format: { with: VALID_EMAIL_REGEX },
                                    uniqueness: { case_sensitive: false }
  #validates :password, presence: true, length: { minimum: 6 }
  #validates :password_confirmation, presence: true, length: {minimum: 6}

end
