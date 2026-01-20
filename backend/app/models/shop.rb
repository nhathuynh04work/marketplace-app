class Shop < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, uniqueness: true, length: { minimum: 3, maximum: 50 }
  validates :slug, presence: true, uniqueness: true
  validates :description, length: { maximum: 500 }

  before_validation :generate_slug

  private

  def generate_slug
    if name.present? && slug.blank?
      self.slug = name.parameterize
    end
  end
end
