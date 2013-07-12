define(['text!./events.html'], function (tpl) {
  var template = _.template(tpl);

  var eventsMap = {
    CommitCommentEvent: {},
    CreateEvent: {},
    DeleteEvent: {},
    DownloadEvent: {},
    FollowEvent: {},
    ForkEvent: { title: _.template('<strong class="actor-name"><%= actor.login %></strong> forked <%= repo.name %>') },
    ForkApplyEvent: {},
    GistEvent: {},
    GollumEvent: {},
    IssueCommentEvent: {
      title: _.template('<strong class="actor-name"><%= actor.login %></strong> commented on issue <%= payload.issue.title %>'),
      content: _.template('<%= payload.comment.body %>')
    },
    IssuesEvent: { title:  _.template('<strong class="actor-name"><%= actor.login %></strong> created issue <%= payload.issue.title %>') },
    MemberEvent: {},
    PublicEvent: {},
    PullRequestEvent: { title: _.template('<strong class="actor-name"><%= actor.login %></strong> opened pull request <%= payload.number %>') },
    PullRequestReviewCommentEvent: {
      title: 'commented on pull request',
      content: _.template('<%= payload.comment.body %>')
    },
    PushEvent: { title: _.template('<strong class="actor-name"><%= actor.login %></strong> pushed to <%= payload.ref %> at <%= repo.name %>') },
    TeamAddEvent: {},
    WatchEvent: { title: _.template('<strong class="actor-name"><%= actor.login %></strong> watched <%= repo.name %>') }
  };

  return {
    initialize: function () {
      _.bindAll(this);
      this.render();
    },

    render: function () {
      if (!this.options.org) { return; }
      var path = 'orgs/' + this.options.org + '/events';

      var self = this;
      this.sandbox.github(path).then(function(events) {
        _.each(events, this.formatEvent, this);
        this.html(template({ events: events }));
      }.bind(this));
    },

    formatEvent: function(event) {
      if (event.type === 'IssueCommentEvent') {
        console.error(event);
      }

      event.time = this.sandbox.relativeTime(event.created_at);

      var type = eventsMap[event.type];

      event.title = (typeof type.title === 'function') ? type.title(event) : event.type;
      event.content = (typeof type.content === 'function') ? type.content(event) : null;
    }
  };
});
