define({
  initialize: function (app) {
    app.sandbox.github = function (path, verb, data) {
      var token = app.config.github.access_token;
      verb = verb || 'get';
      var dfd = app.core.data.deferred();
      if (data && verb != 'get') {
        data = JSON.stringify(data);
      }
      var headers = {};
      if (token && token.length) {
        headers["Authorization"] = "token " + token;
      }
      $.ajax({
        type: verb,
        url: 'https://api.github.com/' + path,
        data: data,
        headers: headers,
        complete: function(xhr, status) {
          if (xhr.getResponseHeader('X-RateLimit-Limit')) {
            var rateLimit = {
              limit: xhr.getResponseHeader('X-RateLimit-Limit'),
              remaining: xhr.getResponseHeader('X-RateLimit-Remaining')
            };
            app.core.mediator.emit('github.rateLimit', rateLimit);
          }
          if (status !== 'success') {
            var error;
            try {
              error = JSON.parse(xhr.responseText);  
            } catch(e) {
              error = { message: "Connection lost" };
            }            
            error.path = path;
            app.core.mediator.emit('github.error', error);
          }
        },
        success: dfd.resolve,
        error: dfd.reject
      });
      return dfd;
    };

    app.sandbox.github.login = function() {
      var params = 'client_id=' + app.config.github.client_id;
      document.location = 'https://github.com/login/oauth/authorize?' + params;
    };

    app.sandbox.github.logout = function() {
      document.location = './auth.php?logout=true';
    };

    app.sandbox.github.isLoggedIn = function() {
      return !!app.config.github.access_token;
    }
  }
});
