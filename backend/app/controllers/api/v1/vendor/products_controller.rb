class Api::V1::Vendor::ProductsController < Api::V1::Vendor::BaseController
  before_action :set_product, only: %i[show update destroy]

  def index
    products = @shop.products.ordered.with_attached_images

    render json: {
      products: ProductBlueprint.render_as_hash(products)
    }, status: :ok
  end

  def show
    render json: {
      product: ProductBlueprint.render_as_hash(@product)
    }, status: :ok
  end

  def create
    @product = @shop.products.build(product_params)

    if @product.save
      render json: {
        product: ProductBlueprint.render_as_hash(@product)
      }, status: :ok
    else
      render json: { errors: @product.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @product.update(product_params)
      render json: {
        product: ProductBlueprint.render_as_hash(@product)
      }, status: :ok
    else
      render json: { errors: @product.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @product.destroy
    render json: {}, status: :ok
  end

  private

  def set_product
    @product = @shop.products.find_by(id: params[:id])
    render json: { errors: "Product not found" }, status: :not_found unless @product
  end

  def product_params
    params.expect(product: [
      :name, :description, :price, :stock_quantity,
      :status, :category_id, :shop_category_id, images: []
    ])
  end
end
