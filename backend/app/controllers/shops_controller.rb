class ShopsController < ApplicationController
  before_action :authenticate_user!

  def check
    render_success(
      message: "Shop status retrieved",
      data: {
        has_shop: current_user.vendor?,
        shop: current_user.shop
      }
    )
  end

  def create
    return render_error(message: "You already have a shop", status: :conflict) if current_user.vendor?

    @shop = current_user.build_shop(shop_params)

    if @shop.save
      render_success(message: "Shop created successfully!", data: { shop: @shop })
    else
      render_error(message: "Failed to register shop", errors: @shop.errors)
    end
  end

  private

  def shop_params
    params.expect(shop: [ :name, :description, :slug ])
  end
end
