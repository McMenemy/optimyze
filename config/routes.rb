Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :optimizations, only: [:create, :destroy, :index, :show, :update]
    resources :users, only: [:show]
  end
end
