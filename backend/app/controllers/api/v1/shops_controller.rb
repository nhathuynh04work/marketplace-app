class Api::V1::ShopsController < ApplicationController
  before_action :authenticate_user!

  def status
    shop_data = current_user.shop ? ShopBlueprint.render_as_hash(current_user.shop) : nil

    render_success(
      message: "Shop status retrieved",
      data: {
        has_shop: current_user.vendor?,
        shop: shop_data
      }
    )
  end

  def create
    return render_error(message: "You already have a shop", status: :conflict) if current_user.vendor?

    @shop = current_user.build_shop(shop_params)

    if @shop.save
      data = { shop: ShopBlueprint.render_as_hash(@shop) }
      render_success(message: "Shop created successfully!", data: data)
    else
      render_error(message: "Failed to register shop", errors: @shop.errors)
    end
  end

  private

  def shop_params
    params.expect(shop: [ :name, :description, :slug ])
  end
end
