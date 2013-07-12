define({

  initialize: function(app) {

    // Backbone like delegateEvents...
    
    app.sandbox.dom.attachEvents = function(events, context) {
      var delegateEventSplitter = /^(\S+)\s*(.*)$/;
      _.each(events || [], function(fn, key) {
        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        if (_.isString(fn)) { fn = this[fn]; }
        this.$el.find(selector).on(eventName, fn.bind(this));
      }.bind(context));
    };
  }

});