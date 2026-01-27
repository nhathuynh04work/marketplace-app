class Api::V1::Shops::ProductsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_shop
  before_action :set_product, only: %i[show update destroy]

  def index
    products = @shop.products.ordered

    render_success(
      data: {
        products: ProductBlueprint.render_as_hash(products)
      }
    )
  end

  def show
    render_success(
      data: {
        product: ProductBlueprint.render_as_hash(@product)
      }
    )
  end

  def create
    @product = @shop.products.build(product_params)

    if @product.save
      render_success(
        message: "Product created successfully",
        status: :created,
        data: {
          product: ProductBlueprint.render_as_hash(@product)
        }
      )
    else
      render_error(message: "Failed to create product", errors: @product.errors)
    end
  end

  def update
    if @product.update(product_params)
      render_success(
        message: "Product updated successfully",
        data: {
          product: ProductBlueprint.render_as_hash(@product)
        }
      )
    else
      render_error(message: "Failed to update product", errors: @product.errors)
    end
  end

  def destroy
    @product.destroy
    render_success(message: "Product deleted successfully")
  end

  private

  def set_shop
    @shop = current_user.shop
    render_error(message: "Shop not found", status: :not_found) unless @shop
  end

  def set_product
    @product = @shop.products.find_by(id: params[:id])
    render_error(message: "Product not found", status: :not_found) unless @product
  end

  def product_params
    params.expect(product: [
      :name, :description, :price, :stock_quantity,
      :status, :category_id, :shop_category_id
    ])
  end
end
