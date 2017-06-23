class CreateImportedUserData < ActiveRecord::Migration[5.0]
  def change
    create_table :imported_user_data do |t|
      t.integer :user_id
      t.integer :team_id
      t.integer :num_team_runs
      t.integer :team_miles
      
      t.timestamps
    end
  end
end
