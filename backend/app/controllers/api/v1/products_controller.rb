class Api::V1::ProductsController < ApplicationController
  def index
    products = Product.active
                      .ordered
                      .with_attached_images
                      .includes(:shop, :category, :shop_category)

    render_success(data: { products: ProductBlueprint.render_as_hash(products) })
  end

  def show
    product = Product.active
                      .with_attached_images
                      .includes(:shop, :category, :shop_category)
                      .find_by(id: params[:id])

    if product
      render_success(data: { product: ProductBlueprint.render_as_hash(product) })
    else
      render_error(message: "Product not found", status: :not_found)
    end
  end
end
