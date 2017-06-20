class AddOwnerForeignKeyToTeams < ActiveRecord::Migration[5.0]
  def change
    add_foreign_key :teams, :users, column: :owner_id
  end
end
