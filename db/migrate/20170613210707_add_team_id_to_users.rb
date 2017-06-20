class AddTeamIdToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :teamId, :integer
  end
end
