exports.config =
  # See http://brunch.readthedocs.org/en/latest/config.html for documentation.
  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/
        'js/vendor.js': /^vendor/
      order:
        before: []

    stylesheets:
      joinTo:
        'css/app.css': /^(app|vendor)/
      order:
        before: []
        after: []
  
    templates:
      joinTo:
        'js/html.js'
  modules:
    wrapper: false
