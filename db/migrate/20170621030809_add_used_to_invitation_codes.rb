class AddUsedToInvitationCodes < ActiveRecord::Migration[5.0]
  def change
    add_column :invitation_codes, :used, :boolean
  end
end
