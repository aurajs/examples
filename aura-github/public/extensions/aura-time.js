define({
  initialize: function(app) {
    app.sandbox.relativeTime = function(date) {
      var units = {
        year: 31557600000,
        month: 2629800000,
        week: 604800000,
        day: 86400000,
        hour: 3600000,
        minute: 60000,
        second: 1000
      };

      var delta = new Date() - new Date(date);

      for (var unit in units) {
        if (units.hasOwnProperty(unit)) {
          if (delta >= units[unit]) {
            var time = Math.floor(delta / units[unit]);
            var unitName = unit + (unit > 1 ? 's' : '');
            return [time, unitName, 'ago'].join(' ');
          }
        }
      }

      return 'Now';
    };
  }
});
