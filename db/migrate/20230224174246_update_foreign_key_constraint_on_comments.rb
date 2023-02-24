class UpdateForeignKeyConstraintOnComments < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :comments, :users
    add_foreign_key :comments, :users, on_delete: :cascade, on_update: :cascade
  end
end
