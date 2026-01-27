class Api::V1::Shops::ProductsController < ApplicationController
  before_action :set_shop

  def index
    products = @shop.products.active.ordered

    if params[:shop_category_id].present?
      products = products.where(shop_category_id: params[:shop_category_id])
    end

    render_success(
      data: {
        products: ProductBlueprint.render_as_hash(products)
      }
    )
  end

  def show
    product = @shop.products.active.find_by(id: params[:id])

    if product
      render_success(
        data: {
          product: ProductBlueprint.render_as_hash(product)
        }
      )
    else
      render_error(message: "Product not found", status: :not_found)
    end
  end

  private

  def set_shop
    @shop = Shop.find_by(id: params[:shop_id])
    render_error(message: "Shop not found", status: :not_found) unless @shop
  end
end
