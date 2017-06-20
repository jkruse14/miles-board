class CreateTeams < ActiveRecord::Migration[5.0]
  def change
    create_table :teams do |t|
      t.string :name
      t.integer :owner_id
      t.string :location

      t.timestamps
    end
  end
end
