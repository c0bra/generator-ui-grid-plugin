
# <%= readableName %>

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

## Clone the Skeleton

Clone the project locally

    git clone https://github.com/c0bra/ui-grid-plugin-skeleton.git my-plugin

Update origin git remote url

    git remote set-url origin https://github.com/your-username/your-plugin.git

## Install Dependencies

    npm install -g gulp bower
    npm install
    bower install

## Configuration

1. Update info in **package.json**: name, version, description, repository.
2. Do the same in **bower.json**
3. Update config in `config\build.config.js`: the module name, readable name, and alter whatever angular version you want to use.

## Docs

There is a single Tutorial file in `docs/content`. Change its contents to suit your plugin as a landing page.

[TODO: Add notes on where dgeni templates are and updating them (variables, etc)]

## Set up Bower and Travis

[TODO]

# Development

Automatically rebuilds js, css, and docs files. Runs a connect server on port 4000

    gulp watch

    # Or your own port:
    gulp watch --port 3000

## Protractor

**Note:** Protractor tests do not work, currently. They throw a "window is not defined" error, which isn't documented well anywhere that I can find.


# Deployment

The `publish` task takes automatically generated docs and dist files and push them to the gh-pages branch.

    gulp publish --tag v0.0.1

## Travis

1. Encrypt your github credentials: http://docs.travis-ci.com/user/environment-variables/#Secure-Variables

    gem install travis
    travis encrypt GITHUB_NAME=yourusername
    travis encrypt GITHUB_PASS=yourpassword

Add the output to your env vars, it will look like this:

    env:
      global:
      - secure: "fa5fArbwOxcpbv1uLZnIdjfkBEw/k97qrwya+EoFPSwpnoyS4tv/J27fgDdQxp2S83ge7OafHccJkgPDZYrCgOqqbSiVFOaSHnX8eyWkC+k3MqAY5s2rfjdFE/NS3sA3yRV+AEw8xDJ4xFZhJXmUmb1lpuK3+VYAn5ElEtKLGLU="
      - secure: "EKFllxWbaNO41LKRUaaPG+wn+37OLGJ9yAUx4F4agnnM8c8OALzGE34xbzKn5qoza/JvmobrVUhzKmp0/HiuwKjOX0NfJAKp2mIeMy5G64dhaEGFPeeviIzOCJ2DTR/IIEhACidQjquFy+WExtDCbt8Xzgq+38lcKytuE4GEIZM="

## Bower

Register your module on bower [TODO: Explanation].

