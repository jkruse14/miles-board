class AddForeignKeysToRuns < ActiveRecord::Migration[5.0]
  def change
    add_foreign_key :runs, :users
    add_foreign_key :runs, :teams
  end
end
