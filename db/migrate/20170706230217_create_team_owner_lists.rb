class CreateTeamOwnerLists < ActiveRecord::Migration[5.0]
  def change
    create_table :team_owner_lists do |t|
      t.integer :team_owner_id
      t.integer :team_id

      t.timestamps
    end
  end
end
