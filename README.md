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
