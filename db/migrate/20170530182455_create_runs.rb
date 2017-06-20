class CreateRuns < ActiveRecord::Migration[5.0]
  def change
    create_table :runs do |t|
      t.decimal :distance
      t.string :event
      t.integer :user_id
      t.integer :team_id

      t.timestamps
    end
  end
end
