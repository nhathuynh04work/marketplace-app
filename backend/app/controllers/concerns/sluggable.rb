module Sluggable
  extend ActiveSupport::Concern

  included do
    before_validation :generate_slug
    validates :slug, presence: true, uniqueness: true
  end

  private

  def generate_slug
    return if name.blank? || slug.present?

    base_slug = name.parameterize

    if self.is_a?(Product)
      self.slug = "#{base_slug}-#{SecureRandom.hex(4)}"
    else
      self.slug = base_slug
    end
  end
end
