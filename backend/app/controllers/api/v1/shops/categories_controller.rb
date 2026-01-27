class Api::V1::Shops::CategoriesController < ApplicationController
  before_action :set_shop

  def index
    categories = @shop.shop_categories.active.ordered

    render_success(
      message: "Shop categories fetched",
      data: ShopCategoryBlueprint.render_as_hash(categories)
    )
  end

  private

  def set_shop
    @shop = Shop.find_by(id: params[:shop_id])
    render_error(message: "Shop not found", status: :not_found) unless @shop
  end
end
