json.extract!(
  optimization,
  :id, :title, :description, :investment_time, :time_saved_per_occurrence, :frequency, :user_id, :created_at
)

optimization_categories = optimization.categories.map do |category|
  category.name
end

json.categories optimization_categories
