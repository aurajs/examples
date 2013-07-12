define(['text!./login.html'], function(tpl) {
  var template = _.template(tpl);
  return {
    initialize: function() {
      this.render();
    },
    render: function() {
      var isLoggedIn = this.sandbox.github.isLoggedIn()
      this.html(template({ isLoggedIn: isLoggedIn }));
      this.$el.find('button.login').on('click', function() {
        this.sandbox.github.login();
      }.bind(this));
      this.$el.find('button.logout').on('click', function() {
        this.sandbox.github.logout();
      }.bind(this));
    }
  }
});
