define({
  
  name: "Backbone LocalStorage",

  require: {
    paths: {
      'backbone.localStorage' : 'components/backbone.localStorage/backbone.localStorage'
    }
  },

  initialize: function(app) {
    app.sandbox.data.Store = require('backbone').LocalStorage;
  }

});