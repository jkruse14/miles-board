class ChangeTeamsOwnerIdToTeamOwnerId < ActiveRecord::Migration[5.0]
  def change
    
    rename_column :teams, :owner_id, :team_owner_id

  end
end
