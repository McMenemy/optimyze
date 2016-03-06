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

class Optimization < ActiveRecord::Base
  validates :title, :investment_time, :time_saved_per_occurrence, :frequency, :user_id, presence: true

  belongs_to :user
  has_many :category_optimizations, inverse_of: :optimization, dependent: :destroy
  has_many :categories, through: :category_optimizations, source: :category
end
