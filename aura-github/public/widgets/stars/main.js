define(['text!./stars.html'], function(tpl) {

  var template = _.template(tpl);

  return {
    initialize: function() {
      _.bindAll(this);
      if (this.options.user) {
        this.path = 'users/' + this.options.user + '/starred';
      } else {
        this.path = 'user/starred';
      }
      this.fetch();
    },

    fetch: function() {
      this.sandbox.github(this.path).then(this.render);
    },

    events: {
      'click a' : function(e) {
        var repoName = $(e.currentTarget).data('repo');
        var repo = { name: repoName.split('/')[1], fullName: repoName };
        this.sandbox.emit('github.repos.select', repo);
      }
    },

    render: function(starred) {
      this.html(template({
        user: this.options.user,
        starred: starred
      }));
      this.sandbox.dom.attachEvents(this.events, this);
    }

  }

});