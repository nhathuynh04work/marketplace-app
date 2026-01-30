class ImageBlueprint < Blueprinter::Base
  identifier :id

  field :url do |image|
    Rails.application.routes.url_helpers.url_for(image)
  end

  field :filename do |image|
    image.filename.to_s
  end

  field :content_type do |image|
    image.content_type
  end
end
