class Api::V1::CategoriesController < ApplicationController
  before_action :authenticate_user, only: [ :create ]

  def index
    categories = Category.all.order(name: :asc)
    data = CategoryBlueprint.render_as_json(categories)

    render_success(message: "Categories fetched", data: data)
  end


  def roots
    categories = Category.roots.order(name: :asc)
    data = CategoryBlueprint.render_as_json(categories, view: :root_with_check)

    render_success(message: "Root categories fetched", data: data)
  end

  def show
    category = Category.find(params[:id])
    data = CategoryBlueprint.render_as_json(category, view: :tree)

    render_success(message: "Category fetched", data: data)
  rescue ActiveRecord::RecordNotFound
    render_error(message: "Category not found", status: :not_found)
  end

  def create
    category = Category.new(category_params)

    if category.save
        data = CategoryBlueprint.render_as_json(category)
        render_success(message: "Category created", data: data)
    else
       render_error(message: "Creation failed", errors: category.errors)
    end
  end

  private

  def category_params
    params.expect(category: [ :name, :parent_id, :description ])
  end
end
