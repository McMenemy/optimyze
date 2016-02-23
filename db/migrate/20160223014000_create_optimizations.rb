class CreateOptimizations < ActiveRecord::Migration
  def change
    create_table :optimizations do |t|
      t.string :title, null: false
      t.text :description
      t.integer :investment_time, null: false
      t.integer :time_saved_per_occurrence, null: false
      t.integer :frequency, null: false
      t.boolean :public, null: false

      t.timestamps null: false
    end
  end
end
