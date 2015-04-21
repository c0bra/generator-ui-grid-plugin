# UI-Grid Plugin Skeleton

[![Travis](https://img.shields.io/travis/c0bra/ui-grid-plugin-skeleton.svg)](https://travis-ci.org/c0bra/ui-grid-plugin-skeleton) [![devDependencies](https://img.shields.io/david/dev/c0bra/ui-grid-plugin-skeleton.svg?style=flat)](https://david-dm.org/c0bra/ui-grid-plugin-skeleton#info=devDependencies) [![Coveralls](https://img.shields.io/coveralls/c0bra/ui-grid-plugin-skeleton.svg?style=flat)](https://coveralls.io/r/c0bra/ui-grid-plugin-skeleton)

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
