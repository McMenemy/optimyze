# == Schema Information
#
# Table name: category_optimizations
#
#  id              :integer          not null, primary key
#  category_id     :integer          not null
#  optimization_id :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'test_helper'

class CategoryOptimizationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
