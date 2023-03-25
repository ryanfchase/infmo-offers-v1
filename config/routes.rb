Rails.application.routes.draw do
  root 'offers#home'
  get '/signup', to: 'users#new'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  resources :offers, only: [:show]
  resources :users, only: [:new, :create, :show]
end
