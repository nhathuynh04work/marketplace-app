class ProductBlueprint < Blueprinter::Base
  identifier :id

  fields :name, :slug, :description, :price, :stock_quantity, :status

  association :shop, blueprint: ShopBlueprint
  association :category, blueprint: CategoryBlueprint
  association :shop_category, blueprint: ShopCategoryBlueprint
  association :images, blueprint: ImageBlueprint
end
