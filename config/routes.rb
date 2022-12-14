Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get '/map', to: "pages#map"
  # Defines the root path route ("/")
  # root "articles#index"
  # user route implemented through devise
  # messages and chatroom for later

  resources :chatrooms, only: %i[index show create] do
    resources :messages, only: %i[create]
  end

  resources :friends, only: %i[create index show destroy] do
    resources :user_friends, only: %i[create]
  end

  resources :user_friends, only: %i[destroy]

  resources :helplines, only: %i[show]


  get 'activate', to: 'pages#activate'
  get 'deactivate', to: 'pages#deactivate'
  get 'unfriend', to: 'pages#unfriend'
  get 'find_friends', to: 'friends#find_friends'
  get 'profile/:id', to: 'pages#profile', as: 'profile'
  get 'send_location', to: 'pages#send_location'
  get 'my_profile', to: 'pages#my_profile', as: 'my_profile'
  get 'voice' => 'twilio#voice'
end
