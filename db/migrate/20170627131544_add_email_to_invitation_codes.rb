class AddEmailToInvitationCodes < ActiveRecord::Migration[5.0]
  def change
    add_column :invitation_codes, :email, :string
  end
end
