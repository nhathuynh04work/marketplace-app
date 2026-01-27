class ProductBlueprint < Blueprinter::Base
  identifier :id

  fields :name, :slug, :description, :price, :stock_quantity, :status, :created_at, :updated_at

  association :category, blueprint: CategoryBlueprint
  association :shop_category, blueprint: ShopCategoryBlueprint
end
