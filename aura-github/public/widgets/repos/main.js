define(['text!./repos.html'], function (tpl) {

  var template = _.template(tpl);

  return {

    availableParams: {
      type: ['all', 'owner', 'public', 'private', 'member'],
      sort: ['created', 'updated', 'pushed', 'full_name'],
      direction: ['asc', 'desc']
    },

    defaultParams: {
      type: 'all',
      sort: 'full_name',
      direction: 'asc'
    },
    
    initialize: function () {
      _.bindAll(this);
      this.setupPath();
      this.setupParams();
      this.sandbox.on('github.orgs.select', function(org) {
        this.path = 'orgs/' + org + '/repos';
        this.fetch();
      }, this);
      this.fetch();
    },

    setupPath: function() {
      if (this.options.path) {
        this.owner = this.options.path.split("/")[0];
        this.path = this.options.path;
        if (!/\/repos$/.test(this.path)) {
          this.path = this.path + '/repos';
        }
      } else if (this.options.user) {
        this.owner = this.options.user;
        this.path = 'users/' + this.options.user + '/repos';
      } else if (this.options.org) {
        this.owner = this.options.org;
        this.path = 'orgs/' + this.options.org + '/repos';
      } else {
        this.owner = 'user';
        this.path = 'user/repos';
      }
    },

    setupParams: function() {
      var params = this.defaultParams;
      var options = this.options;
      this.options.params = this.options.params || {};
      _.each(_.keys(this.availableParams), function(key) {
        var param = options[param] || options.params[param];
        if (param) {
          params[key] = param;
        }
      });
      this.params = params;
    },

    setParam: function(param, value) {
      if (_.include(this.availableParams[param] || [], value)) {
        this.params[param] = value;
        this.fetch();
      }
    },

    fetch: function() {
      if (!this.path) return;
      this.sandbox.github(this.path, 'get', this.params).then(this.render);
    },

    render: function (repos) {
      this.html(template({
        repos: repos,
        owner: this.owner,
        displayFilters: this.options.displayFilters,
        availableParams: this.availableParams,
        params: this.params
      }));
      this.sandbox.dom.attachEvents(this.events, this);
    },

    events: {
      'click a.repo': function(e) {
        this.sandbox.emit('github.repos.select', $(e.target).data());
      },
      'click [data-param]': function(e) {
        var param = $(e.target).data('param');
        var value = $(e.target).data('value');
        this.setParam(param, value);
      }
    }

  };

});
