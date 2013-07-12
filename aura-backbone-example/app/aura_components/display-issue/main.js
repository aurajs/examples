define(['text!./display-issue.html'], function(template) {

  return {
    events: {
      'click input[type="submit"]': function(e) {
        this.action = $(e.target).val();
      },

      'submit form': function(e) {
        var form = $(e.target);

        var issue = _.inject(form.serializeArray(), function(memo, input) {
          memo[input.name] = input.value;
          return memo;
        }, {});

        // Reset
        var reset = !!issue.reset;
        delete issue.reset;
       
        var eventName = 'issues.add';
        if (this.action === 'stop') {
          eventName = 'issues.remove';
        }

        if (!!issue.number) {
          this.sandbox.emit(eventName, issue, reset);
          if (this.action !== 'stop') {
            this.$el.find('input[name="number"]').val(parseInt(issue.number, 10) + 1);
          } else {
            this.$el.find('input[name="number"]').val(parseInt(issue.number, 10) - 1);
          }
        }

        e.preventDefault();
        return false;
      }
    },

    initialize: function() {
      this.repos = (this.options.repos || "aurajs/aura").split(",");
      this.render();
    },

    render: function() {
      this.template = _.template(template);
      this.$el.html(this.template({ repos: this.repos }));
      this.$el.find('input[type="text"]').focus();
    }
  };

});