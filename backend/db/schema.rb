ActiveRecord::Schema[8.1].define(version: 2026_01_24_111214) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "shops", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.string "name", null: false
    t.string "slug", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index [ "name" ], name: "index_shops_on_name", unique: true
    t.index [ "slug" ], name: "index_shops_on_slug", unique: true
    t.index [ "user_id" ], name: "index_shops_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", default: "", null: false
    t.string "password_digest", null: false
    t.datetime "updated_at", null: false
    t.index [ "email" ], name: "index_users_on_email", unique: true
  end

  add_foreign_key "shops", "users"
end
