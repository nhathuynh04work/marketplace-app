class Shop < ApplicationRecord
  include Sluggable

  belongs_to :user
  has_many :shop_categories, -> { ordered }, dependent: :destroy
  has_many :products, dependent: :destroy

  validates :name, presence: true, uniqueness: true, length: { minimum: 3, maximum: 50 }
  validates :description, length: { maximum: 500 }
end
