Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "/auth/signup", to: "users/registrations#create"
      post "/auth/login", to: "users/sessions#create"

      resources :products, only: [ :index, :show ]

      resources :shops, only: [ :create ] do
        collection do
          get :status
        end

        resources :categories, controller: "shops/categories", only: [ :index ]

        resources :products, controller: "shops/products", only: [ :index ]
      end

      resources :categories, only: [ :index, :show, :create ] do
        collection do
          get :roots
        end
      end

      namespace :vendor do
        resources :products

        resources :categories, only: [ :index, :show, :create, :update, :destroy ] do
          collection do
            patch :reorder
          end
        end
      end
    end
  end

  # Health check
  get "up" => "rails/health#show", as: :rails_health_check
end
