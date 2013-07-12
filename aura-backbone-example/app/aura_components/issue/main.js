define({
  templates: ['issue'],

  className: 'span6',

  events: {
    'click .close' : function() {
      this.sandbox.stop();
    }
  },

  initialize: function() {
    var issue = new this.sandbox.mvc.models.Issue({ 
      repo:   this.options.repo, 
      number: this.options.number 
    });
    this.view.listenTo(issue, 'sync', _.bind(this.render, this));
    this.view.listenTo(issue, 'error', _.bind(function() { this.render(issue, 'error'); }, this));
    issue.fetch();
  },

  render: function(issue, error) {
    var issueData = {};
    if (error === 'error') {
      issueData.error   = "Error retrieving issue #" + this.options.number;
    } else {
      issueData = issue.toJSON();
      issueData.summary = issue.getSummary();
    }
    this.html(this.renderTemplate('issue', { issue: issueData, repo: this.options.repo }));
    var issueId = [issue.get('repo'), issue.get('number')].join('/');
    this.$el.attr('data-issue', issueId);
  }

});