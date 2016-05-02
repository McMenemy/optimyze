Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :optimizations, only: [:create, :destroy, :index, :show, :update]
    resources :users, only: [:show]
    # filter api
    post 'filtered', to: 'optimizations#filtered_params'

    # front end auth
    post 'auth/signin', to: 'auth#signin'
    post 'auth/signup', to: 'auth#signup'
    delete 'auth/signout', to: 'auth#signout'
    post 'auth/session', to: 'auth#sign_in_session'
  end

end
