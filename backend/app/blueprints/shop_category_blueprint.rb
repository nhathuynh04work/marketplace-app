class ShopCategoryBlueprint < Blueprinter::Base
  identifier :id

  fields :name, :display_order, :is_active, :created_at
end
