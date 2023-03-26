Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_for :users, path: '', path_names: {
        sign_in: 'login',
        sign_out: 'logout',
        registration: 'signup'
      },
      controllers: {
        sessions: 'api/v1/users/sessions',
        registrations: 'api/v1/users/registrations'
      }
      resources :offers, only: [:index, :show]
      get '/users/me', to: '/api/v1/users/users#me' #, as: 'profile'

    end
  end
end
