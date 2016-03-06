# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160306194606) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "category_optimizations", force: :cascade do |t|
    t.integer  "category_id",     null: false
    t.integer  "optimization_id", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "category_optimizations", ["category_id", "optimization_id"], name: "index_category_optimizations_on_category_id_and_optimization_id", unique: true, using: :btree
  add_index "category_optimizations", ["category_id"], name: "index_category_optimizations_on_category_id", using: :btree
  add_index "category_optimizations", ["optimization_id"], name: "index_category_optimizations_on_optimization_id", using: :btree

  create_table "optimizations", force: :cascade do |t|
    t.string   "title",                     null: false
    t.text     "description"
    t.decimal  "investment_time",           null: false
    t.decimal  "time_saved_per_occurrence", null: false
    t.decimal  "frequency",                 null: false
    t.integer  "user_id",                   null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  add_index "optimizations", ["user_id"], name: "index_optimizations_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
