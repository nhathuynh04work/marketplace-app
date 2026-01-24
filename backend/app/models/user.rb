class User < ApplicationRecord
  has_secure_password

  has_one :shop, dependent: :destroy

  validates :email,
            presence: true,
            uniqueness: true,
            format: { with: URI::MailTo::EMAIL_REGEXP, message: "is invalid" }

  validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }

  def vendor?
    shop.present?
  end

  def as_json(options = {})
    super(options).except("password_digest", "created_at", "updated_at").merge(shop: shop)
  end
end
