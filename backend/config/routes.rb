Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "/auth/signup", to: "users/registrations#create"
      post "/auth/login", to: "users/sessions#create"

      resources :products, only: [ :index ]

      resources :shops, only: [ :create ] do
        collection do
          get :status
        end

        resources :categories, controller: "shops/categories", only: [ :index, :create, :update, :destroy ] do
           collection do
             patch :reorder
           end
        end

        resources :products, controller: "shops/products", only: [ :index, :show ]
      end

      resources :categories, only: [ :index, :show, :create ] do
        collection do
          get :roots
        end
      end

      namespace :vendor do
        resources :products
      end
    end
  end

  # Health check
  get "up" => "rails/health#show", as: :rails_health_check
end
