class Category < ApplicationRecord
  has_ancestry orphan_strategy: :restrict
  has_many :products

  validates :name, presence: true, length: { minimum: 2, maximum: 50 }
  validates :slug, presence: true, uniqueness: true
  validates :description, length: { maximum: 500 }

  before_validation :generate_slug

  scope :roots_only, -> { roots.order(name: :asc) }

  def as_json(options = {})
    super(options.merge(
      only: [ :id, :name, :slug, :ancestry ]
    ))
  end

  private

  def generate_slug
    if name.present? && slug.blank?
      self.slug = name.parameterize
    end
  end
end
