Rails.application.routes.draw do
  get 'invitation_codes/index'

  get 'invitation_codes/show'

  get 'invitation_codes/create'

  get 'invitation_codes/update'

  get 'invitation_codes/delete'

  mount_devise_token_auth_for 'User', at: 'auth'

  get 'team_member_lists',      to: 'team_member_lists#index',  as: 'team_member_lists_path'
  get 'team_member_lists/:id',  to: 'team_member_lists#show',   as: 'team_member_lists_show'
  post 'team_member_lists',     to: 'team_member_lists#create', as: 'team_member_lists_create'
  put 'team_member_lists/:id',  to: 'team_member_lists#update', as: 'team_member_lists_update'

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

  get     'team_owners',        to: 'team_owners#index',    as: 'team_owners_path'
  get     'team_owners/:id',    to: 'team_owners#show',     as: 'team_owners_show'
  post    'team_owners',        to: 'team_owners#create',   as: 'team_owners_create'
  put     'team_owners/:id',    to: 'team_owners#update',   as: 'team_owners_update'
  delete  'team_owners/:id',    to: 'team_owners#delete',   as: 'team_owners_delete'

  get     'team_members',        to: 'team_members#index',  as: 'team_members_path'
  get     'team_members/:id',    to: 'team_members#show',   as: 'team_members_show'
  post    'team_members',        to: 'team_members#create', as: 'team_members_create'
  put     'team_members/:id',    to: 'team_members#update', as: 'team_members_update'
  delete  'team_members/:id', to: 'team_members#delete',    as: 'team_members_delete'

  get    'users',       to: 'users#index',  as: 'users_path'
  get    'users/:id',   to: 'users#show',   as: 'users_show', constraints: { id: /[0-9]+/ }
  get    'users/resend_confirmation', to:'users#resend_confirmation', as:'users_resend_confirmation'
  post   'users',       to: 'users#create', as: 'users_create'
  put    'users/:id',   to: 'users#update', as: 'users_update', constraints: { id: /[0-9]+/ }
  put    'users',       to: 'users#update', as: 'users_bulk_update'
  delete 'users/:id',   to: 'users#delete', as: 'users_delete', constraints: { id: /[0-9]+/ }

  root to: 'application#angular'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
