define(['underscore', 'hbs!./list', 'hbs!./item'], function(_, listTemplate, itemTemplate) {

  return {
    
    type: 'Backbone',

    events: {
      'click [data-task-action]':  function(e) {
        var data = this.sandbox.dom.data(e.target);
        var task = this.tasks[data.taskId];
        var action = data.taskAction && data.taskAction.toLowerCase();
        if (task && action) {
          this.sandbox.emit('tasks.' + action, task, action);
        }
      }
    },


    initialize: function() {
      this.tasks = {};
      this.taskViews = {};
      var sandbox = this.sandbox;
      var handle  = _.bind(this.handleTaskAction, this);
      _.bindAll(this);
      var sandbox = this.sandbox;
      _.each(['add', 'destroy', 'toggle'], function(action) {
        sandbox.on('tasks.' + action, handle);
      })
      sandbox.on('tasks.clear', this.clearCompleted);
      this.render();
    },

    render: function() {
      this.html(listTemplate());
      this.$list = this.$el.find('ul');
    },

    getTask: function(task) {
      if (typeof task === 'string') {
        return this.tasks[task];
      }
      return task;
    },

    getCompletedTasks: function() {
      var completed = _.select(_.values(this.tasks), function(task) { 
        return task.done;
      });
      return completed;
    },

    getStats: function() {
      var total     = _.values(this.tasks).length;
      var completed = this.getCompletedTasks().length;
      var remaining = total - completed;
      var stats = {
        total:     total, 
        remaining: remaining,
        completed: completed
      };
      this.sandbox.emit('tasks.stats', stats);
      return stats;
    },

    clearCompleted: function() {
      _.each(this.getCompletedTasks(), function(task) {
        this.sandbox.emit('tasks.destroy', task, 'destroy');
      }.bind(this));
    },

    handleTaskAction: function(task, action) {
      var fn = this[action + 'Task'];
      if (fn) {
        task = this.getTask(task);
        fn && fn(task);
        this.getStats();        
      }
    },

    addTask: function(task) {
      var view = this.taskViews[task.id] = $(itemTemplate(task));
      this.tasks[task.id] = task;
      this.$list.append(view);
    },

    toggleTask: function(task) {
      task.done = !task.done;
      var selector = [
        '[type="checkbox"]',
        '[data-task-action="toggle"]',
        '[data-task-id="' + task.id + '"]'
      ].join('');
      this.sandbox.dom.find('input' + selector, this.$el).prop('checked', task.done);
    },

    destroyTask: function(task) {
      var view = this.taskViews[task.id];
      view && view.remove();
      delete this.tasks[task.id];  
      delete this.taskViews[task.id];
    }

  }
});