require_relative 'boot'

require 'rails/all'
require 'action_view/railtie'
require 'sprockets/railtie'
require 'sprockets/es6'
require 'babel/transpiler'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module MilesBoard
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components')
    config.assets.paths << Rails.root.join('node_modules')
    config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components', 'bootstrap', 'less')
    config.assets.paths << Rails.root.join('app', 'assets', 'stylesheets', 'teams.css.less')

    config.assets.precompile << /.*.(?:eot|svg|ttf|woff|woff2)$/

    # config.cache_store = :redis_store, 'redis://localhost:6379/0/cache', { expires_in: 90.minutes }
  end
end
