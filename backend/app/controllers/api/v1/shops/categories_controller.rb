class Api::V1::Shops::CategoriesController < ApplicationController
  before_action :set_shop
  before_action :authenticate_user!, only: %i[create update destroy reorder]
  before_action :check_shop_ownership, only: %i[create update destroy reorder]

  def index
    categories = if is_shop_owner?
                   @shop.shop_categories.ordered
    else
                   @shop.shop_categories.active.ordered
    end

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
    category = @shop.shop_categories.find(params[:id])

    if category.update(category_params)
      render_success(
        message: "Category updated",
        data: ShopCategoryBlueprint.render_as_hash(category)
      )
    else
      render_error(errors: category.errors)
    end
  end

  def destroy
    category = @shop.shop_categories.find(params[:id])
    category.destroy
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

  def set_shop
    @shop = Shop.find(params[:shop_id])
  end

  def category_params
    params.require(:shop_category).permit(:name, :is_active)
  end

  def is_shop_owner?
    current_user && current_user.shop == @shop
  end

  def check_shop_ownership
    return if is_shop_owner?
    render_error(message: "You are not authorized to manage this shop", status: :forbidden)
  end
end
