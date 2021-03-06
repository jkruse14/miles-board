# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170706230217) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "custom_filters", force: :cascade do |t|
    t.integer  "custom_tab_id"
    t.integer  "team_id"
    t.string   "filter_field"
    t.string   "filter_value"
    t.string   "object_type"
    t.string   "comparator"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "custom_tabs", force: :cascade do |t|
    t.integer  "team_id"
    t.integer  "custom_filter_id"
    t.string   "heading"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "imported_user_data", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "team_id"
    t.integer  "num_team_runs"
    t.integer  "team_miles"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "invitation_codes", force: :cascade do |t|
    t.string   "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean  "used"
    t.string   "email"
    t.index ["code"], name: "index_invitation_codes_on_code", using: :btree
  end

  create_table "runs", force: :cascade do |t|
    t.decimal  "distance"
    t.string   "event"
    t.integer  "user_id"
    t.integer  "team_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "run_date"
  end

  create_table "team_member_lists", force: :cascade do |t|
    t.integer  "team_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "team_members", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "team_owner_lists", force: :cascade do |t|
    t.integer  "team_owner_id"
    t.integer  "team_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "team_owners", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "teams", force: :cascade do |t|
    t.string   "name"
    t.integer  "team_owner_id"
    t.string   "location"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "contact_email"
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "nickname"
    t.string   "image"
    t.string   "email"
    t.string   "type"
    t.text     "tokens"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.integer  "teamId"
    t.string   "gender"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree
  end

  add_foreign_key "runs", "teams"
  add_foreign_key "runs", "users"
  add_foreign_key "teams", "users", column: "team_owner_id"
end
