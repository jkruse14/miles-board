class Team < ApplicationRecord
    before_save { contact_email.downcase! }

    has_many :team_member_lists, dependent: :destroy
    has_many :users, through: :team_member_lists
    has_many :runs, through: :users
    has_many :custom_tabs

    has_many :team_owner_lists, dependent: :destroy
    has_many :team_owners, through: :team_owner_lists

    validates :name, presence: true, length: { maximum: 50 }

    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
    validates :contact_email, presence: true, 
                              length: { maximum: 255 },
                              format: { with: VALID_EMAIL_REGEX }
                              #uniqueness: { case_sensitive: false }
end
