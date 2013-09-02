define(['hbs!./stats'], function (template) {
  'use strict';

  return {
    type: 'Backbone',
    events: {
      'click button': 'clearCompleted'
    },
    initialize: function () {
      this.render();
      this.sandbox.on('tasks.stats', this.render.bind(this));
    },
    render: function (stats) {
      this.html(template(stats || {}));
    },
    clearCompleted: function () {
      this.sandbox.emit('tasks.clear');
    }
  };
});
