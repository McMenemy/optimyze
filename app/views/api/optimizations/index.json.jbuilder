json.array!(@optimizations) do |optimization|
  json.partial!('optimization', optimization: optimization)
end
