class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_one :shop, dependent: :destroy

  def vendor?
    shop.present?
  end

  def as_json(options = {})
    super(options).except("jti", "created_at", "updated_at").merge(shop: shop)
  end
end
