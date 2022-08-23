Rails.application.routes.draw do
  

  resources :comments, only: [:index, :create, :show, :update, :destroy]
  resources :rounds, only: [:index, :create, :show, :update, :destroy]
  namespace :api do
    resources :users, only: [:index, :create, :show, :update, :destroy]
    resources :golf_buddies, only: [:index, :create, :destroy, :show]


    
    post "/login", to: "sessions#create"
    delete '/logout', to: 'sessions#destroy'
    post '/forgot_password', to: 'passwords#forgot'
    post '/reset_password', to: "passwords#reset"
    get "/me", to: "sessions#show"

  end 

  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
