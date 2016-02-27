class AddColumnUserIdToOptimizations < ActiveRecord::Migration
  def change
    add_column :optimizations, :user_id, :integer
    add_index :optimizations, :user_id
  end
end
