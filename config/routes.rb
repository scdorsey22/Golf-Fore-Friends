Rails.application.routes.draw do
  


  namespace :api do
    resources :users, only: [:index, :create, :show, :update, :destroy] do
      patch :update_without_password, on: :member
    end
    resources :golf_buddies, only: [:index, :create, :destroy, :show]
    resources :comments, only: [:index, :create, :show, :update, :destroy]
    resources :rounds, only: [:index, :create, :show, :update, :destroy]


    
    post "/login", to: "sessions#create"
    delete '/logout', to: 'sessions#destroy'
    post '/forgot_password', to: 'passwords#forgot'
    post '/reset_password', to: "passwords#reset"
    get "/me", to: "sessions#show"
    put '/me', to: 'users#update'# config/routes.rb
    patch '/users/:id', to: 'users#update'
    delete '/me', to: 'users#delete'
    
    

  end 

  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
