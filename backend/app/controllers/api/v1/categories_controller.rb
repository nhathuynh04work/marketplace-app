class Api::V1::CategoriesController < ApplicationController
  before_action :authenticate_user!, only: [ :create ]

  def index
    categories = Category.all.order(name: :asc)
    data = CategoryBlueprint.render_as_json(categories)

    render json: data, status: :ok
  end


  def roots
    categories = Category.roots.order(name: :asc)
    data = CategoryBlueprint.render_as_json(categories, view: :root_with_check)

    render json: data, status: :ok
  end

  def show
    category = Category.find(params[:id])
    data = CategoryBlueprint.render_as_json(category, view: :tree)

    render json: data, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { errors: "Category not found" }, status: :not_found
  end

  def create
    category = Category.new(category_params)

    if category.save
      data = CategoryBlueprint.render_as_json(category)
      render json: data, status: :ok
    else
      render json: { errors: category.errors }, status: :unprocessable_entity
    end
  end

  private

  def category_params
    params.expect(category: [ :name, :parent_id, :description ])
  end
end
