class OptimizationsUserIdNotNull < ActiveRecord::Migration
  def change
    change_column_null :optimizations, :user_id, false
  end
end
