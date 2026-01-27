class Api::V1::Vendor::CategoriesController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_shop_owner
  before_action :set_category, only: %i[update destroy]

  def index
    categories = @shop.shop_categories.ordered

    render_success(
      message: "Shop categories fetched",
      data: ShopCategoryBlueprint.render_as_hash(categories)
    )
  end

  def create
    category = @shop.shop_categories.new(category_params)
    max_order = @shop.shop_categories.maximum(:display_order) || 0
    category.display_order = max_order + 1

    if category.save
      render_success(
        message: "Category created",
        data: ShopCategoryBlueprint.render_as_hash(category)
      )
    else
      render_error(errors: category.errors)
    end
  end

  def update
    if @category.update(category_params)
      render_success(
        message: "Category updated",
        data: ShopCategoryBlueprint.render_as_hash(@category)
      )
    else
      render_error(errors: @category.errors)
    end
  end

  def destroy
    @category.destroy
    render_success(message: "Category deleted")
  end

  def reorder
    ActiveRecord::Base.transaction do
      params[:ordered_ids].each_with_index do |id, index|
        @shop.shop_categories.where(id: id).update_all(display_order: index + 1)
      end
    end

    render_success(message: "Categories reordered")
  rescue StandardError => e
    render_error(message: "Reorder failed", errors: e.message)
  end

  private

  def ensure_shop_owner
    @shop = current_user.shop
    unless @shop
      render_error(message: "You do not have a shop", status: :forbidden)
    end
  end

  def set_category
    @category = @shop.shop_categories.find_by(id: params[:id])
    render_error(message: "Category not found", status: :not_found) unless @category
  end

  def category_params
    params.require(:shop_category).permit(:name, :is_active)
  end
end
