require(['bower_components/aura/lib/aura'], function(Aura) {
  Aura({ 
    debug: { enable: true }
  }).use('extensions/aura-templates')
    .use('extensions/aura-backbone')
    .use('extensions/backbone-github-issues')
    .components.addSource('formidable', './formidable')
    .start('body');
});