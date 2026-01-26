class CreateProducts < ActiveRecord::Migration[8.1]
  def change
    create_table :products do |t|
      t.references :shop, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
      t.references :shop_category, null: false, foreign_key: true

      t.string :name, null: false
      t.text :description
      t.decimal :price, precision: 10, scale: 2, null: false
      t.integer :stock_quantity, default: 0, null: false
      t.integer :status, default: 0, null: false
      t.string :slug, null: false

      t.timestamps
    end

    add_index :products, :slug, unique: true
    add_index :products, [ :shop_id, :status ]
  end
end
