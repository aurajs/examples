define(['models/issue', 'collections/issues'], function(IssueModel, IssuesCollection) {

  // Exposing Models and Collections to the Components here...
  
  return function(app) {
    app.sandbox.mvc = {
      collections: { Issues:  IssuesCollection },
      models:      { Issue:   IssueModel }
    };
  }
});