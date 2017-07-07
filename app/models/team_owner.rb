class TeamOwner < User
    has_many :teams, through: :team_owner_lists
    has_many :team_owner_lists, dependent: :destroy
end
