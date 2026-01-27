class ShopCategory < ApplicationRecord
  belongs_to :shop
  has_many :products

  validates :name, presence: true, length: { maximum: 50 }
  validates :name, uniqueness: { scope: :shop_id, message: "already exists in your shop" }

  scope :ordered, -> { order(display_order: :asc, created_at: :asc) }
  scope :active, -> { where(is_active: true) }
end
