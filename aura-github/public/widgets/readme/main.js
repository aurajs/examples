define({

  initialize: function () {
    _.bindAll(this);
    this.repo = this.options.repo;
    this.sandbox.on('github.repos.select', function(repo) {
      this.repo = repo.fullName;
      this.render();
    }.bind(this));
    this.render();
  },

  render: function () {
    if (!this.repo) { return }
    this.$el.html('Loading...');
    var path = 'repos/' + this.repo + '/readme';
    this.sandbox.github(path).then(function(readme) {
      window.readme = readme;
      var content = atob(readme.content.replace(/\n/g, ""));
      this.sandbox.github('markdown', 'post', { text: content, mode: 'markdown', context: this.repo }).then(function(content) {
        this.html(content);
      }.bind(this));
    }.bind(this));
  }

});
