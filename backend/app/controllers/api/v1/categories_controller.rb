class Api::V1::CategoriesController < ApplicationController
  before_action :authenticate_user, only: [ :create ]

  def index
    categories = Category.all.arrange_serializable
    render_success(message: "Categories fetched", data: categories)
  end


  def roots
    categories = Category.roots.order(name: :asc).to_a
    root_ids = categories.map(&:id).map(&:to_s)

    root_ids_with_children = Category.where(ancestry: root_ids)
                                     .distinct
                                     .pluck(:ancestry)

    data = categories.map do |category|
      category.as_json.merge(
        has_children?: root_ids_with_children.include?(category.id.to_s)
      )
    end

    render_success(message: "Root categories fetched", data: data)
  end

  def show
    category = Category.find(params[:id])

    data = category.as_json.merge(
      children: category.children.order(name: :asc)
    )

    render_success(message: "Category fetched", data: data)
  rescue ActiveRecord::RecordNotFound
    render_error(message: "Category not found", status: :not_found)
  end

  def create
    category = Category.new(category_params)

    if category.save
        render_success(message: "Category created", data: category)
    else
       render_error(message: "Creation failed", errors: category.errors)
    end
  end

  private

  def category_params
    params.require(:category).permit(:name, :parent_id, :description)
  end
end
