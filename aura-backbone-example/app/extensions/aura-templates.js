define(['underscore', 'jquery'], function(_, $) {

  function TemplateManager(options) {
    this.options = _.defaults(options || {}, {
      type: 'html',
      compiler: _.template,
      lookup: [],
      components: 'aura_components'
    });

    this.cache = {};
    this.options.lookup.push(this.cache);
  }

  TemplateManager.prototype = {
    load: function(names, widget) {
      names = _.isString(names) ? [names] : names;

      var resolved = {};
      var unresolved = [];

      _.each(names, function(name) {
        var template = this.find(widget + '/' + name);
        if (template) {
          resolved[name] = template;
        } else {
          unresolved.push(name);
        }
      }, this);

      var deferred = new $.Deferred();

      if (!unresolved.length) {
        deferred.resolve(resolved);
      } else {
        var files = _.map(unresolved, function(u) {
          return 'text!' + this.options.components + '/' + widget + '/' + u + '.' + this.options.type;
        }, this);

        require(files, _.bind(function() {
          _.each(Array.prototype.slice.call(arguments), function(template, i) {
            resolved[unresolved[i]] = this.options.compiler(template);
            this.cache[widget + '/' + name] = this.options.compiler(template);
          }, this);

          deferred.resolve(resolved);
        }, this), function(error) {
          console.error(error);
          deferred.reject(error);
        });
      }

      return deferred.promise();
    },

    find: function(name, namespace) {
      namespace = namespace || 'aura';
      var template = $('script[data-' + namespace + '-template="' + name + '"]').html();

      if (template) {
        return this.options.compiler(template);
      } else {
        var hash = _.find(this.options.lookup, function(h) {
          return !!h[name];
        }) || {};

        return hash[name];
      }
    }
  };

  return function(app) {
    var manager = new TemplateManager(app.config.template);

    app.core.Components.Base.prototype.renderTemplate = function(tplName, context) {
      var tpl = this._templates[tplName];
      if (typeof tpl === 'function') {
        return tpl(context);
      } else {
        return 'Template ' + tplName + ' not found.';
      }
    };

    app.components.before('initialize', function() {

      this._templates = {};

      if (this.templates == null || !this.templates.length) { return; }

      var loading = manager.load(this.templates, this.options.name);
      loading.done(_.bind(function(templates) {
        this._templates = templates;
      }, this));

      return loading.promise();
    });
  };

});
