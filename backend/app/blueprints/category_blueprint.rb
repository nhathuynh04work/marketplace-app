class CategoryBlueprint < Blueprinter::Base
  identifier :id

  fields :name, :slug, :ancestry, :description

  view :tree do
    association :children, blueprint: CategoryBlueprint, view: :tree
  end

  view :root_with_check do
    field :has_children do |category, _options|
      !category.is_childless?
    end
  end
end
