# add an index and force uniqueness on email for users
class AddIndexToUsersEmail < ActiveRecord::Migration[5.0]
  def change
    add_index :users, :email, unique: true
  end
end
