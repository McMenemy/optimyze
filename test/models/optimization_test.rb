# == Schema Information
#
# Table name: optimizations
#
#  id                        :integer          not null, primary key
#  title                     :string           not null
#  description               :text
#  investment_time           :decimal(, )      not null
#  time_saved_per_occurrence :decimal(, )      not null
#  frequency                 :decimal(, )      not null
#  user_id                   :integer          not null
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#

require 'test_helper'

class OptimizationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
