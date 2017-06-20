class AddRunDateToRuns < ActiveRecord::Migration[5.0]
  def change
    add_column :runs, :run_date, :datetime
  end
end
