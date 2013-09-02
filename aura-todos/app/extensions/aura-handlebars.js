define({
  name: 'The Handle of the Bars',
  require: {
    paths:  {
      handlebars: 'bower_components/require-handlebars-plugin/Handlebars',
      hbs: 'bower_components/require-handlebars-plugin/hbs',
      i18nprecompile: 'bower_components/require-handlebars-plugin/hbs/i18nprecompile',
      json2: 'bower_components/require-handlebars-plugin/hbs/json2'
    },
    hbs: {
      disableI18n: true,
      disableHelpers: true,
      templateExtension: 'hbs'
    }
  },

  initialize: function (app) {
    'use strict';

    var Handlebars = require('handlebars');
    app.core.template.hbs = Handlebars;
  }
});
