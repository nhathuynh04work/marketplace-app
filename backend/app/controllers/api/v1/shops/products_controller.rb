class Api::V1::Shops::ProductsController < ApplicationController
  before_action :set_shop

  def index
    products = @shop.products.active.ordered
                    .filter_by_shop_category(params[:shop_category_id])

    render_success(data: { products: ProductBlueprint.render_as_hash(products) })
  end

  private

  def set_shop
    @shop = Shop.find_by(id: params[:shop_id])
    render_error(message: "Shop not found", status: :not_found) unless @shop
  end
end
