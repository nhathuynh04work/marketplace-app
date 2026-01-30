class Category < ApplicationRecord
  include Sluggable

  has_ancestry orphan_strategy: :restrict
  has_many :products

  validates :name, presence: true, length: { minimum: 2, maximum: 50 }
  validates :description, length: { maximum: 500 }

  scope :roots_only, -> { roots.order(name: :asc) }
end
