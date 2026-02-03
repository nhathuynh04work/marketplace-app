class Api::V1::ShopsController < ApplicationController
  before_action :authenticate_user!

  def status
    shop_data = current_user.shop ? ShopBlueprint.render_as_hash(current_user.shop) : nil

    render json: {
      has_shop: current_user.vendor?,
      shop: shop_data
    }, status: :ok
  end

  def create
    return render json: { errors: "You already have a shop" }, status: :conflict if current_user.vendor?

    @shop = current_user.build_shop(shop_params)

    if @shop.save
      render json: { shop: ShopBlueprint.render_as_hash(@shop) }, status: :ok
    else
      render json: { errors: @shop.errors }, status: :unprocessable_entity
    end
  end

  private

  def shop_params
    params.expect(shop: [ :name, :description, :slug ])
  end
end
