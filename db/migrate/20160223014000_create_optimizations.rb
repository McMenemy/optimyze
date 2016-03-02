class CreateOptimizations < ActiveRecord::Migration
  def change
    create_table :optimizations do |t|
      t.string :title, null: false
      t.text :description
      t.decimal :investment_time, null: false
      t.decimal :time_saved_per_occurrence, null: false
      t.decimal :frequency, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end
    add_index :optimizations, :user_id
  end
end
