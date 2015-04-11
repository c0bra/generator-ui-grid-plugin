
# Setup

  npm install -g gulp bower
  npm install
  bower install

# Naming

To use the automatic build process you need to use a name that works as a filename, like ui-grid-plugin-blah-blah

1. Change module name in tests `beforeEach`es

# Development

Runns a connect server on port 4000

  gulp watch

  # Or your own port:
  gulp watch --port 3000

## Protractor

**Note:** Protractor tests do not work, currently. They throw a "window is not defined" error, which isn't documented well anywhere that I can find.