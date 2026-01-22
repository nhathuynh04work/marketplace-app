Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_for :users, path: "auth", path_names: {
        sign_in: "login",
        sign_out: "logout",
        registration: "signup"
      },
      controllers: {
        sessions: "api/v1/users/sessions",
        registrations: "api/v1/users/registrations"
      },
      defaults: { format: :json }

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
