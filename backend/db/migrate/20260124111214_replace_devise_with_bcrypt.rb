class ReplaceDeviseWithBcrypt < ActiveRecord::Migration[8.1]
  def change
    # Remove Devise columns
    remove_column :users, :encrypted_password, :string
    remove_column :users, :reset_password_token, :string
    remove_column :users, :reset_password_sent_at, :datetime
    remove_column :users, :remember_created_at, :datetime
    remove_column :users, :jti, :string

    # Add Bcrypt column
    add_column :users, :password_digest, :string, null: false
  end
end
