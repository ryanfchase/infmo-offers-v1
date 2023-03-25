Rails.application.routes.draw do
  # get '/signup', to: 'users#new'
  # get '/login', to: 'sessions#new'
  # post '/login', to: 'sessions#create'
  # delete '/logout', to: 'sessions#destroy'
  namespace :api do
    namespace :v1 do
      resources :offers, only: [:index, :show]
      devise_for :users, path: '', path_names: {
        sign_in: 'login',
        sign_out: 'logout',
        registration: 'signup'
      },
      controllers: {
        sessions: 'api/v1/user/sessions',
        registrations: 'api/v1/user/registrations'
      }
      # resources :users, only: [:new, :create, :show]
    end
  end
end
