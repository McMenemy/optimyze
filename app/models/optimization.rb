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
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  user_id                   :integer
#

class Optimization < ActiveRecord::Base
  validates :title, :investment_time, :time_saved_per_occurrence, :frequency, :user_id, presence: true

  belongs_to :user
end
