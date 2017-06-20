class Team < ApplicationRecord
    before_save { contact_email.downcase! }

    has_many :team_member_lists
    has_many :users, through: :team_member_lists
    has_many :runs, through: :users

    belongs_to :team_owner

    validates :name, presence: true, length: { maximum: 50 }
    validates :team_owner_id, presence: true

    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
    validates :contact_email, presence: true, 
                              length: { maximum: 255 },
                              format: { with: VALID_EMAIL_REGEX }
                              #uniqueness: { case_sensitive: false }
end
