define({
  initialize: function() {
    this.sandbox.on('github.error', this.render, this);
  },
  render: function(error) {
    if (this.timeout) {
      clearTimeout(this.timeout);  
    }
    this.$el.show();
    var markup = this.$el.html();
    markup += "<h5> Error on " + error.path + "</h5>";
    markup += "<p>" + error.message + "</p>";
    this.html(markup);
    this.sandbox.dom.attachEvents(this.events, this);
    this.timeout = setTimeout(function() {
      this.html('');
      this.$el.hide();
      this.timeout = false;
    }.bind(this), 5000);
  }
});