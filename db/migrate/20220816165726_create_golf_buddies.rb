class CreateGolfBuddies < ActiveRecord::Migration[6.1]
  def change
    create_table :golf_buddies do |t|
      t.references :user, null: false, foreign_key: true
      t.references :friend, references: :user, foreign_key: { to_table: :users}

      t.timestamps
    end
  end
end
