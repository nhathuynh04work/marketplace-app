Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "/auth/signup", to: "users/registrations#create"
      post "/auth/login", to: "users/sessions#create"

      resources :shops, only: [ :create ] do
        collection do
          get :status
        end
      end
    end
  end

  # Health check
  get "up" => "rails/health#show", as: :rails_health_check
end
