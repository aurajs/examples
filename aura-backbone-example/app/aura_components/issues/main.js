define({

  // Loading templates this way is enabled 
  // by the 'aura-templates' extension
  
  templates: ['issues'],

  initialize: function() {

    function getIssueId(issue) {
      return [issue.repo, issue.number].join('/');
    }


    // We probably should find a simpler, more declarative way to attach listeners...
    
    this.sandbox.on('issues.add', function(issue, reset) {
      var el = $('<div />').addClass('span6').html("loading...");
      this.dom.find('.issues-list', this.el).append(el);
      
      // 'this' here is the widget's sandbox
      this.start([ { name: 'issue', options: _.extend(issue, { el: el }) } ], { reset: reset });
    });

    this.sandbox.on('issues.remove', function(issue) {
      var selector = "[data-issue='" + getIssueId(issue) + "']";
      
      // 'this' here is the widget's sandbox
      this.stop(selector);
    });

    this.render();

  },

  render: function(collection) {
    // the renderTemplate method is provided 
    // by the 'aura-templates' extension
  
    this.html(this.renderTemplate('issues'));
  }

});
