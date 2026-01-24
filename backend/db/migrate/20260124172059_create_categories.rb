class CreateCategories < ActiveRecord::Migration[8.1]
  def change
    create_table :categories do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.text :description
      t.string :ancestry, index: true

      t.timestamps
    end

    add_index :categories, :slug, unique: true
    add_index :categories, :name
  end
end
