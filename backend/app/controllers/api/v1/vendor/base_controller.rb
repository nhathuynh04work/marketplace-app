class Api::V1::Vendor::BaseController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_shop_owner

  private

  def ensure_shop_owner
    @shop = current_user.shop
    render json: { errors: "You do not have a shop" }, status: :forbidden unless @shop
  end
end
