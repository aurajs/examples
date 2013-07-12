define(['backbone', 'models/issue'], function(Backbone, Issue) {
  return Backbone.Collection.extend({
    model: Issue,
    initialize: function(models, options) {
      this.url = "https://api.github.com/repos/" + options.repo + "/issues";
    }
  });
});