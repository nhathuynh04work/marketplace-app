class UserBlueprint < Blueprinter::Base
  identifier :id

  fields :email

  view :with_shop do
    association :shop, blueprint: ShopBlueprint
    field :is_vendor do |user, _options|
      user.vendor?
    end
  end
end
