define(['text!./user-orgs.html'], function(tpl) {
  var template = _.template(tpl);

  return {
    initialize: function() {
      _.bindAll(this);
      if (this.options.user) {
        this.path = "users/" + this.options.user + "/orgs";
      } else {
        this.path = "user/orgs";
      }
      this.fetch();
    },

    events: {
      'click a': function(e) {
        this.sandbox.emit('github.orgs.select', $(e.target).data('org'));
      }
    },

    fetch: function() {
      this.sandbox.github(this.path).then(this.render);
    },

    render: function(orgs) {
      this.html(template({
        user: this.options.user,
        orgs: orgs
      }));
      this.sandbox.dom.attachEvents(this.events, this);
    }
  }

});