define(['bower_components/aura/lib/aura'], function (Aura) {
  'use strict';
  new Aura()
    .use('extensions/aura-backbone')
    .use('extensions/aura-localstorage')
    .use('extensions/aura-handlebars')
    .use(function (app) {
      window.Todos = app.createSandbox();
    })
    .start({ widgets: 'body' }).then(function () {
      console.warn('Aura started!');
    });
});
