class Shop < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, unique: true, length: { minimum: 3, maximum: 50 }
  validates :slug, presence: true, unique: true
  validates :description, length: { maximum: 500 }

  before_validation :generate_slug

  def generate_slug
    if name.present? && slug.blank?
      self.slug = name.parameterize
    end
  end
end
