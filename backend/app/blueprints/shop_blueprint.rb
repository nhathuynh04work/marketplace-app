class ShopBlueprint < Blueprinter::Base
  identifier :id

  fields :name, :slug, :description, :created_at
end
