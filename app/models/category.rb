# == Schema Information
#
# Table name: categories
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Category < ActiveRecord::Base
  validates :name, presence: true

  has_many :category_optimizations, inverse_of: :category, dependent: :destroy
  has_many :optimizations, through: :category_optimizations, source: :optimization 
end
