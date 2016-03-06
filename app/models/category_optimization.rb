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

class CategoryOptimization < ActiveRecord::Base
  validates :category_id, :optimization_id, presence: true

  belongs_to :optimization, inverse_of: :category_optimizations
  belongs_to :category, inverse_of: :category_optimizations
end
