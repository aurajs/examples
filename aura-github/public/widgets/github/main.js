define(['text!./github.html'], function(tpl) {
  var template = _.template(tpl);
  var defaultOrgs = ['aurajs', 'emberjs', 'documentcloud', 'angular'];
  return {
    initialize: function() {
      if (this.options.orgs) {
        this.orgs = this.options.orgs.split(",");
      } else {
        this.orgs = defaultOrgs;
      }
      this.render();
    },
    render: function() {
      this.html(template({ orgs: this.orgs }));
      this.$el.find('a').on('click', function(e) {
        e.preventDefault();
        var org = $(e.target).data('org');
        this.sandbox.emit('github.selectOrg', org);
      }.bind(this));
    }
  }
});
