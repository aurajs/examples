define(function () {
  'use strict';
  return function (app) {
    var _ = app.core.util._;
    var historyStarted = false;
    var Backbone;
    return {
      require: {
        paths: {
          backbone: 'bower_components/backbone/backbone',
          underscore: 'bower_components/underscore/underscore'
        },
        shim: {
          backbone: { exports: 'Backbone', deps: ['underscore', 'jquery'] }
        }
      },

      initialize: function (app) {
        Backbone = require('backbone');
        app.core.mvc = Backbone;
        app.sandbox.mvc = Backbone;
        app.core.registerWidgetType('Backbone', Backbone.View.prototype);
      },

      afterAppStart: function () {
        if (!historyStarted) {
          _.delay(function () {
            Backbone.history.start();
          }, 200);
        }
      }
    };
  };
});
