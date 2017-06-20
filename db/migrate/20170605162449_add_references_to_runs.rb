class AddReferencesToRuns < ActiveRecord::Migration[5.0]
  def change
    add_foreign_key :runs, :user
  end
end
