define({
  initialize: function() {
    this.sandbox.on('github.rateLimit', this.render, this);
    this.render();
  }, 
  render: function(rateLimit) {
    if (rateLimit) {
      this.html( rateLimit.remaining + ' / ' + rateLimit.limit );  
    } else {
      this.html('n/a');
    }
  }
});