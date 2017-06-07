Rails.application.routes.draw do

  get 'team_member_lists/index'

  get 'team_member_lists/show'

  get 'team_member_lists/create'

  get 'team_member_lists/update'

  get    'runs',       to: 'runs#index',  as: 'runs_path'
  get    'runs/:id',   to: 'runs#show',   as: 'runs_show', constraints: { id: /[0-9]+/ }
  post   'runs',       to: 'runs#create', as: 'runs_create'
  put    'runs/:id',   to: 'runs#update', as: 'runs_update', constraints: { id: /[0-9]+/ }
  put    'runs',       to: 'runs#update', as: 'runs_bulk_update'
  delete 'runs/:id',   to: 'runs#delete', as: 'runs_delete', constraints: { id: /[0-9]+/ }

  get    'teams',       to: 'teams#index',  as: 'teams_path'
  get    'teams/:id',   to: 'teams#show',   as: 'teams_show', constraints: { id: /[0-9]+/ }
  post   'teams',       to: 'teams#create', as: 'teams_create'
  put    'teams/:id',   to: 'teams#update', as: 'teams_update', constraints: { id: /[0-9]+/ }
  put    'teams',       to: 'teams#update', as: 'teams_bulk_update'
  delete 'teams/:id',   to: 'teams#delete', as: 'teams_delete', constraints: { id: /[0-9]+/ }

  get    'users',       to: 'users#index',  as: 'users_path'
  get    'users/:id',   to: 'users#show',   as: 'users_show', constraints: { id: /[0-9]+/ }
  post   'users',       to: 'users#create', as: 'users_create'
  put    'users/:id',   to: 'users#update', as: 'users_update', constraints: { id: /[0-9]+/ }
  put    'users',       to: 'users#update', as: 'users_bulk_update'
  delete 'users/:id',   to: 'users#delete', as: 'users_delete', constraints: { id: /[0-9]+/ }

  root to: 'application#angular'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
