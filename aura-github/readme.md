# AuraHub example

## Installing

Create a Github App 
    
    open https://github.com/settings/applications/new

With 

Main Url:       `http://localhost:8000/`
Callback Url:   `http://localhost:8000/auth.php`

create a `config.ini` file (following the config.ini.example format).

Then serve this repo via apache or start a php dev server (php >= 5.4 required) : 

    php -S localhost:8000 -t public

## Deploying on heroku 

    heroku create --buildpack https://github.com/heroku/heroku-buildpack-php.git
    
    heroku config:add \
      GITHUB_CLIENT_ID='your-github-app-id' \
      GITHUB_CLIENT_SECRET='your-github-app-secret'

    git push heroku master

And don't forget to update the urls on your Github App config to match the ones on Heroku.

## Hacking

Install [node.js](http://nodejs.org) (Only used for building the app, not needed for deployment)

[grunt-cli](https://github.com/gruntjs/grunt-cli) as a global module.

    [sudo] npm install grunt-cli -g
    [sudo] npm install bower -g

then install grunt and it's modules in the project's folder.

    cd aura-github/
    npm install
    bower install

To rebuild the dependencies

    grunt build
