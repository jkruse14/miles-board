class AddContactEmailToTeam < ActiveRecord::Migration[5.0]
  def change
    add_column :teams, :contact_email, :string
  end
end
