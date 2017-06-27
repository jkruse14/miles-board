class AddIndexToInvitationCodes < ActiveRecord::Migration[5.0]
  def change
    add_index :invitation_codes, :code
  end
end
