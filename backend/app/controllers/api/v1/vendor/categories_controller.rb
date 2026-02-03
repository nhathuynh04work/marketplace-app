class Api::V1::Vendor::CategoriesController < Api::V1::Vendor::BaseController
  before_action :set_category, only: %i[show update destroy]

  def index
    categories = @shop.shop_categories.ordered

    render json: ShopCategoryBlueprint.render_as_hash(categories), status: :ok
  end

  def show
    render json: ShopCategoryBlueprint.render_as_hash(@category), status: :ok
  end

  def create
    category = @shop.shop_categories.new(category_params)
    max_order = @shop.shop_categories.maximum(:display_order) || 0
    category.display_order = max_order + 1

    if category.save
      render json: ShopCategoryBlueprint.render_as_hash(category), status: :ok
    else
      render json: { errors: category.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @category.update(category_params)
      render json: ShopCategoryBlueprint.render_as_hash(@category), status: :ok
    else
      render json: { errors: @category.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @category.destroy
    render json: {}, status: :ok
  end

  def reorder
    ActiveRecord::Base.transaction do
      params[:ordered_ids].each_with_index do |id, index|
        @shop.shop_categories.where(id: id).update_all(display_order: index + 1)
      end
    end

    render json: {}, status: :ok
  rescue StandardError => e
    render json: { errors: e.message }, status: :unprocessable_entity
  end

  private

  def set_category
    @category = @shop.shop_categories.find_by(id: params[:id])
    render json: { errors: "Category not found" }, status: :not_found unless @category
  end

  def category_params
    params.expect(shop_category: [ :name, :is_active ])
  end
end
