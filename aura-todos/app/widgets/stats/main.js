define(['hbs!./stats'], function(template) {
  return {
    type: 'Backbone',
    events: {
      'click button': 'clearCompleted'
    },
    initialize: function() {
      this.render();
      this.sandbox.on('tasks.stats', _.bind(this.render, this));
    },
    render: function(stats) {
      this.html(template(stats || {}));
    },
    clearCompleted: function() {
      this.sandbox.emit('tasks.clear');
    }
  }
});