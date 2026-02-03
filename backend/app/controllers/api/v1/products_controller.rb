class Api::V1::ProductsController < ApplicationController
  def index
    products = Product.active
                      .ordered
                      .with_attached_images
                      .includes(:shop, :category, :shop_category)

    render json: { products: ProductBlueprint.render_as_hash(products) }, status: :ok
  end

  def show
    product = Product.active
                      .with_attached_images
                      .includes(:shop, :category, :shop_category)
                      .find_by(id: params[:id])

    if product
      render json: { product: ProductBlueprint.render_as_hash(product) }, status: :ok
    else
      render json: { errors: "Product not found" }, status: :not_found
    end
  end
end
