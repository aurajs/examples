define(['backbone'], function(Backbone) {
  return Backbone.Model.extend({
    idAttribute: 'number',

    getSummary: function() {
      var body = this.get('body');
      if (body && body.length > 140) {
        return body.substring(0, 140) + "...";
      } else {
        return body;
      }
    },

    url: function() {
      var ret = this.get('url');
      if (!ret && this.collection && this.collection.url && this.get('number')) {
        ret = this.collection.url + "/" + this.get('number');
      } 
      if (!ret && this.get('repo') && this.get('number')) {
        ret = "https://api.github.com/repos/" + this.get('repo') + "/issues/" + this.get('number');
      }
      return ret;
    }
  });
});