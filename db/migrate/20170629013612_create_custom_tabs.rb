class CreateCustomTabs < ActiveRecord::Migration[5.0]
  def change
    create_table :custom_tabs do |t|
      t.integer :team_id
      t.string  :filter_field
      t.string  :filter_value
      t.string  :object_type
      t.string  :comparator
      
      t.timestamps
    end
  end
end
