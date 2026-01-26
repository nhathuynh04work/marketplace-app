class CreateShopCategories < ActiveRecord::Migration[8.1]
  def change
    create_table :shop_categories do |t|
      t.references :shop, null: false, foreign_key: true
      t.string :name, null: false
      t.integer :display_order, default: 0
      t.boolean :is_active, default: true

      t.timestamps
    end

    add_index :shop_categories, [ :shop_id, :name ], unique: true
  end
end
