Rails.application.routes.draw do
  devise_for :users, path: "", path_names: {
    sign_in: "login",
    sign_out: "logout",
    registration: "signup"
  },
  controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations"
  }

  devise_scope :user do
    post "signup", to: "users/registrations#create"
  end

  resources :shops, only: [ :create ] do
    collection do
      get :check
    end
  end

  # Health check
  get "up" => "rails/health#show", as: :rails_health_check
end
