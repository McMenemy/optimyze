class CreateCategoryOptimizations < ActiveRecord::Migration
  def change
    create_table :category_optimizations do |t|
      t.integer :category_id, null: false
      t.integer :optimization_id, null: false

      t.timestamps null: false
    end
    add_index :category_optimizations, :category_id
    add_index :category_optimizations, :optimization_id
    add_index :category_optimizations, [:category_id, :optimization_id], unique: true
  end
end
