class CreateCustomTabs < ActiveRecord::Migration[5.0]
  def change
    create_table :custom_tabs do |t|
      t.integer :team_id
      t.integer :custom_filter_id
      t.string  :heading

      t.timestamps
    end
  end
end
