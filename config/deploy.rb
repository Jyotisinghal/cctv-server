# config valid only for current version of Capistrano
lock "3.10.0"

# setup rbenv.
set :rbenv_type, :user
set :rbenv_ruby, '2.6.0'

set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"
set :rbenv_map_bins, %w{rake gem bundle ruby rails}
set :rbenv_roles, :all
  
server '134.209.154.250', roles: [:web, :app, :db], primary: true

set :repo_url,        'git@github.com:Jyotisinghal/cctv-server.git'
set :application,     'cctvserver'
set :application_url, 'cctvserver.com'
set :user,            'cctv_deployer'
set :timezone,        "Asia/Kolkata"
set :branch,          "master"
set :server_names,    "134.209.154.250"
set :deploy_via, :remote_cache
set :full_app_name,   "cctvserver"

set :mysql_database, "#{fetch(:application)}_production"
set :mysql_user,     "root"
set :mysql_password, "6WHd7RgrXMVAswHyYcUgSh#"

set :puma_threads,    [4, 16]
set :puma_workers,    0

# Don't change these unless you know what you're doing
set :pty,             true
set :use_sudo,        true
set :stage,           :production
set :deploy_via,      :remote_cache
set :deploy_to,       "/home/#{fetch(:user)}/apps/#{fetch(:application)}"
set :ssh_options,     { forward_agent: true, user: fetch(:user), keys: %w(~/.ssh/smarttecho) }

# how many old releases do we want to keep, not much
set :keep_releases, 3
set :unicorn_worker_count, 1

# dirs we want symlinking to shared
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

set :assets_dependencies, %w(app/assets lib/assets vendor/assets Gemfile.lock config/routes.rb)

# Setup SSL if you have certificate
set :setup_ssl, false
set :ssl_cert, "ssl_cert.crt"
set :ssl_cert_key, "ssl_private_key.key"

# which config files should be copied by deploy:setup_config
# see documentation in lib/capistrano/tasks/setup_config.cap
# for details of operations
set(:config_files, %w(
  nginx.conf
  nginx.mime.types
  database.yml
  log_rotation
  monit
  unicorn.rb
  unicorn_init.sh
  user_aliases
))

#ssh_options[:verbose] = :debug

# OS
# => OS Update / Upgrade -- done

# Utilities (apt-get)
# => htop, iotop, logrotate -- done
# => vim, less, wget, curl -- done
# => git-core (apt-get) -- done
# => mytop (apt-get) -- done

# Security
# => SSH Hardending (configure) -- done
# => UFW (apt-get + configure) -- done
# => Adding Deploy User -- done
# => Adding deploy user to admin group -- done
# => Installing keys -- done
# => Backup scripts -- done

# Application
# => Ruby 1.9.3 (brightbox) -- done
# => Nginx (brightbox) -- done
# => Unicorn (recipe) -- done
# => Beanstalkd (apt-get ; binlogs ) -- done
# => Memcached (apt-get) -- done
# => XSLT and XML2 libs for nokogiri (apt-get) -- done
# => Imagemagick libraries (apt-get) -- done
# => postfix - (apt-get) -- done
# => bsd_mailx - (apt-get) -- done
# => Cron jobs -- done
#
# files which need to be symlinked to other parts of the
# filesystem. For example nginx virtualhosts, log rotation
# init scripts etc. The full_app_name variable isn't
# available at this point so we use a custom template {{}}
# tag and then add it at run time.
set(:symlinks, [
  {
    source: "nginx.conf",
    link: "/etc/nginx/sites-enabled/{{full_app_name}}"
  },
  {
    source: "nginx.mime.types",
    link: "/etc/nginx/mime.types"
  },
  {
    source: "unicorn_init.sh",
    link: "/etc/init.d/unicorn_{{full_app_name}}"
  },
  {
    source: "log_rotation",
   link: "/etc/logrotate.d/{{full_app_name}}"
  },
  {
    source: "user_aliases",
  link: ".bash_aliases"
  },
  {
    source: "database.yml",
    link: "<%=release_path%>/config/database.yml"
  }
])

# this:
# http://www.capistranorb.com/documentation/getting-started/flow/
# is worth reading for a quick overview of what tasks are called
# and when for `cap stage deploy`

namespace :deploy do
  # make sure we're deploying what we think we're deploying
  before :deploy, "deploy:check_revision"
  # only allow a deploy with passing tests to deployed
  # before :deploy, "deploy:run_tests"
  # compile assets locally then rsync
  before 'deploy:symlink:shared', 'deploy:setup_config'
  after 'deploy:symlink:shared', 'deploy:compile_assets_locally'
  after :finishing, 'deploy:cleanup'

  # remove the default nginx configuration as it will tend
  # to conflict with our configs.
  before 'deploy:setup_config', 'nginx:remove_default_vhost'

  # reload nginx to it will pick up any modified vhosts from
  # setup_config
  after 'deploy:setup_config', 'nginx:reload'

  # Restart monit so it will pick up any monit configurations
  # we've added
  # after 'deploy:setup_config', 'monit:restart'

  # As of Capistrano 3.1, the `deploy:restart` task is not called
  # automatically.
  after 'deploy:publishing', 'deploy:restart'
end