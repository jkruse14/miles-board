class RemoveUserIdFromInvitationCodes < ActiveRecord::Migration[5.0]
  def change
    remove_column :invitation_codes, :user_id
  end
end
