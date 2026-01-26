class ProductBlueprint < Blueprinter::Base
  identifier :id

  fields :name, :slug, :description, :price, :stock_quantity, :status, :created_at, :updated_at

  association :category, blueprint: CategoryBlueprint
  association :shop_category, blueprint: ShopCategoryBlueprint

  # Example for images if using ActiveStorage
  # field :images do |product|
  #   product.images.map { |img| Rails.application.routes.url_helpers.url_for(img) }
  # end
end
