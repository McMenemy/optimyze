# == Schema Information
#
# Table name: optimizations
#
#  id                        :integer          not null, primary key
#  title                     :string           not null
#  description               :text
#  investment_time           :integer          not null
#  time_saved_per_occurrence :integer          not null
#  frequency                 :integer          not null
#  public                    :boolean          not null
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#

require 'test_helper'

class OptimizationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
