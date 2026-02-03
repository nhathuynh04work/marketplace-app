class Api::V1::Shops::ProductsController < ApplicationController
  before_action :set_shop

  def index
    products = @shop.products.active.ordered
                    .filter_by_shop_category(params[:shop_category_id])

    render json: { products: ProductBlueprint.render_as_hash(products) }, status: :ok
  end

  private

  def set_shop
    @shop = Shop.find_by(id: params[:shop_id])
    render json: { errors: "Shop not found" }, status: :not_found unless @shop
  end
end
