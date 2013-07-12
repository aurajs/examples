define(['underscore', 'text!./issues.html'], function(_, tpl) {
  
  var template = _.template(tpl);

  return {

    availableParams: {
      filter: ['assigned', 'created', 'mentioned', 'subscribed', 'all'],
      state: ['open', 'closed'],
      sort: ['created', 'updated', 'comments'],
      direction: ['asc', 'desc']
    },

    defaultParams: {
      filter: 'all',
      state: 'open',
      sort: 'created',
      direction: 'desc'
    },
    
    initialize: function() {
      _.bindAll(this);

      this.sandbox.on('github.issues.filter', function(filter) {
        if (filter.path && new RegExp(filter.path, 'i').test(this.path)) {
          this.setParams(filter.params);
        }
      }, this);

      this.sandbox.on('github.repos.select', function(repo) {
        this.path = 'repos/' + repo.fullName + '/issues';
        this.fetch();
      }, this);

      this.sandbox.on('github.orgs.select', function(org) {
        this.path = 'orgs/' + org + '/issues';
        this.fetch();
      }, this);


      this.initParams();
      this.initPath();
      this.fetch();
    },

    initPath: function() {
      if (this.options.path) {
        this.path = this.options.path;
        if (!/\/issues$/.test(this.path)) {
          this.path = this.path + '/issues';
        }        
      } else if (this.options.repo) {
        this.path = 'repos/' + this.options.repo + '/issues';
      } else if (this.options.org) {
        this.path = 'orgs/' + this.options.org + '/issues';
      }
    },

    initParams: function() {
      var params = this.defaultParams;
      var options = this.options;
      this.options.params = this.options.params || {};
      _.each(_.keys(this.availableParams).concat(['since', 'labels']), function(key) {
        var param = options[param] || options.params[param];
        if (param) { params[key] = param; }
      });
      this.params = params;
    },

    setParams: function(params) {
      _.each(params || {}, function(value, param) {
        this.setParam(param, value, false);
      }.bind(this));
      this.fetch();
    },

    setParam: function(param, value, doFetch) {
      if (_.include(['since', 'labels'], param) || _.include(this.availableParams[param] || [], value)) {
        this.params[param] = value;
        if (doFetch) { this.fetch(); }
      }
    },

    fetch: function() {
      if (!this.path) return false;
      this.sandbox.github(this.path, 'get', this.params).then(this.render);
    },
    
    render: function(issues) {
      this.html(template({
        issues: issues,
        params: this.params,
        path: this.path,
        displayFilters: this.options.displayFilters,
        availableParams: this.availableParams,
        repo: this.repo
      }));
      this.sandbox.dom.attachEvents(this.events, this);
    },

    events: {
      'click [data-param]': function(e) {
        var param = $(e.target).data('param');
        var value = $(e.target).data('value');
        this.setParam(param, value, true);
      }
    }

  };
});
