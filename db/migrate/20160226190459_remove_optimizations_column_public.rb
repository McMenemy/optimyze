class RemoveOptimizationsColumnPublic < ActiveRecord::Migration
  def change
    remove_column :optimizations, :public
  end
end
