class CreateInvitationCodes < ActiveRecord::Migration[5.0]
  def change
    create_table :invitation_codes do |t|
      t.integer :user_id
      t.string :code

      t.timestamps
    end
  end
end
