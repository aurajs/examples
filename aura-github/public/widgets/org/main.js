define(['text!./org.html'], function (tpl) {

  var template = _.template(tpl);

  return {

    initialize: function () {
      _.bindAll(this);
      this.org = this.options.org;
      this.sandbox.on('github.selectOrg', function(org) {
        this.org = org;
        this.render();
      }.bind(this));
      this.render();
    },

    render: function () {
      var path = 'orgs/' + this.org;
      var isLoggedIn = this.sandbox.github.isLoggedIn();
      if (!isLoggedIn) {
        this.html('<h1>You must login first...</h1><div data-aura-widget="login"></div>');
      } else {
        this.sandbox.github(path).then(function(org) {
          this.html(template({ org: org }));
          this.$el.find('.nav-tabs a').click(function(e) {
            e.preventDefault();
            $(this).tab('show');
          });
        }.bind(this));
      }
    }
  };

});
