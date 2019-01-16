Rails.application.routes.draw do
  
  root to: 'cctv#home'
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
 	
 	resources :customers , only: [:new, :create, :update, :show, :edit]
 	get '/customers', to: 'customers#new'
 	
end
