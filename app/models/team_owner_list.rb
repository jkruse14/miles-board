class TeamOwnerList < ApplicationRecord
  belongs_to :team
  belongs_to :team_owner

  validates :team_owner_id, presence: true
  validates :team_id, presence: true
end
