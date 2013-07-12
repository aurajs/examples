define(['text!./members.html'], function (tpl) {

  var template = _.template(tpl);

  return {

    initialize: function () {
      _.bindAll(this);
      this.path = 'orgs/' + this.options.org + '/members';
      this.render();
    },

    render: function () {
      this.sandbox.github(this.path).then(function(members) {
        this.html(template({ members: members, org: this.options.org }));
      }.bind(this));
    }

  };

});
