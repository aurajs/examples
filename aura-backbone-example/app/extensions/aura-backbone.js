(function() {
  var historyStarted = false;
  define({
    name: "Aura Backbone",
    require: {
      paths:  { backbone: 'bower_components/backbone/backbone' },
      shim:   { backbone: { exports: 'Backbone', deps: ['underscore', 'jquery'] } }
    },
    
    initialize: function(app) {
      var Backbone = require('backbone');
      app.core.mvc =  Backbone;

      var Views = {};

      // Injecting a Backbone view in the Component just before initialization.
      // This View's class will be built and cached this first time the component is included.
      app.components.before('initialize', function(options) {
        var View = Views[options.ref]
        if (!View) {
          var ext = _.pick(this, 'model', 'collection', 'id', 'attributes', 'className', 'tagName', 'events');
          Views[options.ref] = View = Backbone.View.extend(ext);
        }
        this.view = new View({ el: this.$el });
        this.view.sandbox = this.sandbox;
      });

      app.components.before('remove', function() {
        this.view && this.view.stopListening();
      });

    }
  })
})();
