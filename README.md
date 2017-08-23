# Photo app documentation

## Setup

### These are the steps followed (from the Udemy course entitled "The Complete Ruby on Rails Developer Course") for the setup of the project with Rails

```bash
$ rails new photo-app
$ cd photo-app
$ rails g controller welcome index
```

In `routes.rb` switch `get 'welcome/index'` to `root 'welcome#index'` to set the root path. Root path will now load the index action in the welcome controller.

In `Gemfile` move `gem 'sqlite3'` under `group development, test`; create a `group production` and place inside it `gem 'pg'` and `gem 'rails_12factor'`; under `gem 'rails'` add `gem 'devise'`, `gem 'twitter-bootstrap-rails'` and `gem 'devise-bootstrap-views'`.

*This switches the development db to sqlite3 and production db to postgres. It also adds Devise, Bootstrap and Bootstrap for Devise, which automatically converts Devise forms into Bootstrapped forms.*
<br/>

```bash
$ bundle install --without production
$ rails g devise:install
$ rails g devise User
```

Before migrating, in the migration file `[timestamp]_devise_create_users.rb` uncomment the 4 attributes under `Confirmable` and in `models/user.rb` add `:confirmable` to the list of devise modules.

```bash
$ rake db:migrate
```

In `application_controller.rb`, under `protect_from_forgery`, add in `before_action :authenticate_user`
In `welcome_controller.rb`, add in `skip_before_action :authenticate_user!, only: [:index]`

*The first line means that for all controllers, the user must be authenticated, but the second line makes an exception for the index action in the welcome controller*
<br/>

```bash
$ rails g bootstrap:install static
$ rails g bootstrap:layout application # Y to force override
$ rails g devise:views:locale en
$ rails g devise:views:bootstrap_templates
```

In `assets/stylesheets/application.cdd` add `*= require devise_botstrap_views` above `*= require_tree .`

*This adds bootstrap files and provides a layout, as well as building the bootstrap templates for devise*

<br/>

Configure the sending of emails using Sendgrid. At this point a verified Heroku account is necessary

```bash
$ heroku addons:create sendgrid:starter
$ heroku config:set SENDGRID_USERNAME=enterintheusername
$ heroku config:set SENDGRID_PASSWORD=enterinthepassword
```

In order to view the username and password:

```bash
$ heroku config:get SENDGRID_USERNAME # or _PASSWORD
```

In `.zshrc` (or `.bashrc` if not using ZSH) add the same information
```bash
export SENDGRID_USERNAME=enterintheusername
export SENDGRID_PASSWORD=enterinthepassword
```

In `config/environment.rb` add the action mailer configuration:

```
ActionMailer::Base.smtp_settings = {
  :address => 'smtp.sendgrid.net',
  :port => '587',
  :authentication => :plain,
  :user_name => ENV['SENDGRID_USERNAME'],
  :password => ENV['SENDGRID_PASSWORD'],
  :domain => 'heroku.com',
  :enable_starttls_auto => true
}
```

In `config/environments/development.rb` add development-specific configurations:

```
config.action_mailer.delivery_method = :test
config.action_mailer.default_url_options = { :host => 'https://localhost:3000' } # or whatever the local URL is
```

In `config/environemtns/production.rb` add production-specific configurations:

```
config.action_mailer.delivery_method = :smtp
config.action_mailer.default_url_options = { :host => 'appname.herokuapp.com', :protocol => 'https'}
```

In development, the confirmation email will just be displayed in the server console, so the confirmation link can be taken from there in order to verify the account.
