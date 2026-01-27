class Product < ApplicationRecord
  belongs_to :shop
  belongs_to :category
  belongs_to :shop_category, optional: true

  enum :status, { draft: 0, active: 1, archived: 2 }, default: :draft

  validates :name, presence: true, length: { minimum: 3, maximum: 150 }
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :stock_quantity, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :description, length: { maximum: 3000 }, allow_blank: true
  validates :slug, presence: true, uniqueness: true

  before_validation :generate_slug

  scope :active, -> { where(status: :active) }
  scope :ordered, -> { order(created_at: :desc) }
  scope :filter_by_category, ->(id) { where(category_id: id) if id.present? }
  scope :filter_by_shop_category, ->(id) { where(shop_category_id: id) if id.present? }
  scope :search_by_name, ->(query) { where("name ILIKE ?", "%#{query}%") if query.present? }

  private

  def generate_slug
    if name.present? && slug.blank?
      self.slug = "#{name.parameterize}-#{SecureRandom.hex(4)}"
    end
  end
end
