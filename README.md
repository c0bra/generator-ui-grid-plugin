# UI-Grid Plugin Generator

<!-- [![Travis](https://img.shields.io/travis/c0bra/ui-grid-plugin-skeleton.svg)](https://travis-ci.org/c0bra/ui-grid-plugin-skeleton) [![devDependencies](https://img.shields.io/david/dev/c0bra/ui-grid-plugin-skeleton.svg?style=flat)](https://david-dm.org/c0bra/ui-grid-plugin-skeleton#info=devDependencies) [![Coveralls](https://img.shields.io/coveralls/c0bra/ui-grid-plugin-skeleton.svg?style=flat)](https://coveralls.io/r/c0bra/ui-grid-plugin-skeleton) -->

This repo is a starter template for [UI-Grid](http://ui-grid.info) plugins.

# What You Get

* Standard Angular project build cycle, with jshint, jsrc, ngAnnotate, and lesscss
* Automated tests with Karma
* ~~Automated e2e tests with Protractor~~
* Automated docs generation with Dgeni
* Development environment based on your docs: use examples to demonstrate and test functionality.
* Automated publishing with gh-pages: use your generated docs files to create your plugin's website.

# Get Started

Install yeoman if you don't already have it, and the plugin generator:

    npm install -g yeoman generator-ui-grid-plugin

Create your plugin folder and bootstrap the plugin

    mkdir my-plugin
    cd my-plugin
    yo ui-grid-plugin

Follow the prompts. The generator will ask you for your plugin's name, its description, and blah. Wait for all the dependencies to be installed, then you can get started.

# Run it!
    
You can start up a development task like so. It will run on port 4000. If you want another port there's a switch for that.

    gulp watch
    gulp watch --port 9999

# Writing Your Plugin

* All the .js files in src/ will be concatenated together and ngAnnotated.
* Tests in test/ will be run with karma.
* You can add tutorials by putting .md files in `docs/content/`. They use markdown and @ngdoc formatting.
* You can add whatever other dependencies you need, from npm or bower.

# Caveats

* The JSHint and JSCS config follows the same practices that UI-Grid does (or at least UI-Grid tries to). It's kind of strict, so if you want to make modifications feel free.

# Badges

There's a generator for adding badge/shield images to the top of your README.md Just run this and select the options you want (you'll need to have your repository set in package.json):

    yo ui-grid-plugin:badges

## Coveralls

One of the badges is for Coveralls, and you'll need to sign up at http://coveralls.io if you want to use it. It's a great free, automated test coverage tool.

# Publish

In order for Travis to publish your generated content to your gh-pages branch on GitHub, you need to give it a secure token it can use. Travis has a ruby gem for encrypting strings:

    gem install travis

    travis login
    # enter your login info

    travis encrypt GITHUB_TOKEN=youtokenhere

It will print out the encrypted string. It's important to make sure you use `GITHUB_TOKEN` as the name and that you're in your project folder and have

You can run this generator to add it:

    yo ui-grid-plugin:travis

It will prompt you for the encrypted string, and will store it in your `.travis.yml` file. Be sure to paste *just* the encrypted string and not the ` - secure: ` prefix.
