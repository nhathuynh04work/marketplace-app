class Api::V1::ProductsController < ApplicationController
  def index
    products = Product.active.ordered

    render_success(
      data: {
        products: ProductBlueprint.render_as_hash(products)
      }
    )
  end
end
