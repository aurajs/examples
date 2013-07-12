define(['hbs!./new-todo'], function(template) {
  return {
    type: "Backbone",

    events: {
      'keyup input':  'createNewTask'
    },

    initialize: function() {
      this.render();
    },

    createNewTask: function(e) {
      if (e.which === 13) {
        var val = this.$input.val();
        if (val) {
          var date = new Date();
          var taskId = ['todo', date.getTime(), date.getMilliseconds()].join('-');
          var task = { id: taskId, description: val,  done: false };
          this.sandbox.emit('tasks.add', task, 'add');
          this.$input.val('');
        }
      }
    },

    render: function() {
      this.html(template());
      this.$input = this.$el.find('input');
      return this;
    }
  }
});