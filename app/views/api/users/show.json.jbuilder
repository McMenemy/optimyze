optimization_array = json.array!(@user_optimizations) do |optimization|
  json.partial!('api/optimizations/optimization', optimization: optimization)
end
